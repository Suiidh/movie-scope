import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function FilmDetails() {
  const router = useRouter();
  const { id } = router.query;

  // Remplacer les données par une requête API ou des données statiques
  const film = {
    id,
    title: 'Titre du Film',
    synopsis: 'Voici le synopsis du film...',
    cast: 'Acteurs principaux...',
    director: 'Réalisateur...',
    releaseYear: '2024',
    trailerUrl: 'https://youtube.com/trailer',
  };

  return (
    <Layout>
      <div className="container">
        <h1>{film.title}</h1>
        <img src={`/affiches/${id}.jpg`} alt={`Affiche du film ${film.title}`} />
        <p>{film.synopsis}</p>
        <p><strong>Réalisateur :</strong> {film.director}</p>
        <p><strong>Année de sortie :</strong> {film.releaseYear}</p>
        <p><strong>Acteurs :</strong> {film.cast}</p>

        <section className="trailer">
          <h2>Bande-annonce</h2>
          <iframe width="560" height="315" src={film.trailerUrl} title="Bande-annonce" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </section>

        <section className="reviews">
          <h2>Critiques et Notes</h2>
          {/* Section pour laisser une critique */}
        </section>
      </div>
    </Layout>
  );
}
