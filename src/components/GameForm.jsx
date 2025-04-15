import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGames } from '../context/ItemContext';
import { toast } from 'react-toastify';


// Lista de géneros permitidos
const ALLOWED_GENRES = ['MMORPG', 'Shooter', 'Strategy', 'MOBA', 'Racing', 'Sports', 'Sandbox',
  'Survival', 'PvP', 'PvE', 'Zombie', 'First Person', 'Third Person', 'Card',
  'Battle Royale', 'Anime', 'Fighting', 'Action RPG', 'Action', 'Tower Defense', 'Horror'];

const GameForm = ({ initialData }) => {
  const [game, setGame] = useState(initialData || {
    title: '',
    thumbnail: '',
    short_description: '',
    game_url: '',
    platform: 'Web Browser',
    publisher: '',
    developer: '',
    release_date: '',
    freetogame_profile_url: ''
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { createGame, updateGame } = useGames();

  // Efecto para inicializar géneros
  useEffect(() => {
    if (initialData) {
      setGame(initialData);
      if (initialData.genre) {
        setSelectedGenres(
          initialData.genre.split(',').map(g => g.trim()).filter(g => g)
        );
      }
    }
  }, [initialData]);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };


  /* VALIDACIÓN */

  const validateForm = () => {
    const newErrors = {};
    if (!game.title) newErrors.title = 'Título requerido';
    if (!game.short_description) newErrors.short_description = 'Descripción requerida';
    if (selectedGenres.length === 0) newErrors.genre = 'Selecciona al menos un género';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  /* HANDLE */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Completa los campos requeridos');
      return;
    }

    const gameToSend = {
      ...game,
      genre: selectedGenres.join(', ')
    };

    try {
      const success = initialData
        ? await updateGame(gameToSend.id, gameToSend)
        : await createGame(gameToSend);

      if (success) navigate('/games');
    } catch (error) {
      toast.error('Error al guardar el juego');
    }
  };

  const handleChange = (field, value) => {
    setGame(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };


  // Reemplaza TODAS las referencias de estilo en el JSX por:
  const inputStyle = (field) =>
    `mt-1 block w-full rounded-lg shadow-sm p-3 border-2 ${errors[field]
      ? 'border-red-500 bg-red-50'
      : 'border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
    } transition-colors`;


  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 p-4 pt-5">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-emerald-50">

        <h1 className="text-3xl font-bold text-emerald-800 mb-8">
          {initialData ? 'Editar Juego' : 'Crear Nuevo Juego'}
        </h1>

        {/* Título */}
        <div className="space-y-6">
          <label className="block text-sm font-medium text-emerald-700">Título*</label>
          <input
            type="text"
            value={game.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={inputStyle('title')}
            required
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Descripción corta */}
        <div>
          <label className="block text-sm font-medium text-emerald-700">Descripción corta*</label>
          <textarea
            value={game.short_description}
            onChange={(e) => handleChange('short_description', e.target.value)}
            className={inputStyle('short_description')}
            rows="3"
            required
          />
          {errors.short_description && <p className="mt-1 text-sm text-red-600">{errors.short_description}</p>}
        </div>

        {/* URL de la miniatura */}
        <div>
          <label className="block text-sm font-medium text-emerald-700">URL de la miniatura (imagen)</label>
          <input
            type="url"
            value={game.thumbnail}
            onChange={(e) => setGame({ ...game, thumbnail: e.target.value })}
            className={inputStyle('url_thumbnail')}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        {/* Género - Selección múltiple */}
        <div>

          <label className="block text-sm font-medium text-emerald-700">Géneros*</label>
          <div className="mt-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedGenres.map(genre => (
                <span
                  key={genre}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm"
                >
                  {genre}
                  <button
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className="ml-2 text-emerald-500 hover:text-emerald-700 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {ALLOWED_GENRES.map(genre => (
                <button
                  type="button"
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`cursor-pointer px-3 py-1 rounded text-sm text-center ${selectedGenres.includes(genre)
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {errors.genre && <p className="mt-1 text-sm text-red-600">{errors.genre}</p>}

        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Plataforma */}
          <div>
            <label className="block text-sm font-medium text-emerald-700">Plataforma</label>
            <select
              value={game.platform}
              onChange={(e) => setGame({ ...game, platform: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2 border Supercell cursor-pointer"
              required
            >
              <option value="Web Browser">Navegador Web</option>
              <option value="PC (Windows)">PC (Windows)</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Desarrollador */}
          <div>
            <label className="block text-sm font-medium text-emerald-700">Desarrollador</label>
            <input
              type="text"
              value={game.developer}
              onChange={(e) => setGame({ ...game, developer: e.target.value })}
              className={inputStyle('short_description')}
            />
          </div>

          {/* Publisher */}
          <div>
            <label className="block text-sm font-medium text-emerald-700">Editor (Publisher)</label>
            <input
              type="text"
              value={game.publisher}
              onChange={(e) => setGame({ ...game, publisher: e.target.value })}
              className={inputStyle('short_description')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fecha de lanzamiento */}
          <div>
            <label className="block text-sm font-medium text-emerald-700">Fecha de lanzamiento</label>
            <input
              type="date"
              value={game.release_date}
              onChange={(e) => setGame({ ...game, release_date: e.target.value })}
              className={inputStyle('short_description')}
            />
          </div>

          {/* URL del juego */}
          <div>
            <label className="block text-sm font-medium text-emerald-700">URL del juego</label>
            <input
              type="url"
              value={game.game_url}
              onChange={(e) => setGame({ ...game, game_url: e.target.value })}
              className={inputStyle('short_description')}
              placeholder="https://ejemplo.com/juego"
            />
          </div>
        </div>

        {/* URL del perfil en FreeToGame */}
        <div>
          <label className="block text-sm font-medium text-emerald-700">URL del perfil en FreeToGame</label>
          <input
            type="url"
            value={game.freetogame_profile_url}
            onChange={(e) => setGame({ ...game, freetogame_profile_url: e.target.value })}
            className={inputStyle('short_description')}
            placeholder="https://www.freetogame.com/nombre-juego"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer
          py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          {initialData ? 'Actualizar Juego' : 'Crear Juego'}
        </button>
      </div>
    </form>
  );
};

export default GameForm;