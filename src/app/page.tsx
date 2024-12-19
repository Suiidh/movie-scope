// src/app/page.tsx (sans "use client")
import Layout from './components/Layout';
import { prisma } from './lib/prisma'; // Assurez-vous que prisma est bien configuré
import FilmList from './components/FilmList'; // Composant client pour afficher les films

type Film = {
  id: number;
  titre: string;
  image: string;
  description: string;
  duree: number;
  avis: number;
  dateSortie: string;
};

// Fonction de récupération des données depuis la base de données
async function fetchFilms() {
  const recentMovies = await prisma.film.findMany({
    orderBy: {
      dateSortie: 'desc',
    },
    take: 6,
  });

  const recommendedMovies = await prisma.film.findMany({
    where: {
      avis: {
        gte: 4.5,
      },
    },
    take: 6,
  });

  return { recentMovies, recommendedMovies };
}

export default async function Home() {
  const { recentMovies, recommendedMovies } = await fetchFilms();

  return (
      <Layout>
        <div className="flex flex-col items-center px-4 py-10 bg-black text-white">
          {/* Films récents */}
          <section className="recent-movies mb-16 w-full max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-red-600 mb-6 text-center">Films récents</h2>
            <FilmList films={recentMovies} />
          </section>

          {/* Films recommandés */}
          <section className="recommendations w-full max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-red-600 mb-6 text-center">Films recommandés</h2>
            <FilmList films={recommendedMovies} />
          </section>
        </div>
      </Layout>
  );
}
