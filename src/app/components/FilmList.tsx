"use client"; // Déclare ce composant comme un composant client

import { useRouter } from 'next/navigation';

type Film = {
  id: number;
  titre: string;
  image: string;
  description: string;
  duree: number;
  avis: number;
  dateSortie: string;
};

type FilmListProps = {
  films: Film[];
};

const FilmList = ({ films }: FilmListProps) => {
  const router = useRouter();

  const filmsRecents = films.filter((film) => {
    const dateSortie = new Date(film.dateSortie);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return dateSortie >= sixMonthsAgo;
  });

  const filmsRecommandes = films.filter(
      (film) => film.avis > 4 && !filmsRecents.includes(film)
  );

  const handleViewDetails = (id: number) => {
    router.push(`/film/${id}`);
  };

  return (
      <main className="main-container">
        <div className="page-container">
          {/* Films récents */}
          <section>
            <h2>Films récents</h2>
            <div className="grid-container">
              {filmsRecents.map((film) => (
                  <div key={film.id} className="movie-card">
                    <img src={film.image} alt={film.titre} className="movie-image" />
                    <div className="movie-info">
                      <h3>{film.titre}</h3>
                      <p>{film.description}</p>
                      <button onClick={() => handleViewDetails(film.id)}>
                        Voir les détails
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </section>

          {/* Films recommandés */}
          <section>
            <h2>Films recommandés</h2>
            <div className="grid-container">
              {filmsRecommandes.map((film) => (
                  <div key={film.id} className="movie-card">
                    <img src={film.image} alt={film.titre} className="movie-image" />
                    <div className="movie-info">
                      <h3>{film.titre}</h3>
                      <p>{film.description}</p>
                      <button onClick={() => handleViewDetails(film.id)}>
                        Voir les détails
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </section>
        </div>

        <style jsx>{`
          .main-container {
            width: 100%;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .page-container {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            text-align: center;
          }

          h2 {
            font-size: 1.8em;
            color: #fff;
            margin-bottom: 20px;
          }

          .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            justify-items: center;
          }

          .movie-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #333; /* Fond sombre */
            color: white;
            transition: transform 0.2s ease-in-out;
          }

          .movie-card:hover {
            transform: scale(1.05);
          }

          .movie-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
          }

          .movie-info {
            padding: 12px;
            text-align: center;
          }

          .movie-info h3 {
            margin: 0;
            font-size: 1.1em;
          }

          .movie-info p {
            font-size: 0.85em;
            color: #ccc;
            margin: 8px 0;
          }

          button {
            margin-top: 8px;
            padding: 6px 10px;
            background-color: #0070f3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          button:hover {
            background-color: #005bb5;
          }
        `}</style>
      </main>
  );
};

export default FilmList;