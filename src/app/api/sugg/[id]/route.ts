import { NextResponse } from 'next/server';
import {prisma}  from '../../../lib/prisma'; // Assurez-vous que le chemin vers prisma est correct

// Supprimer une suggestion spécifique en fonction de l'ID dans l'URL
export async function DELETE(req: Request) {
    // Extraire l'ID de l'URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // On récupère le dernier segment de l'URL comme ID

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ message: 'ID invalide' }, { status: 400 });
    }

    try {
        // Supprimer la suggestion avec l'ID spécifié
        await prisma.suggestion.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: 'Suggestion supprimée' });
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la suppression de la suggestion' }, { status: 500 });
    }
}
