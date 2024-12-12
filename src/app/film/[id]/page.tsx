import { prisma } from '../../lib/prisma'; // Assure-toi que Prisma est bien configuré
import { notFound } from 'next/navigation';

export default async function FilmDetails({ params }: { params: { id: string } }) {
    const filmId = parseInt(params.id, 10);

    if (isNaN(filmId)) {
        notFound(); // Gère les cas où l'ID n'est pas valide
    }

    // Récupère les détails du film depuis la base
    const film = await prisma.film.findUnique({
        where: { id: filmId },
    });

    if (!film) {
        notFound(); // Retourne une page 404 si le film est introuvable
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-8">
            <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-6">
                <img
                    src={film.image}
                    alt={film.titre}
                    className="w-full h-80 object-cover rounded-lg mb-6"
                />
                <h1 className="text-3xl font-bold mb-4">{film.titre}</h1>
                <p className="text-gray-400 mb-4">{film.description}</p>
                <p className="text-gray-300">
                    <strong>Durée :</strong> {film.duree} minutes
                </p>
                <p className="text-gray-300">
                    <strong>Avis :</strong> {film.avis} / 5
                </p>
                <p className="text-gray-300">
                    <strong>Date de sortie :</strong> {new Date(film.dateSortie).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
