import { ICharacter } from '../types';

export const CharacterModal = ({ character }: { character: ICharacter }) => {
    return (
        <div>
            <img src={character.image} alt={character.name} className="w-full aspect-square object-cover" />
            <div className="p-6">
                <h2 className="text-2xl font-bold text-white">{character.name}</h2>
                <div className="mt-4 space-y-2 text-slate-300">
                    <p><span className="text-slate-500">Status:</span> {character.status}</p>
                    <p><span className="text-slate-500">Species:</span> {character.species}</p>
                    <p><span className="text-slate-500">Gender:</span> {character.gender}</p>
                    <p><span className="text-slate-500">Origin:</span> {character.origin.name}</p>
                    <p><span className="text-slate-500">Last location:</span> {character.location.name}</p>
                </div>
            </div>
        </div>
    );
};