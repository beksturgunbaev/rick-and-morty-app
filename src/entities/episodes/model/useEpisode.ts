import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetEpisodesQuery } from "../api";
import { IEpisode } from "../types";

const useEpisode = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date">("name");

  // Реф для бесконечного скролла
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // Стучимся на бэкенд за списком серий
  const { data, currentData, isLoading, isFetching, isError } =
    useGetEpisodesQuery({
      page,
      name: debouncedValue,
    });

  // Если начали что-то искать, сбрасываем пагинацию в начало
  useEffect(() => {
    setPage(1);
  }, [debouncedValue]);

  // Не спамим запросами на каждый символ, ждем полсекунды паузы
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Проверяем, есть ли смысл грузить что-то дальше
  const hasMore = !!currentData?.info.next && !isError;

  // Функция для подгрузки следующей страницы
  const loadMore = useCallback(() => {
    if (hasMore && !isFetching && !isError) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isFetching, isError]);

  // Следим, когда юзер долистал до конца списка
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }, // Начинаем грузить чуть заранее
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [loadMore, hasMore, isFetching]);

  // Магия группировки: фильтруем, сортируем и раскладываем по сезонам
  const groupedEpisodes = useMemo(() => {
    if (isError || !data?.results) return {};

    // Сначала сортируем весь массив (по алфавиту или по дате)
    const sorted = [...data.results].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(a.air_date).getTime() - new Date(b.air_date).getTime();
    });

    // Раскидываем эпизоды по ключам "Season 1", "Season 2" и т.д.
    const groups = sorted.reduce((acc: { [key: string]: IEpisode[] }, ep) => {
      const seasonMatch = ep.episode.match(/S(\d+)/);
      const seasonNum = seasonMatch ? parseInt(seasonMatch[1]) : 0;
      const seasonKey = seasonNum ? `Season ${seasonNum}` : "Unknown";

      if (!acc[seasonKey]) acc[seasonKey] = [];
      acc[seasonKey].push(ep);
      return acc;
    }, {});

    // Чтобы сезоны в объекте не перемешались, сортируем их по порядку
    return Object.keys(groups)
      .sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, "")) || 0;
        const numB = parseInt(b.replace(/\D/g, "")) || 0;
        return numA - numB;
      })
      .reduce((acc: { [key: string]: IEpisode[] }, key) => {
        acc[key] = groups[key];
        return acc;
      }, {});
  }, [data, isError, sortBy]);

  return {
    sortBy,
    hasMore,
    setSortBy,
    isLoading,
    isFetching,
    searchQuery,
    observerTarget,
    setSearchQuery,
    groupedEpisodes,
  };
};

export default useEpisode;
