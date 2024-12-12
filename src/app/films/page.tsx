"use client"; // Utilisation comme Client Component

import { useEffect, useState } from 'react';
import Layout from '../components/Layout'; // Ajuster le chemin du composant Layout

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
    const [recherche, setRecherche] = useState<string>(''); // Requête de recherche

    useEffect(() => {
        fetch('/api/films') // Récupérer les films via l'API
            .then((response) => response.json())
            .then((data) => {
                setFilms(data);
                setFilmsFiltres(data); // Par défaut, afficher tous les films
            })
            .catch((error) => console.error('Erreur lors du fetch des films:', error));
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
            <div className="container">
                <h1 className="title">Liste des Films</h1>

                {/* Barre de recherche */}
                <input
                    type="text"
                    placeholder="Rechercher par titre ou description..."
                    value={recherche}
                    onChange={(e) => gererRecherche(e.target.value)}
                    className="search-bar"
                />

                {/* Affichage des films filtrés */}
                {filmsFiltres.length === 0 ? (
                    <p>Aucun film trouvé</p>
                ) : (
                    <div className="films-grid">
                        {filmsFiltres.map((film) => (
                            <div
                                key={film.id}
                                className="film-card"
                            >
                                <img
                                    src={film.image} // Chemin vers l'image
                                    alt={film.titre}
                                    className="film-image"
                                />
                                <div className="film-info">
                                    <h2 className="film-title">{film.titre}</h2>
                                    <p className="film-duration">Durée: {film.duree}h</p>
                                </div>
                                <div className="description-hover">
                                    <p className="film-description">
                                        {film.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Style CSS pour l'effet hover */}
            <style jsx>{`
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .title {
                    font-size: 2rem;
                    text-align: center;
                    margin-bottom: 20px;
                    font-family: 'Arial', sans-serif;
                    color: #333;
                }

                .search-bar {
                    padding: 12px;
                    width: 100%;
                    font-size: 16px;
                    border-radius: 8px;
                    border: 1px solid #ccc;
                    margin-bottom: 30px;
                    box-sizing: border-box;
                    transition: border 0.3s ease;
                }

                .search-bar:focus {
                    border: 1px solid #ff4d4d; /* Accent color */
                    outline: none;
                }

                .films-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }

                .film-card {
                    position: relative;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    background-color: white;
                    transition: transform 0.3s ease;
                }

                .film-card:hover {
                    transform: translateY(-10px); /* Élève légèrement la carte */
                }

                .film-image {
                    width: 100%;
                    border-radius: 10px;
                    transition: opacity 0.3s ease;
                }

                .film-info {
                    padding: 15px;
                    background-color: rgba(255, 255, 255, 1);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    border-radius: 0 0 10px 10px;
                }

                .film-title {
                    font-size: 1.4rem;
                    color: #333;
                    margin: 0;
                    font-family: 'Arial', sans-serif;
                    font-weight: bold;
                }

                .film-duration {
                    font-size: 1rem;
                    color: #777;
                }

                .description-hover {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.7);
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    padding: 10px;
                    text-align: center;
                    z-index: 1;
                    border-radius: 10px;
                }

                .film-card:hover .description-hover {
                    opacity: 1; /* Affiche la description au survol */
                }

                .film-card:hover .film-image {
                    opacity: 0; /* Cache l'image au survol */
                }

                .film-description {
                    color: #fff;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
                    font-size: 1rem;
                    margin: 0;
                    max-width: 100%;
                    word-wrap: break-word;
                    line-height: 1.5;
                    padding-bottom: 60px;
                }
            `}</style>
        </Layout>
    );
}
