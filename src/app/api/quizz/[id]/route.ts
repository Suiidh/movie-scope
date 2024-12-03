import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Récupérer un quiz spécifique par son ID
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Récupérer l'ID à partir de l'URL

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
    return NextResponse.json({ error: "Erreur lors de la récupération du quiz." }, { status: 500 });
  }
}

// Mettre à jour un quiz spécifique par son ID
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Récupérer l'ID à partir de l'URL
  const body = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  try {
    const updatedQuiz = await prisma.quiz.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        description: body.description,
        questions: {
          update: body.questions.map((question: any) => ({
            where: { id: question.id },
            data: {
              question: question.question,
              answer: question.answer,
              options: {
                set: question.options.map((option: any) => ({ value: option })), // Remplace les options
              },
            },
          })),
        },
      },
    });

    return NextResponse.json(updatedQuiz, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du quiz:", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour du quiz." }, { status: 500 });
  }
}

// Supprimer un quiz spécifique par son ID
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Récupérer l'ID à partir de l'URL

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
    return NextResponse.json({ error: "Erreur lors de la suppression du quiz." }, { status: 500 });
  }
}
