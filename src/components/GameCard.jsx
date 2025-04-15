import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useGames } from '../context/ItemContext'

const GameCard = ({ game }) => {
  const { deleteGame } = useGames()
  const navigate = useNavigate()

  // Separar los géneros por espacios
  const genres = game.genre?.split(',').map(g => g.trim()).filter(g => g) || []
  // Mostrar solo los primeros 3 géneros
  const visibleGenres = genres.slice(0, 3)
  const hiddenGenresCount = genres.length - 3

  const handleDelete = () => {
    Swal.fire({
      title: '¿Eliminar juego?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGame(game.id)
      }
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-emerald-50">
      <img
        src={game.thumbnail}
        alt={game.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-emerald-800 mb-2">{game.title}</h3>

        <div className="flex flex-wrap gap-2 mb-2">
          {visibleGenres.map((genre, index) => (
            <span
              key={index}
              className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-4">

          <button
            onClick={() => navigate(`/games/${game.id}`)}
            className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Ver más
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameCard