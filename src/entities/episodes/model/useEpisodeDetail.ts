import { ICharacter } from "@/entities/characters/types";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCharactersByIdsQuery, useGetEpisodeByIdQuery } from "../api";

const useEdpisodeDetail = () => {
  const { id } = useParams();
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
    null,
  );

  const { data: episode, isLoading: isEpisodeLoading } = useGetEpisodeByIdQuery(
    Number(id),
  );

  // Извлекаем ID персонажей из URL (https://.../character/1 -> 1)
  const characterIds =
    episode?.characters.map((url) => Number(url.split("/").pop())) || [];

  // Получаем данные всех персонажей этого эпизода
  const { data: characters, isLoading: isCharsLoading } =
    useGetCharactersByIdsQuery(characterIds, {
      skip: !characterIds.length, // Не делаем запрос, пока нет ID
    });

  return {
    episode,
    characters,
    characterIds,
    isCharsLoading,
    isEpisodeLoading,
    selectedCharacter,
    setSelectedCharacter,
  };
};

export default useEdpisodeDetail;
