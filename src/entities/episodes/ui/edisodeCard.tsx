import React from 'react';
import { NavLink } from 'react-router-dom';

// Типизация данных согласно API Rick and Morty
interface EpisodeCardProps {
    id: number;
    name: string;      // Название: "Pilot"
    airDate: string;   // Дата выхода: "December 2, 2013"
    episodeCode: string; // Код: "S01E01"
    onClick?: () => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
    id,
    name,
    airDate,
    episodeCode,
    onClick
}) => {
    // Извлекаем номер сезона и серии из кода (S01E01 -> Сезон 1, Серия 1)
    const seasonMatch = episodeCode.match(/S(\d+)E(\d+)/);
    const seasonNumber = seasonMatch ? parseInt(seasonMatch[1], 10) : '?';
    const episodeNumber = seasonMatch ? parseInt(seasonMatch[2], 10) : '?';

    return (
        <NavLink to={`/episode/${id}`}
            onClick={onClick}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-800 border border-slate-700 p-5 transition-all duration-300 hover:border-lime-400/50 hover:shadow-[0_0_20px_rgba(163,230,53,0.15)] active:scale-[0.98]"
        >
            {/* Декоративный фон при наведении */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-lime-400/5 blur-3xl transition-opacity group-hover:opacity-100" />

            <div className="flex flex-col gap-4">
                {/* Код эпизода и сезон */}
                <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-cyan-400 text-[10px] font-bold uppercase tracking-widest border border-cyan-900/50">
                        {episodeCode}
                    </span>
                    <span className="text-slate-500 text-[10px] uppercase tracking-tighter">
                        Season {seasonNumber} • Episode {episodeNumber}
                    </span>
                </div>

                {/* Название эпизода */}
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-lime-400 transition-colors line-clamp-1">
                    {name}
                </h3>

                {/* Дата выхода */}
                <div className="flex items-center gap-2 mt-auto">
                    <svg
                        className="w-4 h-4 text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-slate-400 font-light">
                        {airDate}
                    </span>
                </div>
            </div>

            {/* Стрелочка, появляющаяся при наведении */}
            <div className="mt-4 flex justify-end">
                <span className="text-xs font-bold text-lime-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 flex items-center gap-1">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </div>
        </NavLink>
    );
};