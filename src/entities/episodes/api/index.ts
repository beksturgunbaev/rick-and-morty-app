import { IEpisode } from "../types";
import { baseApi } from "@/app/api/baseApi";
import { ApiResponse, IParams } from "@/shared/types";

export const episodesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEpisodes: builder.query<ApiResponse<IEpisode>, IParams>({
      query: ({ page = 1 }) => `/episode?page=${page}`,
      providesTags: ["Episode"],
    }),
    getEpisodeById: builder.query<IEpisode, number>({
      query: (id) => `/episode/${id}`,
    }),
  }),
});

export const { useGetEpisodesQuery, useGetEpisodeByIdQuery } = episodesApi;
