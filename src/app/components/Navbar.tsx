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
          className={`${
              isScrolled
                  ? "fixed bg-black bg-opacity-80 shadow-md"
                  : "relative bg-black"
          } w-full top-0 z-50 p-4 transition-all duration-300`}
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
                  className="text-white text-lg font-bold py-2 px-4 rounded relative group"
              >
                Accueil
                <span
                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                  href="/films"
                  className="text-white text-lg font-bold py-2 px-4 rounded relative group"
              >
                Films
                <span
                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                  href="/quiz"
                  className="text-white text-lg font-bold py-2 px-4 rounded relative group"
              >
                Quiz
                <span
                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                  href="/about"
                  className="text-white text-lg font-bold py-2 px-4 rounded relative group"
              >
                À propos
                <span
                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>

          {/* Afficher le nom de l'utilisateur et le bouton de déconnexion si l'utilisateur est connecté */}
          <div className="flex space-x-4">
            {!user ? (
                <>
                  {/* Connexion - Bouton rouge clair */}
                  <Link
                      href="/login"
                      className="bg-red-500 text-white py-2 px-6 rounded-lg text-lg font-bold
          hover:bg-red-700 hover:scale-105 hover:shadow-md
          transition-all duration-300"
                  >
                    Connexion
                  </Link>

                  {/* Inscription - Bouton rouge foncé */}
                  <Link
                      href="/register"
                      className="bg-red-900 text-white py-2 px-6 rounded-lg text-lg font-bold
          hover:bg-red-900 hover:scale-105 hover:shadow-md
          transition-all duration-300"
                  >
                    Inscription
                  </Link>
                </>
            ) : (
                <>
                  <span className="text-white text-lg font-bold">{user.name}</span>
                  <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-bold
          hover:bg-red-700 hover:scale-105 hover:shadow-md
          transition-all duration-300"
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
