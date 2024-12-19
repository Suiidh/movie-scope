import { prisma } from '../../lib/prisma';
import { notFound } from 'next/navigation';
import FilmDetailsClient from './FilmDetailsClient';

export default async function FilmDetailsServer({ params }: { params: { id: string } }) {
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

    return <FilmDetailsClient film={film} />;
}
