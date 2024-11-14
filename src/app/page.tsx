// src/app/page.tsx (sans "use client")
import Layout from './components/Layout';
import prisma from './lib/prisma'; // Assurez-vous que prisma est bien configuré
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
<<<<<<< HEAD
    take: 6,
=======
    take: 7,
>>>>>>> 68a2317e074e3880d75877b699c1ee6dfde78013
  });

  const recommendedMovies = await prisma.film.findMany({
    where: {
      avis: {
        gte: 4.5,
      },
    },
<<<<<<< HEAD
    take: 6,
=======
    take: 5,
>>>>>>> 68a2317e074e3880d75877b699c1ee6dfde78013
  });

  return { recentMovies, recommendedMovies };
}

export default async function Home() {
  const { recentMovies, recommendedMovies } = await fetchFilms();

  return (
    <Layout>
      <div className="container">
        <section className="recent-movies">
          <h2>Films Récents</h2>
          <FilmList films={recentMovies} />
        </section>

        <section className="recommendations">
          <h2>Mes Recommandations</h2>
          <FilmList films={recommendedMovies} />
        </section>
      </div>
    </Layout>
  );
}
