// src/app/components/Layout.tsx

import Navbar from './Navbar';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />  {/* Barre de navigation */}
            <main style={{ flex: '1', backgroundColor: '#1a1a1a' }}>{children}</main> {/* Contenu principal */}

            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
                    <div className="text-center sm:text-left">
                        <p className="text-lg font-semibold">© Movie Scope</p>
                        <p className="text-sm text-gray-400">Votre source d'inspiration cinématographique</p>
                    </div>
                    <div className="flex space-x-6 text-lg">
                        <Link href="/" className="hover:text-red-600">Accueil</Link>
                        <Link href="/about" className="hover:text-red-600">À propos</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
