// src/app/components/FilmList.tsx
"use client";
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

  const handleViewDetails = (id: number) => {
    router.push(`/film/${id}`);
  };

  return (
    <div className="grid-container">
      {films.map((film) => (
        <div key={film.id} className="movie-card">
          <img src={film.image} alt={film.titre} className="movie-image" />
          <div className="movie-info">
            <h3>{film.titre}</h3>
            <p>{film.description}</p>
            <button onClick={() => handleViewDetails(film.id)}>Voir les détails</button>
          </div>
        </div>
      ))}
      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
        }
        .movie-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .movie-image {
          width: 100%;
          height: auto;
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
          color: #666;
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
    </div>
  );
};

export default FilmList;
