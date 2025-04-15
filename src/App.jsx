import AppRouter from './Router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from './components/Header';


function App() {
    return (
        <div className="min-h-screen flex flex-col bg-emerald-50"> {/* Fondo general */}
            <Header />

            <main className="flex-grow"> {/* Espacio para el header */}
                <AppRouter />
            </main>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                toastClassName="!bg-emerald-100 !text-emerald-800"
                progressClassName="!bg-emerald-400"
            />

            <Footer />
        </div>
    );
}

export default App;