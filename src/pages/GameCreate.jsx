import GameForm from '../components/GameForm'
import { useNavigate } from 'react-router-dom'

const GameCreate = () => {

  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      
      <h1 className="text-3xl font-bold mb-8">Agregar Nuevo Juego</h1>

      <button
        onClick={() => navigate(-1)} // Usa navigate(-1) para volver a la última página
        className="mb-6 text-emerald-600 hover:text-emerald-800 flex items-center gap-2 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver atrás
      </button>

      <GameForm />
    </div>
  );
};

export default GameCreate;