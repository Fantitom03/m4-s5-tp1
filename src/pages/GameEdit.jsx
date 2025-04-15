import { useParams } from 'react-router-dom';
import { useGames } from '../context/ItemContext';
import GameForm from '../components/GameForm';
import { useNavigate } from 'react-router-dom';

const GameEdit = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { games } = useGames();
  const gameToEdit = games.find(game => game.id === id);

  return (
    <div className="container mx-auto px-4 py-8 pt-20">

      <h1 className="text-3xl font-bold mb-8">Editar Juego</h1>

      <button
        onClick={() => navigate(-1)} // Usa navigate(-1) para volver a la última página con los filtros cargados
        className="mb-6 text-emerald-600 hover:text-emerald-800 flex items-center gap-2 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver atrás
      </button>

      {gameToEdit ? (
        <GameForm initialData={gameToEdit} />
      ) : (
        <p>Cargando juego...</p>
      )}
    </div>
  );
};

export default GameEdit;