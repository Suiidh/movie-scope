import { PrismaClient } from "@prisma/client";  // Prisma pour l'accès à la base de données

const prisma = new PrismaClient(); // Instance de Prisma

// Méthode GET pour récupérer les quiz depuis la base de données
export async function GET() {
  try {
    const quizData = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true,  // Inclure les options des questions
          },
        },
      },
    });

    return new Response(JSON.stringify(quizData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur lors de la récupération des quiz" }), { status: 500 });
  }
}
