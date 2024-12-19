
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
      <div className="container">
        <section className="recent-movies">
          <FilmList films={recentMovies} />
        </section>

        <section className="recommendations">
          <FilmList films={recommendedMovies} />
        </section>
      </div>
    </Layout>
  );
}
