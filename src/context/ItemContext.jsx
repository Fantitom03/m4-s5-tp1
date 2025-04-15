import { createContext, useContext, useState, useMemo } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const GameContext = createContext()

const API_URL = 'https://67fbef671f8b41c81685508e.mockapi.io/games'

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ type: '', value: '' })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchGames = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(API_URL)
      setGames(response.data)
    } catch (error) {
      toast.error('Error cargando juegos')
      console.error('Error fetching games:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredGames = useMemo(() => {
    if (!searchQuery && (!filters.type || !filters.value)) {
      return games // No aplicar filtros si no hay criterios
    }

    return games.filter(game => {
      // Normalizar búsqueda (ignorar acentos y mayúsculas)
      const normalizedTitle = game.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
      
      const normalizedQuery = searchQuery
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()

      const matchesSearch = searchQuery 
        ? normalizedTitle.includes(normalizedQuery)
        : true
      
      // Aplicar filtros solo si ambos (type y value) están presentes
      const matchesFilter = filters.type && filters.value
        ? filters.type === 'genre'
          ? game.genre.split(',').map(g => g.trim()).includes(filters.value)
          : game.platform === filters.value
        : true
      
      return matchesSearch && matchesFilter
    })
  }, [games, searchQuery, filters])

  const createGame = async (game) => {
    try {
      const response = await axios.post(API_URL, game)
      setGames(prev => [...prev, response.data])
      toast.success('Juego creado exitosamente!')
      return true
    } catch (error) {
      toast.error('Error creando juego')
      console.error('Error creating game:', error)
      return false
    }
  }

  const updateGame = async (id, updatedGame) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedGame)
      setGames(prev => prev.map(game => game.id === id ? updatedGame : game))
      toast.success('Juego actualizado!')
      return true
    } catch (error) {
      toast.error('Error actualizando juego')
      console.error('Error updating game:', error)
      return false
    }
  }

  const deleteGame = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setGames(prev => prev.filter(game => game.id !== id))
      toast.success('Juego eliminado!')
    } catch (error) {
      toast.error('Error eliminando juego')
      console.error('Error deleting game:', error)
    }
  }

  return (
    <GameContext.Provider value={{ 
      games: filteredGames,
      fetchGames,
      createGame,
      updateGame,
      deleteGame,
      searchQuery,
      setSearchQuery,
      filters,
      setFilters,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      isLoading
    }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGames = () => useContext(GameContext)