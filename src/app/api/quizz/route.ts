import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Méthode GET pour récupérer les quiz
export async function GET(req: Request) {
  try {
    const quizData = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true, // Inclure les options des questions
          },
        },
      },
      orderBy: { id: "desc" }, // Trier par ID décroissant
    });

    return new Response(JSON.stringify(quizData), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des quiz :", error);
    return new Response(JSON.stringify({ error: "Erreur lors de la récupération des quiz" }), { status: 500 });
  }
}

// Méthode POST pour ajouter un quiz
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, questions } = body;

    const createdQuiz = await prisma.quiz.create({
      data: {
        title,
        description,
        questions: {
          create: questions.map((q: any) => ({
            question: q.question,
            answer: q.answer,
            options: {
              create: q.options.map((option: string) => ({ value: option })),
            },
          })),
        },
      },
    });

    return new Response(JSON.stringify(createdQuiz), { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du quiz :", error);
    return new Response(JSON.stringify({ error: "Erreur lors de la création du quiz" }), { status: 500 });
  }
}
