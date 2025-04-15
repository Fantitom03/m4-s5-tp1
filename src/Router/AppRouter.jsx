import { Routes, Route } from 'react-router-dom';
import GameList from '../pages/GameList';
import GameDetail from '../pages/GameDetail';
import GameCreate from '../pages/GameCreate';
import GameEdit from '../pages/GameEdit';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      {/* Redirección desde la raíz */}
      <Route path="/" element={<GameList />} />

      {/* Rutas principales */}
      <Route path="/games" element={<GameList />} />
      <Route path="/games/create" element={<GameCreate />} />
      <Route path="/games/:id" element={<GameDetail />} />
      <Route path="/games/:id/edit" element={<GameEdit />} />

      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
