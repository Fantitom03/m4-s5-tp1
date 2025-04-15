import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useGames } from '../context/ItemContext';
import GameCard from '../components/GameCard';

const GameList = () => {
    const { games, fetchGames, searchQuery, filters } = useGames();
    const navigate = useNavigate()

    useEffect(() => {
        fetchGames();
    }, []);

    const getFilterMessage = () => {
        if (searchQuery && filters.value) {
            return `Mostrando resultados para "${searchQuery}" en ${filters.type === 'genre' ? 'género' : 'plataforma'} ${filters.value}`;
        }
        if (searchQuery) return `Buscando: "${searchQuery}"`;
        if (filters.value) return `Mostrando juegos de ${filters.type === 'genre' ? 'género' : 'plataforma'} ${filters.value}`;
        return "Todos los juegos";
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-emerald-800">Catálogo de Juegos</h1>
                <button
                    onClick={() => navigate("/games/create")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Nuevo Juego
                </button>
            </div>

            <div className="mb-6 bg-emerald-50 p-4 rounded-lg">
                <p className="text-emerald-800 font-medium">{getFilterMessage()}</p>
                <p className="text-emerald-600 text-sm mt-1">{games.length} juegos encontrados</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            {games.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-emerald-600 text-xl">No se encontraron juegos con estos filtros :(</p>
                </div>
            )}
        </div>
    )
}

export default GameList