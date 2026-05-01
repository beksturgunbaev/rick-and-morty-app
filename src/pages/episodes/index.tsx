import { useGetEpisodesQuery } from "@/entities/episodes/api"
import { EpisodeCard } from "@/entities/episodes/ui/edisodeCard"

const EpisodesPage = () => {

    const { data, error, isLoading } = useGetEpisodesQuery({ page: 1 })
    console.log(data)

    return (
        <div className="bg-slate-900">
            <div className="w-full h-80 overflow-hidden relative flex flex-col justify-center items-center"
                style={{ backgroundImage: `url('https://static.posters.cz/image/hp/66133.jpg')` }}>
                <span className="absolute top-0 left-0 w-full h-full bg-black/70 z-10" />
                <h1 className="text-white text-6xl font-semibold relative z-10">The Multiverse Archive</h1>
                <p className="text-white/80 mt-3 text-xl relative z-10">Database of Rick and Morty’s interdimensional travels.</p>
            </div>
            <div className="container mx-auto py-8 px-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data?.results?.map((el) => (
                        <EpisodeCard
                            id={el?.id}
                            key={el?.id}
                            name={el?.name}
                            airDate={el?.air_date}
                            episodeCode={el?.episode}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EpisodesPage