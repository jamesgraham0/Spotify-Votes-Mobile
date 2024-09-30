// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "../../utils/constants";

// Define a service using a base URL and expected endpoints
export const roomsAPI = createApi({
  reducerPath: "roomsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${Constants.SERVER_URL}:${Constants.SERVER_PORT}` }),
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => "/rooms",
    }),
    getQueueById: builder.query({
      query: (id) => `/queue/${id}`,
    }),
    getCodeById: builder.query({
      query: (id) => `/code/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRoomsQuery, useGetQueueByIdQuery, useGetCodeByIdQuery } = roomsAPI;
