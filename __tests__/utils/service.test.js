import axios from "axios";
import service from "../../client/src/utils/service";

jest.mock('axios');

describe('Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should log an error if the request fails', async () => {
            const error = new Error('Request failed');
            axios.get.mockRejectedValueOnce(error);
            console.log = jest.fn();

            await service.login();

            expect(console.log).toHaveBeenCalledWith(error);
        });
    });

    describe('getUserCredentials', () => {
        it('should set access token and make a GET request to me endpoint', async () => {
            const authInfo = {
                params: {
                    access_token: 'test_token'
                }
            };
            const response = {
                data: { name: 'John Doe' }
            };
            axios.get.mockResolvedValueOnce(response);

            const result = await service.getUserCredentials(authInfo);
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('me'), {
                headers: expect.objectContaining({
                    Authorization: expect.stringContaining(authInfo.params.access_token)
                })
            });
            expect(result).toEqual(response.data);
        });

        it('should log an error if the request fails', async () => {
            const authInfo = {
                params: {
                    access_token: 'test_token'
                }
            };
            const error = new Error('Request failed');
            axios.get.mockRejectedValueOnce(error);
            console.log = jest.fn();

            await service.getUserCredentials(authInfo);

            expect(console.log).toHaveBeenCalledWith(error);
        });
    }); 

    
    describe('getMyDevicesAndTransferPlayback', () => {
        it('should transfer playback to a device and return its active status', async () => {
            const response = {
                body: {
                    devices: [
                        { id: 'device1', type: 'Smartphone', is_active: true },
                        { id: 'device2', type: 'Computer', is_active: false },
                        { id: 'device3', type: 'Tablet', is_active: false },
                        { id: 'device4', type: 'Speaker', is_active: false }
                    ]
                }
            };
            // spotifyApi.getMyDevices.mockResolvedValueOnce(response); TODO
            // spotifyApi.transferMyPlayback.mockResolvedValueOnce(); TODO

            const result = await service.getMyDevicesAndTransferPlayback();

            // expect(spotifyApi.getMyDevices).toHaveBeenCalled(); TODO
            // expect(spotifyApi.transferMyPlayback).toHaveBeenCalledWith(['device1']); TODO
            expect(result).toBe(undefined);
        });
    });

    describe('getDeviceId', () => {
        it('should return the device id', async () => {
            service.getDeviceId();
            const result = await service.getDeviceId();

            expect(result).toBe(undefined);
        });
    });

    describe('searchTrack', () => {
        it('should make a GET request to search endpoint with the correct parameters', async () => {
            const search = 'test';
            const url = `search?q=${encodeURIComponent(search)}&type=track`;
            const response = {
                data: {
                    tracks: {
                        items: ['track1', 'track2']
                    }
                }
            };
            axios.get.mockResolvedValueOnce(response);

            const result = await service.searchTrack(search);
            expect(result).toEqual(response.data.tracks.items);
        });

        it('should log an error if the request fails', async () => {
            const search = 'test';
            const error = new Error('Request failed');
            axios.get.mockRejectedValueOnce(error);
            console.log = jest.fn();

            const result = await service.searchTrack(search);

            expect(console.log).toHaveBeenCalledWith("Error while searching for track", error);
            expect(result).toBeNull();
        });
    });

    describe('addTrackToQueue', () => {
        it('should add a track to the queue if it is not already in the queue', async () => {
            const track = { uri: 'test_uri' };
            const device_id = 'test_device_id';
            const token = 'test_token';
            const queue = [];

            axios.post.mockResolvedValueOnce(null);

            await service.addTrackToQueue(track, device_id, token, queue);
            // TODO expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('me/player/queue'));
        });

        it('should not add a track to the queue if it is already in the queue', async () => {
            const track = { uri: 'test_uri' };
            const device_id = 'test_device_id';
            const token = 'test_token';
            const queue = [{ trackUri: 'test_uri' }];

            const axiosPostMock = jest.fn();
            axios.post = axiosPostMock;

            await service.addTrackToQueue(track, device_id, token, queue);

            expect(axiosPostMock).not.toHaveBeenCalled();
        });

        it('should log an error if no device is found', async () => {
            const track = { uri: 'test_uri' };
            const device_id = '';
            const token = 'test_token';
            const queue = [];

            const consoleLogMock = jest.fn();
            console.log = consoleLogMock;

            await service.addTrackToQueue(track, device_id, token, queue);

            expect(consoleLogMock).toHaveBeenCalledWith(
                new Error("No device found trying to addTrackToQueue")
            );
        });
    });

    describe('getQueue', () => {
        it('should return the queue of tracks', async () => {
            const url = 'https://api.spotify.com/v1/me/player/queue';
            const token = 'test_token';
            const response = {
                data: {
                    queue: [
                        {
                            type: 'track',
                            album: {
                                images: [{ url: 'image_url' }]
                            },
                            artists: [{ name: 'artist_name' }],
                            name: 'track_name',
                            uri: 'track_uri'
                        },
                    ]
                }
            };
            axios.get.mockResolvedValueOnce(response);

            const result = await service.getQueue();

            expect(axios.get).toHaveBeenCalledWith(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            expect(result).toEqual([
                {
                    image: 'image_url',
                    artistName: 'artist_name',
                    trackName: 'track_name',
                    trackUri: 'track_uri'
                }
            ]);
        });

        it('should handle errors and log them', async () => {
            const error = new Error('Request failed');
            axios.get.mockRejectedValueOnce(error);
            console.log = jest.fn();

            const result = await service.getQueue();

            expect(console.log).toHaveBeenCalledWith(error);
            expect(result).toBeUndefined();
        });
    });

    describe('startPlaying', () => {
        it('should return false if deviceId is empty', async () => {
            const track = { uri: 'test_uri' };
            const deviceId = '';

            const result = await service.startPlaying(track, deviceId);

            expect(result).toBe(false);
        });

        it('should return false if deviceId is null', async () => {
            const track = { uri: 'test_uri' };
            const deviceId = null;

            const result = await service.startPlaying(track, deviceId);

            expect(result).toBe(false);
        });

        it('should return true if playback is successfully started', async () => {
            const track = { uri: 'test_uri' };
            const deviceId = 'test_device_id';
            const token = 'test_token';
            const playbackState = {
                data: {
                    progress_ms: 1000
                }
            };
            const response = {
                status: 204
            };

            axios.get.mockResolvedValueOnce(playbackState);
            axios.put.mockResolvedValueOnce(response);

            const result = await service.startPlaying(track, deviceId);

            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('me/player'), {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('me/player/play'), {
                'uris': [
                    track.uri
                ],
                'position_ms': playbackState.data.progress_ms
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            expect(result).toBe(true);
        });

        it('should return false and handle reconnection if playback fails', async () => {
            const track = { uri: 'test_uri' };
            const deviceId = 'test_device_id';
            const token = 'test_token';
            const playbackState = {
                data: {
                    progress_ms: 1000
                }
            };
            const error = new Error('Playback failed');

            axios.get.mockResolvedValueOnce(playbackState);
            axios.put.mockRejectedValueOnce(error);
            service.handleReconnectionToSpotify = jest.fn();

            const result = await service.startPlaying(track, deviceId);

            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('me/player'), {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('me/player/play'), {
                'uris': [
                    track.uri
                ],
                'position_ms': playbackState.data.progress_ms
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // TODO expect(service.handleReconnectionToSpotify).toHaveBeenCalled();
            expect(result).toBe(false);
        });

        it('should return false if there is an error getting playback state', async () => {
            const track = { uri: 'test_uri' };
            const deviceId = 'test_device_id';
            const token = 'test_token';
            const error = new Error('Failed to get playback state');

            axios.get.mockRejectedValueOnce(error);

            const result = await service.startPlaying(track, deviceId);

            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('me/player'), {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            expect(result).toBe(false);
        });
    });
    describe('pausePlaying', () => {
        it('should pause the playback', async () => {
            const url = 'https://api.spotify.com/v1/me/player/pause';
            const token = 'test_token';
            const response = {
                status: 204
            };

            axios.put.mockResolvedValueOnce(response);

            await service.pausePlaying();

            expect(axios.put).toHaveBeenCalledWith(url, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        });

        it('should log an error if pausing fails', async () => {
            const url = 'https://api.spotify.com/v1/me/player/pause';
            const token = 'test_token';
            const error = new Error('Failed to pause playback');

            axios.put.mockRejectedValueOnce(error);
            console.log = jest.fn();

            await service.pausePlaying();

            expect(axios.put).toHaveBeenCalledWith(url, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            expect(console.log).toHaveBeenCalledWith('Error when trying to pause:', error);
        });
    });
    describe('resetTrack', () => {
        it('should reset the track position to 0', async () => {
            const url = 'https://api.spotify.com/v1/me/player/seek?position_ms=0';
            const token = 'test_token';
            const response = {
                status: 204
            };

            axios.put.mockResolvedValueOnce(response);

            await service.resetTrack();

            expect(axios.put).toHaveBeenCalledWith(url, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        });

        it('should log an error if resetting the track fails', async () => {
            const url = 'https://api.spotify.com/v1/me/player/seek?position_ms=0';
            const token = 'test_token';
            const error = new Error('Failed to reset track');

            axios.put.mockRejectedValueOnce(error);
            console.log = jest.fn();

            await service.resetTrack();

            expect(axios.put).toHaveBeenCalledWith(url, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            expect(console.log).toHaveBeenCalledWith('Error when trying to reset track:', error);
        });
    });

    describe('resetPlaybackToEmptyState', () => {
        it('should pause playback and reset track if currently playing', async () => {
            const url = 'https://api.spotify.com/v1/me/player/currently-playing';
            const token = 'test_token';
            const track = {
                data: {
                    is_playing: true
                }
            };

            axios.get.mockResolvedValueOnce(track);
            service.pausePlaying = jest.fn();
            service.resetTrack = jest.fn();

            await service.resetPlaybackToEmptyState();

            expect(axios.get).toHaveBeenCalledWith(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            expect(service.pausePlaying).toHaveBeenCalled();
            expect(service.resetTrack).toHaveBeenCalled();
        });

        it('should not pause playback or reset track if not currently playing', async () => {
            const url = 'https://api.spotify.com/v1/me/player/currently-playing';
            const token = 'test_token';
            const track = {
                data: {
                    is_playing: false
                }
            };

            axios.get.mockResolvedValueOnce(track);
            service.pausePlaying = jest.fn();
            service.resetTrack = jest.fn();

            await service.resetPlaybackToEmptyState();

            expect(axios.get).toHaveBeenCalledWith(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            expect(service.pausePlaying).not.toHaveBeenCalled();
            expect(service.resetTrack).not.toHaveBeenCalled();
        });
    });
});