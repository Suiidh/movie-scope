import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';  // Import du client Prisma
import { useRouter } from 'next/router';

type FilmProps = {
  film: {
    id: number;
    titre: string;
    image: string;
    description: string;
    duree: number;
    avis: number;
    dateSortie: string;
  } | null;
};

const FilmDetails = ({ film }: FilmProps) => {
  const router = useRouter();

  // Si aucun film n'est trouvé, afficher un message d'erreur
  if (!film) {
    return <p>Film non trouvé.</p>;
  }

  return (
    <div>
      <h1>{film.titre}</h1>
      <img src={film.image} alt={film.titre} style={{ width: '100%' }} />
      <p>{film.description}</p>
      <p>Durée: {film.duree} minutes</p>
      <p>Note moyenne: {film.avis}</p>
      <p>Date de sortie: {new Date(film.dateSortie).toLocaleDateString()}</p>
      <button onClick={() => router.back()}>Retour</button>
    </div>
  );
};

// Récupérer les détails d'un film selon son `id`
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const film = await prisma.film.findUnique({
    where: { id: Number(id) },  // Récupère le film avec l'ID
  });

  return {
    props: {
      film: film ? JSON.parse(JSON.stringify(film)) : null,
    },
  };
};

export default FilmDetails;
