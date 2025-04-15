import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-emerald-800 text-emerald-100 py-6 mt-8">
            <div className="container mx-auto px-4 text-center">
                <p className="mb-2">© 2024 Mejores Juegos Gratis. Todos los derechos reservados.</p>
                <div className="flex justify-center gap-4">
                    <a href="/about" className="hover:text-emerald-300 transition-colors">Acerca de</a>
                    <a href="/contact" className="hover:text-emerald-300 transition-colors">Contacto</a>
                    <a href="/privacy" className="hover:text-emerald-300 transition-colors">Privacidad</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer