import { createSlice } from "@reduxjs/toolkit";
import {
  getUserInfo,
  getMyDevicesAndTransferPlayback,
  getDeviceId,
  searchTrack,
  addTrackToQueue,
  getQueue,
  startPlaying,
  pausePlaying,
  resetTrack,
  resetPlaybackToEmptyState,
} from "./spotifyAPI";

const initialState = {
  userData: {}, // { display_name, email, external_urls, followers, href, id, images, product, type, uri }
  accessToken: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  
  // Sync reducers
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true;
    },
  },
  
  // Async reducers
  extraReducers: (builder) => {
    builder
      // getUserInfo
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.error = action.error.message
          ? action.error.message
          : "Error setting user info";
        state.isLoading = false;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })

      // getMyDevicesAndTransferPlayback
      .addCase(getMyDevicesAndTransferPlayback.fulfilled, (state, action) => {
        state.devices = action.payload;
      })
      .addCase(getMyDevicesAndTransferPlayback.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // getDeviceId
      .addCase(getDeviceId.fulfilled, (state, action) => {
        state.deviceId = action.payload;
      })
      .addCase(getDeviceId.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // searchTrack
      .addCase(searchTrack.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(searchTrack.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // addTrackToQueue
      .addCase(addTrackToQueue.fulfilled, (state, action) => {
        state.queue = [...state.queue, action.payload];
      })
      .addCase(addTrackToQueue.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // getQueue
      .addCase(getQueue.fulfilled, (state, action) => {
        state.queue = action.payload;
      })
      .addCase(getQueue.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // startPlaying
      .addCase(startPlaying.fulfilled, (state, action) => {
        state.playbackState = { ...state.playbackState, isPlaying: true };
      })
      .addCase(startPlaying.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // pausePlaying
      .addCase(pausePlaying.fulfilled, (state, action) => {
        state.playbackState = { ...state.playbackState, isPlaying: false };
      })
      .addCase(pausePlaying.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // resetTrack
      .addCase(resetTrack.fulfilled, (state, action) => {
        state.playbackState = { ...state.playbackState, currentTime: 0 };
      })
      .addCase(resetTrack.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // resetPlaybackToEmptyState
      .addCase(resetPlaybackToEmptyState.fulfilled, (state, action) => {
        state.playbackState = {};
        state.queue = [];
      })
      .addCase(resetPlaybackToEmptyState.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setAccessToken } = spotifySlice.actions;

export default spotifySlice;
