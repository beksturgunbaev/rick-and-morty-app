import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetEpisodesQuery } from "../api";
import { IEpisode } from "../types";

const useEpisode = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date">("name");

  const observerTarget = useRef<HTMLDivElement | null>(null);

  // Передаем searchQuery в запрос.
  // При вводе каждого символа будет улетать запрос
  const { data, isLoading, isFetching, isError } = useGetEpisodesQuery({
    page,
    name: searchQuery,
  });

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const hasMore = !!data?.info.next;

  const loadMore = useCallback(() => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isFetching]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [loadMore, hasMore, isFetching]);

  const groupedEpisodes = useMemo(() => {
    // Если данных нет (например, 404 при поиске), возвращаем пустой объект
    if (isError || !data?.results) return {};

    // 1. Сортируем (уже только результаты с сервера)
    let sorted = [...data.results].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(a.air_date).getTime() - new Date(b.air_date).getTime();
    });

    // 2. Группируем по сезонам
    return sorted.reduce((acc: { [key: string]: IEpisode[] }, ep) => {
      const seasonMatch = ep.episode.match(/S(\d+)/);
      const season = seasonMatch
        ? `Season ${parseInt(seasonMatch[1])}`
        : "Unknown";
      if (!acc[season]) acc[season] = [];
      acc[season].push(ep);
      return acc;
    }, {});
  }, [data, sortBy]);
  return {
    sortBy,
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
