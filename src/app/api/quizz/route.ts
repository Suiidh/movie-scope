import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth"; // Utilisez `getServerSession` au lieu de `getSession`
import { authOptions } from "../auth/[...nextauth]"; // Assurez-vous d'importer vos options de NextAuth

const prisma = new PrismaClient();

// Méthode GET pour récupérer les quiz
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions); // Utilisez `getServerSession` avec les options
    if (!session) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), { status: 401 });
    }

    // Si l'utilisateur est admin, renvoie tous les quiz avec leurs questions et options
    if (session.user.role === 'admin') {
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
    }

    // Si l'utilisateur n'est pas admin, il peut seulement voir les quiz sans les options de modification
    const quizData = await prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
      },
      orderBy: { id: "desc" },
    });

    return new Response(JSON.stringify(quizData), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des quiz :", error);
    return new Response(JSON.stringify({ error: "Erreur lors de la récupération des quiz" }), { status: 500 });
  }
}

// Méthode POST pour ajouter un quiz (seulement pour les admins)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions); // Utilisez `getServerSession`
    if (!session) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), { status: 401 });
    }

    if (session.user.role !== 'admin') {
      return new Response(JSON.stringify({ error: "Accès interdit, admin requis" }), { status: 403 });
    }

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

// Méthode DELETE pour supprimer un quiz (seulement pour les admins)
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions); // Utilisez `getServerSession`
    if (!session) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), { status: 401 });
    }

    if (session.user.role !== 'admin') {
      return new Response(JSON.stringify({ error: "Accès interdit, admin requis" }), { status: 403 });
    }

    const url = new URL(req.url);
    const id = parseInt(url.pathname.split("/").pop() || "");

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "ID invalide" }), { status: 400 });
    }

    const deletedQuiz = await prisma.quiz.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedQuiz), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression du quiz :", error);
    return new Response(JSON.stringify({ error: "Erreur lors de la suppression du quiz" }), { status: 500 });
  }
}
