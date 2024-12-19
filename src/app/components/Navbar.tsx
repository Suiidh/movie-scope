"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Récupérer le token dans le localStorage ou le cookie
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décodage du JWT
      setUser({ name: decodedToken.name });
    }

    // Détecter le scroll pour appliquer l'effet
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
      <nav
          className={`fixed w-full top-0 z-50 ${isScrolled ? "bg-black bg-opacity-80 shadow-md" : "bg-black"} p-4 transition-all duration-300`}
          style={{ top: 0 }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo et texte à gauche */}
          <div className="flex items-center group">
            <Link href="/" className="flex items-center text-white no-underline">
              <img
                  src="/images/logo2.png"
                  alt="Logo du site"
                  className="h-12 w-auto transition-transform duration-300 transform group-hover:animate-spin-slow"
              />
              <span className="ml-2 text-2xl font-bold group-hover:cursor-pointer">
              Movie Scope
            </span>
            </Link>
          </div>

          {/* Liens de navigation au centre */}
          <ul className="flex space-x-8">
            <li>
              <Link
                  href="/"
                  className="text-white text-lg font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                  href="/films"
                  className="text-white text-lg font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Films
              </Link>
            </li>
            <li>
              <Link
                  href="/quiz"
                  className="text-white text-lg font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Quiz
              </Link>
            </li>
            <li>
              <Link
                  href="/about"
                  className="text-white text-lg font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
              >
                À propos
              </Link>
            </li>
          </ul>

          {/* Afficher le nom de l'utilisateur et le bouton de déconnexion si l'utilisateur est connecté */}
          <div className="flex space-x-4">
            {!user ? (
                <>
                  <Link
                      href="/login"
                      className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-bold hover:bg-red-700 transition-all duration-300"
                  >
                    Connexion
                  </Link>
                  <Link
                      href="/register"
                      className="bg-red-700 text-white py-2 px-6 rounded-lg text-lg font-bold hover:bg-red-800 transition-all duration-300"
                  >
                    Inscription
                  </Link>
                </>
            ) : (
                <>
                  <span className="text-white text-lg font-bold">{user.name}</span>
                  <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-bold hover:bg-red-700 transition-all duration-300"
                  >
                    Déconnexion
                  </button>
                </>
            )}
          </div>
        </div>
      </nav>
  );
}
