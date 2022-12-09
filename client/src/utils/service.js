import axios from 'axios';
import { CLIENT_ID, REDIRECT_URI } from "@env";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
})

let token = '';
let device_id = '';
let currently_playing = {
    image: '',
    artistName: '',
    trackName: '',
    trackUri: '',
}
let queue = [];

const BASE_URL = "https://api.spotify.com/v1"
const concatUrl = (url) => `${BASE_URL}/${url}`;

const getDeviceId = async () => {
    const url = concatUrl("me/player/devices");
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data.devices.length > 0) {
            device_id = response.data.devices.map((device) => {
                // Only allow smartphones for now
                if (device.type !== 'Spotify Connect') {
                    return device.id;
                }
            })
        }
        if (device_id.length !== 0) {
            return device_id[0];
        }
    } catch (error) {
        console.log(error);
    }
}

const service = {

    getAccessToken: () => {
        try {
            if (token !== '') {
                return token;
            }
            else {
                throw new Error('No token found');
            }
        } catch (error) {
            console.log(error);
        }
    },

    login: async () => {
        const url = concatUrl('authorize');
        try {
            await axios.get(url, {
                params: {
                    client_id: CLIENT_ID,
                    response_type: 'code',
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
        const url = concatUrl('me');
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            return response.data;
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
            console.log(error);
        }
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
                if (device_id === '') {
                    throw new Error('No device found trying to addTrackToQueue');
                }
                const url = `https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${device_id}`;
                await axios.post(url,
                    data, 
                    {
                  headers: {
                    'Authorization': `Bearer ${token}`,
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
        const url = concatUrl('me/player/queue');
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            queue = response.data.queue.map((track) => {
                if (track.type === 'track') {
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

    getCurrentlyPlaying: async () => {
        try {
            let track = await spotifyApi.getMyCurrentPlayingTrack();
            if (track.body !== null) {
                currently_playing = {
                    image: track.body.item.album.images[0].url,
                    artistName: track.body.item.artists[0].name,
                    trackName: track.body.item.name,
                    trackUri: track.body.item.uri,
                }
            }
            return currently_playing;
        } catch (error) {
            console.log(error);
        }
    },

    transferPlayback: async () => {
        if (device_id === '') {
            device_id = await getDeviceId();
        }

        const url = concatUrl('me/player');
        try {
            if (device_id === '') {
                throw new Error('No device found trying to transferPlayback');
            }
            const response = await axios.put(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    "device_ids": [device_id],
                }
            });
            console.log("Success", response.data);
        } catch (error) {
            console.log(error);
        }
    },

    startPlaying: async () => {
        if (typeof(device_id) !== String) {
            device_id = await getDeviceId();
        }
        try {
            spotifyApi.play();
        } catch (error) {
            console.log(error);
        }
    },
    
    pausePlaying: async () => {
        try {
            await spotifyApi.pause();
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    },

}

export default service;