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
  const [films, setFilms] = useState<Film[]>([]); // Préciser le type des films

  useEffect(() => {
    fetch('/api/films') // Appel de la route API
      .then((response) => response.json())
      .then((data) => setFilms(data))
      .catch((error) => console.error('Erreur lors du fetch des films:', error));
  }, []);

  return (
    <Layout>
      <div>
        <h1>Liste des Films</h1>
        {films.length === 0 ? (
          <p>Aucun film trouvé</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {films.map((film) => (
              <div 
                key={film.id} 
                style={{ 
                  position: 'relative', 
                  border: '1px solid #ccc', 
                  padding: '1rem', 
                  borderRadius: '5px',
                  overflow: 'hidden' 
                }}
              >
                <img 
                  src={`${film.image}`} // Chemin vers l'image
                  alt={film.titre} 
                  style={{ width: '100%', borderRadius: '5px', transition: 'opacity 0.3s' }}  
                />
                <h2>{film.titre}</h2>
                <p>Durée: {film.duree}h</p>
                <div 
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Arrière-plan sombre
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: '0', // Commence à zéro
                    transition: 'opacity 0.3s',
                    padding: '10px',
                    textAlign: 'center',
                    zIndex: 1, // Assure que le texte est au-dessus de l'image
                  }}
                  className="description-hover"
                >
                  <p style={{ 
                    margin: 0, 
                    color: 'white', // Couleur du texte blanche
                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)', // Ombre pour le texte
                  }}>
                    {film.description}
                  </p>
                </div>
                {/* Change l'opacité sur le survol de l'image */}
                <style jsx>{`
                  div:hover .description-hover {
                    opacity: 1; // Rend visible la description au survol
                  }
                  div:hover img {
                    opacity: 0; // Rend l'image invisible lors du survol
                  }
                `}</style>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
