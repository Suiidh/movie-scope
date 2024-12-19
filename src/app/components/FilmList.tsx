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

  // Filtrer les films récents : films sortis dans les 6 derniers mois
  const filmsRecents = films.filter((film) => {
    const dateSortie = new Date(film.dateSortie);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return dateSortie >= sixMonthsAgo;
  });

  // Filtrer les films recommandés : films avec un avis > 4 et non récents
  const filmsRecommandes = films.filter(
      (film) => film.avis > 4 && !filmsRecents.some(f => f.id === film.id) // Exclure les films récents
  );

  const handleViewDetails = (id: number) => {
    router.push(`/film/${id}`);
  };

  return (
      <main className="min-h-screen text-white py-10">
        <div className="w-full mx-auto text-center py-4">
          {/* Films recommandés */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 m-4">
              {filmsRecommandes.length > 0 ? (
                  filmsRecommandes.map((film) => (
                      <div
                          key={film.id}
                          className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col"
                      >
                        <img
                            src={film.image}
                            alt={film.titre}
                            className="w-full h-[400px] object-cover transition-opacity duration-300"
                        />
                        {/* Conteneur de la description */}
                        <div className="flex-grow p-6 bg-gray-900 rounded-b-lg">
                          <h3 className="text-2xl font-bold">{film.titre}</h3>
                          <p className="text-sm text-gray-300 line-clamp-3">{film.description}</p>
                          <button
                              onClick={() => handleViewDetails(film.id)}
                              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                          >
                            Voir les détails
                          </button>
                        </div>
                      </div>
                  ))
              ) : (
                  <p className="text-gray-300">Aucun film recommandé disponible.</p>
              )}
            </div>
          </section>
        </div>
      </main>
  );
};

export default FilmList;
