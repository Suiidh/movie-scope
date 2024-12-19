import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { filmId, content } = body;

        // Validation des données
        if (!filmId || !content) {
            return NextResponse.json(
                { error: 'filmId et content sont requis' },
                { status: 400 }
            );
        }

        // Récupération du token depuis les headers Authorization
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Token manquant ou invalide.' },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];

        // Vérification et décodage du token
        let decodedUser;
        try {
            decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
        } catch (error) {
            console.error('Erreur lors de la vérification du token :', error);
            return NextResponse.json(
                { error: 'Token invalide ou expiré.' },
                { status: 401 }
            );
        }

        // @ts-ignore
        const userId = decodedUser.id; // L'ID de l'utilisateur récupéré depuis le token

        // Création du commentaire dans la base de données
        const comment = await prisma.comment.create({
            data: {
                content,
                filmId,
                userId,
            },
        });

        return NextResponse.json(comment, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}
