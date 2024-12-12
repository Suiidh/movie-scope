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
            <div>
                <h1>Liste des Films</h1>

                {/* Barre de recherche */}
                <input
                    type="text"
                    placeholder="Rechercher par titre ou description..."
                    value={recherche}
                    onChange={(e) => gererRecherche(e.target.value)}
                    style={{
                        padding: '10px',
                        marginBottom: '20px',
                        width: '100%',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />

                {/* Affichage des films filtrés */}
                {filmsFiltres.length === 0 ? (
                    <p>Aucun film trouvé</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                        {filmsFiltres.map((film) => (
                            <div
                                key={film.id}
                                className="film-card"
                                style={{
                                    position: 'relative',
                                    border: '1px solid #ccc',
                                    padding: '1rem',
                                    borderRadius: '5px',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={film.image} // Chemin vers l'image
                                    alt={film.titre}
                                    style={{ width: '100%', borderRadius: '5px', transition: 'opacity 0.3s' }}
                                />
                                <h2>{film.titre}</h2>
                                <p>Durée: {film.duree}h</p>
                                <div
                                    className="description-hover"
                                    style={{
                                        position: 'absolute',
                                        inset: '0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        transition: 'opacity 0.3s',
                                        padding: '10px',
                                        textAlign: 'center',
                                        zIndex: -1, // Assure que le texte est au-dessus de l'image
                                    }}
                                >
                                    <p
                                        style={{
                                            margin: 0,
                                            color: 'black', // Couleur du texte
                                            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)', // Ombre pour le texte
                                            width: 400,
                                        }}
                                    >
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
                .film-card:hover .description-hover {
                    opacity: 1; // Rendre la description visible au survol
                }
                .film-card:hover img {
                    opacity: 0; // Rendre l'image invisible lors du survol
                }
            `}</style>
        </Layout>
    );
}
