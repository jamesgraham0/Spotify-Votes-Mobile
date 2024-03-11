import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID, REDIRECT_URI } from "react-native-dotenv";
import { Linking } from "react-native";
import Constants from "./constants";

const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
});

let token = "";
let device_id = "";
let queue = [];

const BASE_URL = "https://api.spotify.com/v1"
const concatUrl = (url) => `${BASE_URL}/${url}`;

// returns device_id if the device is active
// otherwise returns ""
const getDeviceId = async () => {
    try {
        const response = await spotifyApi.getMyDevices();
        const devices = response.body.devices;
        const activeDevices = devices.filter(device => device.is_active && device.type !== "Spotify Connect");
        device_id = activeDevices.length > 0 ? activeDevices[0].id : "";
        return device_id;
    } catch (error) {
        console.log(error);
    }
}

const handleRedirectToSpotify = async () => {
    if (await Linking.canOpenURL(Constants.SPOTIFY_URL)) {
        await Linking.openURL(Constants.SPOTIFY_URL);
    }
};

const handleReconnectionToSpotify = async () => {
    await handleRedirectToSpotify();
    // stall to get devices when the user comes back
    const delayMilliseconds = 2000;
    await new Promise(resolve => setTimeout(resolve, delayMilliseconds));
    await service.getMyDevicesAndTransferPlayback();
};

const service = {

    login: async () => {
        const url = concatUrl("authorize");
        try {
            await axios.get(url, {
                params: {
                    client_id: CLIENT_ID,
                    response_type: "code",
                    redirect_uri: REDIRECT_URI,
                    scope: "user-read-currently-playing \
                            user-read-recently-played \
                            user-read-playback-state \
                            user-top-read \
                            user-modify-playback-state \
                            streaming \
                            user-read-email \
                            user-read-private"
                }
            });
        } catch (error) {
            console.log(error);
        }
    },

    getUserCredentials: async (authInfo) => {
        const { access_token } = authInfo.params;
        spotifyApi.setAccessToken(access_token);
        token = access_token;
        const url = concatUrl("me");
        try {
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            });
            return response?.data;
        } catch (error) {
            console.log(error);
        }
    },

    getMyDevicesAndTransferPlayback: async () => {
        try {
            const response = await spotifyApi.getMyDevices();
            const devices = response.body.devices;

            const deviceTypes = ["Smartphone", "Computer", "Tablet", "Speaker"];
            let deviceToTransfer = null;

            for (const deviceType of deviceTypes) {
                deviceToTransfer = devices.find((device) => device.type === deviceType);
                if (deviceToTransfer) {
                    break; // Exit the loop if a matching device is found
                }
            }

            if (deviceToTransfer) {
                await spotifyApi.transferMyPlayback([deviceToTransfer.id]);
                return deviceToTransfer.is_active;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    },

    getDeviceId: async () => {
        try {
            return await getDeviceId();
        } catch (error) {
            console.log(error);
        }
    },

    searchTrack: async (search) => {
        try {
            const url = concatUrl(`search?q=${encodeURIComponent(search)}&type=track`);
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response?.data.tracks.items;
        } catch (error) {
            console.log("Error while searching for track", error);
            return null;
        }
    },

    addTrackToQueue: async (track) => {
        const uri = track.uri;

        const trackInQueue = queue.some((t) => t.trackUri === uri);

        if (!trackInQueue) {
            const data = {
                uri: uri,
                device_id: device_id
            }
            try {
                if (device_id === "") {
                    throw new Error("No device found trying to addTrackToQueue");
                }
                const url = concatUrl(`me/player/queue?uri=${uri}&device_id=${device_id}`);
                await axios.post(url, data, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }
    },

    /**
     * 
     * @returns 
     * Currently playing track as object {image, artistName, trackName, trackUri}
     * Queue as array of objects [{image, artistName, trackName, trackUri}]
     */
    getQueue: async () => {
        const url = concatUrl("me/player/queue");
        try {
            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            queue = response.data.queue.map((track) => {
                if (track.type === "track") {
                    return {
                        image: track.album.images[0].url,
                        artistName: track.artists[0].name,
                        trackName: track.name,
                        trackUri: track.uri,
                    }
                }
            })
            queue = queue.filter((track) => track !== undefined);
            return queue;
        } catch (error) {
            console.log(error);
        }
    },

    startPlaying: async (track, deviceId) => {
        if (deviceId !== "" && deviceId !== null) {
            try {
                const url_ = concatUrl(`me/player`);
                const playbackState = await axios.get(url_, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                let currentPosition = 0;
                if (playbackState.data?.progress_ms !== 0) {
                    currentPosition = playbackState.data.progress_ms;
                }
                const url = concatUrl(`me/player/play`);
                try {
                    const response = await axios.put(
                        url,
                        {
                            'uris': [
                                track.uri
                            ],
                            'position_ms': currentPosition
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                    return response.status === 204;
                } catch (error) {
                    console.log("Trying to play the track again", error);
                    await handleReconnectionToSpotify();
                    return false;
                }
            } catch (error) {
                console.log("Error trying to get playback state", error);
                return false;
            }
        }
        return false;
    },

    pausePlaying: async () => {
        try {
            const url = concatUrl('me/player/pause');
            await axios.put(url, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        } catch (error) {
            console.log("Error when trying to pause:", error);
        }
    },

    resetTrack: async () => {
        try {
            const url = concatUrl('me/player/seek?position_ms=0');
            await axios.put(url, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        } catch (error) {
            console.log("Error when trying to reset track:", error);
        }
    },

    // pause playback and set the users' currently playing track to {}
    resetPlaybackToEmptyState: async () => {
        const url = concatUrl('me/player/currently-playing');
        const track = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        let isPlaying = track?.data.is_playing;
        if (isPlaying) { // reset player
            await service.pausePlaying();
            await service.resetTrack();
        }
    }
}

export default service;