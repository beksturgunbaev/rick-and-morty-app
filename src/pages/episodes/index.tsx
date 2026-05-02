import { Loader } from "@/widgets";
import useEpisode from "@/entities/episodes/model/useEpisode"
import { EpisodeCard } from "@/entities/episodes/ui/edisodeCard"

const EpisodesPage = () => {
    const {
        sortBy,
        hasMore,
        setSortBy,
        isLoading,
        isFetching,
        searchQuery,
        observerTarget,
        setSearchQuery,
        groupedEpisodes
    } = useEpisode();

    return (
        <div className="bg-slate-950 min-h-screen">
            {/* Hero Section */}
            <div className="w-full h-80 overflow-hidden relative flex flex-col justify-center sm:items-center bg-cover bg-center"
                style={{ backgroundImage: `url('https://static.posters.cz/image/hp/66133.jpg')` }}>
                <span className="absolute top-0 left-0 w-full h-full bg-black/75 z-10" />
                <h1 className="text-white text-5xl sm:text-6xl font-black relative z-10 px-3 tracking-tighter text-center">
                    The <span className="text-lime-400">Multiverse</span> Archive
                </h1>
                <p className="text-white/60 mt-3 text-lg relative z-10 px-3 text-center font-light tracking-widest uppercase">
                    Interdimensional Episode Database
                </p>
            </div>
            <div className="container mx-auto py-12 px-4">
                {/* Панель управления: Поиск и Сортировка */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm">
                    {/* Поиск */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search episode by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-lime-400/50 transition-colors"
                        />
                        <div className="absolute right-4 top-3.5 text-slate-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>

                    {/* Сортировка */}
                    <div className="flex items-center gap-4">
                        <span className="text-slate-500 text-sm uppercase tracking-wider">Sort by:</span>
                        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                            <button
                                onClick={() => setSortBy('name')}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${sortBy === 'name' ? 'bg-lime-400 text-slate-900' : 'text-slate-400 hover:text-white'}`}
                            >
                                Name
                            </button>
                            <button
                                onClick={() => setSortBy('date')}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${sortBy === 'date' ? 'bg-lime-400 text-slate-900' : 'text-slate-400 hover:text-white'}`}
                            >
                                Date
                            </button>
                        </div>
                    </div>
                </div>

                {/* Список эпизодов с группировкой */}
                {isLoading || isFetching ? <div className="flex justify-center items-center pt-16">
                    <Loader />
                </div> : Object.keys(groupedEpisodes).length > 0 ? (
                    Object.entries(groupedEpisodes).map(([season, episodes]) => (
                        <section key={season} className="mb-10">
                            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
                                {season}
                                <div className="h-px grow bg-slate-800" />
                                <span className="text-sm font-mono text-lime-400">{episodes?.length} EP</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {episodes?.map((el) => (
                                    <EpisodeCard
                                        id={el.id}
                                        key={el.id}
                                        name={el.name}
                                        airDate={el.air_date}
                                        episodeCode={el.episode}
                                    />
                                ))}
                            </div>
                        </section>
                    ))
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-xl tracking-widest uppercase">No episodes found in this dimension</p>
                    </div>
                )}
            </div>
            <div ref={observerTarget} className="flex justify-center items-center">
                {hasMore && isFetching && <Loader />}
            </div>
        </div>
    );
}

export default EpisodesPage