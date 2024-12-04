import { NextResponse } from 'next/server';
import prisma  from '../../lib/prisma'; // Assurez-vous que prisma est correctement importé

// Récupérer toutes les suggestions
export async function GET() {
    try {
        const suggestions = await prisma.suggestion.findMany();
        return NextResponse.json(suggestions);
    } catch (error) {
        return NextResponse.error();
    }
}

// Ajouter une nouvelle suggestion
export async function POST(req: Request) {
    const { text } = await req.json();
    try {
        const newSuggestion = await prisma.suggestion.create({
            data: { text },
        });
        return NextResponse.json(newSuggestion, { status: 201 });
    } catch (error) {
        return NextResponse.error();
    }
}

// Supprimer une suggestion en fonction de son ID
export async function DELETE(req: Request) {
    // Extraire l'ID de la route
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Obtenez le dernier segment de l'URL

    try {
        if (!id) {
            return NextResponse.error();
        }
        await prisma.suggestion.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: 'Suggestion supprimée' });
    } catch (error) {
        return NextResponse.error();
    }
}
