import { EpisodeCard } from "@/entities/episodes/ui/edisodeCard"

const EpisodesPage = () => {
    return (
        <div className="container mx-auto py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <EpisodeCard name='Pilot' airDate='December 2, 2013' episodeCode='S01E01' />
            </div>
        </div>
    )
}

export default EpisodesPage