import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGames } from '../context/ItemContext';

const GameDetail = () => {
  const { id } = useParams();
  const { games } = useGames();
  const [game, setGame] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const foundGame = games.find(g => g.id === id);
    setGame(foundGame);
  }, [id, games]);

  if (!game) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div className="container mx-auto px-4 pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-emerald-50">

        <button
          onClick={() => navigate(-1)} // Usa navigate(-1) para volver a la última página con los filtros cargados
          className="mb-6 text-emerald-600 hover:text-emerald-800 flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver atrás
        </button>

        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-64 object-cover mb-6 rounded-lg"
        />
        <h1 className="text-3xl font-bold mb-4">{game.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">

            {/* Género */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Géneros</h2>
              <div className="flex flex-wrap gap-2">
                {game.genre?.split(',').filter(g => g).map((genre, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <p><span className="font-semibold">Plataforma:</span> {game.platform}</p>
            <p><span className="font-semibold">Desarrollador:</span> {game.developer}</p>
          </div>
          <div className="space-y-3">
            <p><span className="font-semibold">Editor:</span> {game.publisher}</p>
            <p><span className="font-semibold">Fecha de lanzamiento:</span> {new Date(game.release_date).toLocaleDateString()}</p>
            <p>
              <span className="font-semibold">URL del juego:</span>{' '}
              <a href={game.game_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Jugar ahora
              </a>
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Descripción</h2>
          <p className="text-gray-700">{game.short_description}</p>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate(`/games/${game.id}/edit`)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={() => navigate(-1)} // Usa navigate(-1) para volver a la última página con los filtros cargados
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
