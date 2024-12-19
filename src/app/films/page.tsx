"use client"; // Utilisation comme Client Component

import { useEffect, useState } from "react";
import Layout from "../components/Layout"; // Ajuster le chemin du composant Layout

// Définir un type pour les films
type Film = {
    id: number;
    titre: string;
    image: string;
    duree: number;
    description: string;
};

export default function FilmsPage() {
    const [films, setFilms] = useState<Film[]>([]); // Données des films
    const [filmsFiltres, setFilmsFiltres] = useState<Film[]>([]); // Films après filtrage
    const [recherche, setRecherche] = useState<string>(""); // Requête de recherche

    useEffect(() => {
        fetch("/api/films") // Récupérer les films via l'API
            .then((response) => response.json())
            .then((data) => {
                setFilms(data);
                setFilmsFiltres(data); // Par défaut, afficher tous les films
            })
            .catch((error) =>
                console.error("Erreur lors du fetch des films:", error)
            );
    }, []);

    // Gérer la recherche
    const gererRecherche = (query: string) => {
        setRecherche(query);
        const filmsFiltres = films.filter((film) => {
            return (
                film.titre.toLowerCase().includes(query.toLowerCase()) || // Filtrer par titre
                film.description.toLowerCase().includes(query.toLowerCase()) // Filtrer par description
            );
        });
        setFilmsFiltres(filmsFiltres); // Mettre à jour les films filtrés
    };

    return (
        <Layout>
            <div className="min-h-screen py-10 text-white">
                <div className="w-full text-center mb-8">
                    <input
                        type="text"
                        value={recherche}
                        onChange={(e) => gererRecherche(e.target.value)}
                        placeholder="Rechercher un film..."
                        className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-red-600"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {filmsFiltres.map((film) => (
                        <div
                            key={film.id}
                            className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in hover:scale-105 group"
                        >
                            <img
                                src={film.image} // Chemin vers l'image
                                alt={film.titre}
                                className="w-full h-[400px] object-cover transition-opacity duration-300"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-80 rounded-b-lg">
                                <h2 className="text-2xl font-bold text-white">{film.titre}</h2>
                                <p className="text-sm text-gray-300">Durée: {film.duree}h</p>
                            </div>
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 rounded-lg">
                                <p className="text-lg text-center">{film.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
