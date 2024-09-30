import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { roomsAPI } from "./services/roomsAPI";
import spotifySlice from "./services/spotify/spotifySlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [roomsAPI.reducerPath]: roomsAPI.reducer,
    spotify: spotifySlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomsAPI.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
