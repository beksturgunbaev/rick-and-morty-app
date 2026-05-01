import { IEpisode } from "../types";
import { baseApi } from "@/app/api/baseApi";
import { ICharacter } from "@/entities/characters/types";
import { ApiResponse, IParams } from "@/shared/types";

export const episodesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEpisodes: builder.query<ApiResponse<IEpisode>, IParams>({
      query: ({ page = 1, name = "" }) => `/episode?page=${page}&name=${name}`,
      // 1. Указываем, как кэшировать запросы.
      // Мы исключаем 'page' из ключа кэша, чтобы поиск по одному и тому же 'name'
      // считался единым потоком данных, в который мы "доливаем" страницы.
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.name || ""}`;
      },
      // 2. Склеиваем результаты
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          // Если это первая страница (новый поиск), полностью заменяем данные
          return newItems;
        }
        // Если страница > 1, добавляем новые эпизоды в конец существующего списка
        currentCache.results.push(...newItems.results);
        currentCache.info = newItems.info;
      },
      // 3. Принудительно перезапрашиваем данные, если аргументы изменились
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

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
