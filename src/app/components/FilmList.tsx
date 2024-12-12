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

git       </main>
  );
};

export default FilmList;
