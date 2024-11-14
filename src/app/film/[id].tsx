import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';
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

  if (!film) {
    return <p>Film non trouvé.</p>;
  }

  return (
    <div className="film-details">
      <h1>{film.titre}</h1>
      <div className="image-container">
        <img src={film.image} alt={film.titre} className="film-image" />
      </div>
      <p className="description">{film.description}</p>
      <div className="details">
        <p><strong>Durée:</strong> {film.duree} minutes</p>
        <p><strong>Note moyenne:</strong> {film.avis}</p>
        <p><strong>Date de sortie:</strong> {new Date(film.dateSortie).toLocaleDateString()}</p>
      </div>
      <button onClick={() => router.back()}>Retour</button>

      <style jsx>{`
        .film-details {
          max-width: 700px;
          margin: 40px auto;
          padding: 20px;
          text-align: center;
          background-color: #fdfdfd;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          color: #444;
        }
        .image-container {
          width: 100%;
          height: 350px;
          overflow: hidden;
          border-radius: 12px;
          margin-bottom: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .film-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        h1 {
          font-size: 2em;
          color: #333;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .description {
          font-size: 1em;
          color: #555;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .details {
          font-size: 0.95em;
          color: #666;
          text-align: left;
          margin: 0 auto;
          width: fit-content;
          line-height: 1.6;
        }
        .details p {
          margin: 4px 0;
        }
        button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1em;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

// Récupérer les détails d'un film selon son `id`
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const film = await prisma.film.findUnique({
    where: { id: Number(id) },
  });

  return {
    props: {
      film: film ? JSON.parse(JSON.stringify(film)) : null,
    },
  };
};

export default FilmDetails;
