import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Gérer la requête GET pour récupérer un quiz spécifique
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Pas besoin d'attendre ici, on peut directement accéder à `params`

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
      include: {
        questions: {
          include: {
            options: true, // Inclure les options pour chaque question
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
    return NextResponse.json(
        { error: "Erreur lors de la récupération du quiz." },
        { status: 500 }
    );
  }
}

// Gérer la mise à jour d'un quiz
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Pas besoin d'attendre ici, on peut directement accéder à `params`

  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ error: 'Le corps de la requête est vide' }, { status: 400 });
    }

    if (!body.title || !body.questions) {
      return NextResponse.json({ error: 'Données du quiz invalides' }, { status: 400 });
    }

    const updatedQuiz = await updateQuiz(id, body);

    return NextResponse.json(updatedQuiz, { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la mise à jour du quiz:", error);

    return NextResponse.json(
        { error: "Erreur lors de la mise à jour du quiz." },
        { status: 500 }
    );
  }
}

// Fonction pour mettre à jour un quiz dans la base de données avec Prisma
async function updateQuiz(id: string, data: any) {
  const updatedQuiz = await prisma.quiz.update({
    where: { id: Number(id) },
    data: {
      title: data.title,
      description: data.description,
      questions: {
        deleteMany: {}, // Supprimer d'abord toutes les anciennes questions
        create: data.questions.map((q: any) => ({
          question: q.question,
          answer: q.answer,
          options: {
            create: q.options.map((option: string) => ({
              value: option,
            })),
          },
        })),
      },
    },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });

  return updatedQuiz;
}

// Supprimer un quiz
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Pas besoin d'attendre ici, on peut directement accéder à `params`

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  try {
    const deletedQuiz = await prisma.quiz.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedQuiz, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression du quiz:", error);
    return NextResponse.json(
        { error: "Erreur lors de la suppression du quiz." },
        { status: 500 }
    );
  }
}
