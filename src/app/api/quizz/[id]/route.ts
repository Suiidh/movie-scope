import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Récupérer un quiz spécifique par son ID
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();  // Récupérer l'ID à partir de l'URL

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
      include: {
        questions: {
          include: {
            options: true,  // Inclure les options pour chaque question
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
