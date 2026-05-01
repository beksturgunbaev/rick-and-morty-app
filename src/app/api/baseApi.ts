import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://rickandmortyapi.com/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Episode", "Character", "Location"],
  endpoints: (builder) => ({
    // Оставляем пустым, если планируете разделять эндпоинты по разным файлам (injectEndpoints)
    // Либо пишем запросы сразу здесь:
    // getEpisodes: builder.query({
    //     query: (page = 1) => `/episode?page=${page}`,
    //     providesTags: ['Episode'],
    // }),
    // getEpisodeById: builder.query({
    //     query: (id) => `/episode/${id}`,
    // }),
  }),
});
