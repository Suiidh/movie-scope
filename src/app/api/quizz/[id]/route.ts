import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react"; // On va récupérer la session pour vérifier le rôle

const prisma = new PrismaClient();

// Gérer la requête GET pour récupérer un quiz spécifique
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz non trouvé." }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Erreur lors de la récupération du quiz:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération du quiz." }, { status: 500 });
  }
}

// Gérer la mise à jour d'un quiz
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession({ req }); // Vérifie la session
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const { id } = params;
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: 'Le corps de la requête est vide' }, { status: 400 });
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        description: body.description,
        // Gestion des questions et options
      },
    });

    return NextResponse.json(updatedQuiz, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du quiz:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour du quiz." }, { status: 500 });
  }
}

// Supprimer un quiz
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession({ req });
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const { id } = params;
  try {
    const deletedQuiz = await prisma.quiz.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedQuiz, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression du quiz:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression du quiz." }, { status: 500 });
  }
}
