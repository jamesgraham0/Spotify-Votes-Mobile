import { createAsyncThunk } from "@reduxjs/toolkit";
import socket from '../../../utils/socket';
import {
  CLIENT_ID,
} from "react-native-dotenv";
import Constants from "../../../utils/constants";
import axios from "axios"; // Add the import statement for axios

const BASE_URL = `${Constants.SERVER_URL}:${Constants.SERVER_PORT}/spotify`;
const concatUrl = (url) => `${BASE_URL}/${url}`;

export const getUserInfo = createAsyncThunk(
  "spotify/getUserInfo",
  async (accessToken) => {
    try {
      urlToGet = concatUrl("getUserInfo") + `?accessToken=${accessToken}`;
      const response = await axios.get(urlToGet);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get user info");
    }
  }
);

export const getMyDevicesAndTransferPlayback = createAsyncThunk(
  "spotify/getMyDevicesAndTransferPlayback",
  async () => {
    const url = concatUrl("me/player/devices");

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const devices = response.data.devices;

    const deviceTypes = ["Smartphone", "Computer", "Tablet", "Speaker"];
    let deviceToTransfer = null;

    for (const deviceType of deviceTypes) {
      deviceToTransfer = devices.find((device) => device.type === deviceType);
      if (deviceToTransfer) {
        break;
      }
    }

    if (deviceToTransfer) {
      const transferUrl = concatUrl("me/player/transfer-playback");
      await axios.put(transferUrl, {
        device_ids: [deviceToTransfer.id],
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return deviceToTransfer;
  }
);

export const getDeviceId = createAsyncThunk(
  "spotify/getDeviceId",
  async () => {
    const url = concatUrl("me/player/devices");

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const devices = response.data.devices;

    const deviceTypes = ["Smartphone", "Computer", "Tablet", "Speaker"];
    let deviceToTransfer = null;

    for (const deviceType of deviceTypes) {
      deviceToTransfer = devices.find((device) => device.type === deviceType);
      if (deviceToTransfer) {
        break;
      }
    }

    return deviceToTransfer ? deviceToTransfer.id : null;
  }
);

export const searchTrack = createAsyncThunk(
  "spotify/searchTrack",
  async (search) => {
    const url = concatUrl(`search?q=${encodeURIComponent(search)}&type=track`);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.tracks.items;
  }
);

export const addTrackToQueue = createAsyncThunk(
  "spotify/addTrackToQueue",
  async (track) => {
    const uri = track.uri;
    const url = concatUrl(`me/player/queue?uri=${uri}&device_id=${device_id}`);

    await axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return track;
  }
);

export const getQueue = createAsyncThunk(
  "spotify/getQueue",
  async () => {
    const url = concatUrl("me/player/queue");

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.queue.map((track) => {
      if (track.type === "track") {
        return {
          image: track.album.images[0].url,
          artistName: track.artists[0].name,
          trackName: track.name,
          trackUri: track.uri,
        };
      }
    });
  }
);

export const startPlaying = createAsyncThunk(
  "spotify/startPlaying",
  async (track, deviceId) => {
    const url = concatUrl("me/player/play");

    await axios.put(
      url,
      {
        uris: [track.uri],
        position_ms: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return track;
  }
);

export const pausePlaying = createAsyncThunk(
  "spotify/pausePlaying",
  async () => {
    const url = concatUrl("me/player/pause");

    await axios.put(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  }
);

export const resetTrack = createAsyncThunk(
  "spotify/resetTrack",
  async () => {
    const url = concatUrl("me/player/seek?position_ms=0");

    await axios.put(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  }
);

export const resetPlaybackToEmptyState = createAsyncThunk(
  "spotify/resetPlaybackToEmptyState",
  async () => {
    const url = concatUrl("me/player/currently-playing");

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let isPlaying = response.data.is_playing;
    if (isPlaying) {
      await pausePlaying();
      await resetTrack();
    }

    return true;
  }
);

