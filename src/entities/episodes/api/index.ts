import { IEpisode } from "../types";
import { baseApi } from "@/app/api/baseApi";
import { ICharacter } from "@/entities/characters/types";
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
    getCharactersByIds: builder.query<ICharacter[], number[]>({
      query: (ids) => `/character/${ids.join(",")}`,
    }),
  }),
});

export const {
  useGetEpisodesQuery,
  useGetEpisodeByIdQuery,
  useGetCharactersByIdsQuery,
} = episodesApi;
