import { prisma } from '../../lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddCommentForm from '../../components/AddCommentForm';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { RiArrowGoBackFill } from "react-icons/ri";

export default async function FilmDetails({ params }: { params: { id: string } }) {
    const filmId = parseInt(params.id, 10);

    if (isNaN(filmId)) {
        notFound();
    }

    const film = await prisma.film.findUnique({
        where: { id: filmId },
        include: {
            comments: {
                include: {
                    user: true, // Inclut les informations utilisateur pour chaque commentaire
                },
            },
        },
    });

    if (!film) {
        notFound();
    }

    const imageUrl = film.image.startsWith('/') ? film.image : `/${film.image}`;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navbar */}
            <Navbar />

            {/* Bouton retour */}
            <div className="p-4 flex items-center">
                <Link href="/" className="text-blue-500 hover:underline flex items-center">
                    <RiArrowGoBackFill className="mr-2 text-2xl" /> Retour à la liste des films
                </Link>
            </div>

            <div className="flex flex-col justify-center items-center p-8">
                <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                    <Image
                        src={imageUrl}
                        alt={film.titre}
                        width={400}
                        height={160}
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
                        <strong>Date de sortie :</strong> {new Date(film.dateSortie).toLocaleDateString('fr-FR')}
                    </p>
                </div>

                {/* Section des commentaires */}
                <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg mt-8 p-6">
                    <h2 className="text-2xl font-bold mb-4">Commentaires</h2>

                    {film.comments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-700 pb-4 mb-4">
                            <p className="text-gray-400 text-sm">
                                <strong>{comment.user.nomUsers} :</strong> {comment.content}
                            </p>
                            <p className="text-gray-500 text-xs">
                                Posté le {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    ))}

                    {/* Formulaire d'ajout de commentaire */}
                    <AddCommentForm filmId={filmId} />
                </div>
            </div>
        </div>
    );
}
