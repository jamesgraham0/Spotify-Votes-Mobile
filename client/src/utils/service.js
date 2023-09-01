import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import {CLIENT_ID, REDIRECT_URI} from "react-native-dotenv";

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
});

let token = "";
let device_id = "";
let queue = [];
let userInfo = {};

const BASE_URL = "https://api.spotify.com/v1"
const concatUrl = (url) => `${BASE_URL}/${url}`;

// returns device_id if the device is active
// otherwise returns ""
const getDeviceId = async () => {
    try {
        device_id = "";
        const response = await spotifyApi.getMyDevices();
        const devices = response.body.devices;
        if (devices.length === 0) {
            device_id = "";
            return "";
        }
        let activeDevices = devices.filter((device) => device.is_active);
        if (devices.length > 0) {
            device_id = activeDevices.map((device) => {
                if (device.type !== "Spotify Connect") {
                    return device.id;
                }
            });                                               
        }
        if (Array.isArray(device_id)) {
            device_id = device_id[0];
        }
        return device_id;
    } catch (error) {
        console.log(error);
    }
}

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
            userInfo = response?.data;
            return response?.data;
        } catch (error) {
            console.log(error);
        }
    },

    getMyDevicesAndTransferPlayback: async () => {
        try {
            const response = await spotifyApi.getMyDevices();
            const devices = response.body.devices;
          
            if (devices.length > 0) {
                let deviceToTransfer = null;
            
                // First, check for a device of type "Smartphone"
                deviceToTransfer = devices.find(device => device.type === "Smartphone");
            
                // If no smartphone found, check for a device of type "Computer"
                if (!deviceToTransfer) {
                    deviceToTransfer = devices.find(device => device.type === "Computer");
                }
                
                if (deviceToTransfer) {
                    await spotifyApi.transferMyPlayback([deviceToTransfer.id]);
                    console.log("Device is active? ", deviceToTransfer.is_active);
                    return deviceToTransfer.is_active;
                } else {
                    console.log("No smartphone or computer found");
                }
            }
            console.log("No devices found");
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
            return await spotifyApi.searchTracks(search);
        } catch (error) {
            console.log("Error while searching for track", error);
        }
        return null;
    },

    addTrackToQueue: async (track) => {
        const uri = track.uri;

        // track already in queue
        let trackInQueue = false;
        queue.forEach((t) => {
            if (t.trackUri === uri) {
                console.log("Track already in queue");
                trackInQueue = true;
            }
        });
        
        // track not in queue, add it
        if (!trackInQueue) {
            console.log(`Adding ${track.title} to queue`);
            const data = {
                uri: uri,
                device_id: device_id
            }
            try {
                if (device_id === "") {
                    throw new Error("No device found trying to addTrackToQueue");
                }
                const url = `https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${device_id}`;
                await axios.post(url,
                    data, 
                    {
                  headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                  },
                });
                console.log(`${track.title} added to queue`);
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

    startPlaying: async (track, deviceId, playFromBeginning) => {
        const { uri } = track;
        if (deviceId !== "" && deviceId !== null) {
            try {
                const playbackState = await spotifyApi.getMyCurrentPlaybackState();
                let position = 0;
                if (!playFromBeginning && playbackState.body !== null && playbackState?.body.progress_ms !== 0) {
                    position = playbackState.body.progress_ms;
                }
                try {
                    await spotifyApi.transferMyPlayback([deviceId]);
                    await spotifyApi.play({
                        uris: [uri],
                        position_ms: position  
                    });
                } catch (error) {
                    console.log("Error trying to play track", error);
                }
            } catch (error) {
                console.log(`Error trying do something with playback`, error);
            }
        }
    },
    
    pausePlaying: async () => {
        try {
            await spotifyApi.pause();
        } catch (error) {
            console.log("Error when trying to pause:", error);
            
        }
    },

    getPlaybackState: async () => {
        try {
            const result = await spotifyApi.getMyCurrentPlaybackState();
            if (result.body !== null) {
                return result.body;
            }
            return false;
        } catch (error) {
            console.log("Error getting playback state from serparate functinon", error);
        }
    },

    // returns the current playing track as an object or an empty object
    getCurrentlyPlaying: async () => {
        try {
            const result = await spotifyApi.getMyCurrentPlayingTrack();
            if (result.body !== null) {
                return result.body;
            }
            return {};
        } catch (error) {
            console.log(error);
        }
    },    

    // pause playback and set the users" currently playing track to {}
    resetPlaybackToEmptyState: async () => {
        console.log("resetting playing to default state");
        spotifyApi.getMyCurrentPlayingTrack().then((track) => {
            let isPlaying = track?.body.is_playing;
            if (isPlaying) { // reset player
                spotifyApi.pause().then(() => {
                    //current track has been set to {}
                  }, (err) => {
                    console.log(err);
                });
                spotifyApi.seek(0).then(() => {
                    //current track has been set to {}
                  }, (err) => {
                    console.log(err);
                  });
            }
        });
    }
}

export default service;