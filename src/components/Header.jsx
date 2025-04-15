import { useGames } from '../context/ItemContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { 
        searchQuery, 
        setSearchQuery,
        filters,
        setFilters,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        fetchGames
    } = useGames();
    
    const navigate = useNavigate();

    const genres = ['MMORPG', 'Shooter', 'Strategy', 'MOBA', 'Racing', 'Sports', 'Sandbox',
        'Survival', 'PvP', 'PvE', 'Zombie', 'First Person', 'Third Person', 'Card',
        'Battle Royale', 'Anime', 'Fighting', 'Action RPG', 'Action', 'Tower Defense', 'Horror'];
    
    const platforms = ['Web Browser', 'PC (Windows)', 'Mobile'];

    const handleLogoClick = () => {
        setSearchQuery('');
        setFilters({ type: '', value: '' });
        setIsMobileMenuOpen(false);
        fetchGames();
        navigate('/');
    };

    const clearFilters = () => {
        setFilters({ type: '', value: '' });
        setSearchQuery('');
    };

    return (
        <header className="bg-emerald-800 text-white shadow-lg w-full fixed top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <div onClick={handleLogoClick} className="flex items-center cursor-pointer">
                    <img
                        src="/logo.png"
                        alt="MJG"
                        className="h-12 object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Desktop Menu - Centrado */}
                <div className="hidden md:flex flex-1 items-center justify-center gap-4 max-w-3xl mx-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Buscar juegos..."
                            className="w-full px-4 py-2 rounded-lg bg-white text-emerald-900 focus:ring-2 focus:ring-emerald-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-2.5 text-emerald-600 hover:text-emerald-800 cursor-pointer"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            className="bg-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
                            value={filters.type}
                            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                        >
                            <option value="">Filtrar por...</option>
                            <option value="genre">Género</option>
                            <option value="platform">Plataforma</option>
                        </select>

                        {filters.type && (
                            <select
                                className="bg-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
                                value={filters.value}
                                onChange={(e) => setFilters(prev => ({ ...prev, value: e.target.value }))}
                            >
                                <option value="">Todos</option>
                                {filters.type === 'genre' 
                                    ? genres.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>))
                                    : platforms.map(platform => (
                                        <option key={platform} value={platform}>{platform}</option>))}
                            </select>
                        )}
                        
                        {(filters.type || searchQuery) && (
                            <button
                                onClick={clearFilters}
                                className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-emerald-800 p-4 space-y-4 cursor-pointer">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar juegos..."
                            className="w-full px-4 py-2 rounded-lg bg-white text-emerald-900 cursor-pointer"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-2.5 text-emerald-600 hover:text-emerald-800 cursor-pointer"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <div className="space-y-2">
                        <select
                            className="w-full bg-emerald-700 px-3 py-2 rounded-lg cursor-pointer"
                            value={filters.type}
                            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                        >
                            <option value="">Filtrar por...</option>
                            <option value="genre">Género</option>
                            <option value="platform">Plataforma</option>
                        </select>

                        {filters.type && (
                            <select
                                className="w-full bg-emerald-700 px-3 py-2 rounded-lg cursor-pointer"
                                value={filters.value}
                                onChange={(e) => setFilters(prev => ({ ...prev, value: e.target.value }))}
                            >
                                <option value="">Todos</option>
                                {filters.type === 'genre' 
                                    ? genres.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>))
                                    : platforms.map(platform => (
                                        <option key={platform} value={platform}>{platform}</option>))}
                            </select>
                        )}
                        
                        {(filters.type || searchQuery) && (
                            <button
                                onClick={clearFilters}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                            >
                                Limpiar Filtros
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;