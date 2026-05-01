import { Link } from 'react-router-dom';
import { Modal } from '@/shared/ui/modal';
import { CharacterModal } from '@/entities/characters/ui/characterModal';
import useEdpisodeDetail from '@/entities/episodes/model/useEpisodeDetail';

const EpisodeDetailsPage = () => {
    const {
        episode,
        characters,
        characterIds,
        isCharsLoading,
        isEpisodeLoading,
        selectedCharacter,
        setSelectedCharacter
    } = useEdpisodeDetail()

    if (isEpisodeLoading) return <div className="p-20 text-center text-lime-400 animate-pulse">Opening portal...</div>;

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            <div className="bg-slate-900 border-b border-slate-800 py-12 px-6 mb-10">
                <div className="max-w-7xl mx-auto">
                    <Link to="/" className="text-lime-400 text-sm hover:underline mb-4 inline-block">
                        ← Back to Episodes
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                                {episode?.episode}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-white mt-2 tracking-tighter">
                                {episode?.name}
                            </h1>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-500 uppercase text-xs tracking-widest">Air Date</p>
                            <p className="text-xl text-slate-200 font-light">{episode?.air_date}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    Characters in this episode
                    <span className="text-sm font-normal text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                        {characterIds.length}
                    </span>
                </h2>

                {isCharsLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="h-64 bg-slate-900 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {characters?.map((char) => (
                            <button
                                key={char.id}
                                onClick={() => setSelectedCharacter(char)}
                                className="group bg-slate-900 rounded-2xl overflow-hidden cursor-pointer outline-none border border-slate-800 hover:border-lime-400/50 transition-all duration-300"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={char.image}
                                        alt={char.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-white font-bold text-sm group-hover:text-lime-400 transition-colors truncate">
                                        {char.name}
                                    </h3>
                                    <p className="text-slate-500 text-xs mt-1">
                                        {char.species} — {char.status}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <Modal
                isOpen={!!selectedCharacter}
                onClose={() => setSelectedCharacter(null)}
            >
                {selectedCharacter && <CharacterModal character={selectedCharacter} />}
            </Modal>
        </div>
    );
};

export default EpisodeDetailsPage;