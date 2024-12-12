import { prisma } from '../../lib/prisma'; // Assure-toi que Prisma est bien configuré
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function FilmDetails({ params }: { params: { id: string } }) {
    const filmId = parseInt(params.id, 10);

    if (isNaN(filmId)) {
        notFound();
    }

    const film = await prisma.film.findUnique({
        where: { id: filmId },
    });

    if (!film) {
        notFound();
    }

    // Forcer un chemin absolu
    const imageUrl = film.image.startsWith('/') ? film.image : `/${film.image}`;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-8">
            <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <Image
                    src={imageUrl}
                    alt={film.titre}
                    width={400} // Réduction de la largeur
                    height={160} // Réduction de la hauteur
                    className="rounded-lg mb-6 mx-auto"
                />
                <h1 className="text-3xl font-bold mb-4">{film.titre}</h1>
                <p className="text-gray-400 mb-4">{film.description}</p>
                <p className="text-gray-300">
                    <strong>Durée :</strong> {film.duree} heures
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
