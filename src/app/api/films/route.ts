import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';  // Chemin relatif vers Prisma

export async function GET() {
  try {
    const films = await prisma.film.findMany();
    return NextResponse.json(films);
  } catch (error) {
    console.error("Erreur lors de la récupération des films:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des films" });
  }
}
