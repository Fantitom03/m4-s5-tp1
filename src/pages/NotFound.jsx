import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
      <button
        onClick={() => navigate('/')}
        className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors
        cursor-pointer"
      >
        Volver al catálogo
      </button>
    </div>
  );
};

export default NotFound;