import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";  // Utilisez getServerSession au lieu de getSession
import { authOptions } from "../api/auth/[...nextauth]"; // Importez authOptions pour obtenir la configuration de NextAuth

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Récupérer la session côté serveur
    const session = await getServerSession(authOptions);  // Utilisez authOptions ici

    if (!session) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), { status: 401 });
    }

    let quizData;

    if (session.user.role === 'admin') {
      quizData = await prisma.quiz.findMany({
        include: {
          questions: {
            include: {
              options: true, // Inclure les options des questions
            },
          },
        },
        orderBy: { id: "desc" },
      });
    } else {
      quizData = await prisma.quiz.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          image: true,
        },
        orderBy: { id: "desc" },
      });
    }

    return new Response(JSON.stringify(quizData), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des quiz :", error);
    return new Response(JSON.stringify({ error: "Erreur lors de la récupération des quiz" }), { status: 500 });
  }
}
