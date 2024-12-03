"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash, FaEdit, FaPlay } from "react-icons/fa"; // Import des icônes
import Layout from "../components/Layout";

export default function QuizPage() {
  const [quizz, setQuizz] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fonction pour récupérer les quiz
  useEffect(() => {
    const fetchQuizz = async () => {
      try {
        const response = await fetch("/api/quizz");
        if (!response.ok) throw new Error("Erreur lors de la récupération des quiz.");
        const data = await response.json();
        setQuizz(data);
      } catch (error) {
        console.error("Erreur :", error);
        setError("Erreur lors de la récupération des quiz.");
      }
    };

    fetchQuizz();
  }, []);

  // Fonction pour supprimer un quiz
  const deleteQuiz = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce quiz ?")) return;

    setLoading(true); // On active le message de chargement
    setError(null); // On réinitialise l'erreur en cas de nouvelle tentative de suppression

    try {
      console.log(`Deleting quiz with ID: ${id}`);
      const response = await fetch(`/api/quizz/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erreur lors de la suppression du quiz.");

      setQuizz(quizz.filter((quiz) => quiz.id !== id)); // On met à jour la liste des quiz après suppression
    } catch (error) {
      console.error("Erreur :", error);
      setError("Erreur lors de la suppression du quiz.");
    } finally {
      setLoading(false); // Désactivation du message de chargement
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen px-4 py-8 sm:px-12 bg-black">
        <div className="w-full flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-white">Liste des Quiz</h1>
          <Link href="/createquiz">
            <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Ajouter un Quiz
            </button>
          </Link>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {quizz.length === 0 ? (
          <p className="text-gray-500">Aucun quiz disponible.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
            {quizz.map((quiz) => (
              <div
                key={quiz.id}
                className="h-56 w-56 border p-4 rounded shadow-lg flex flex-col justify-between bg-white hover:shadow-xl transition-shadow"
              >
                <h2 className="text-lg font-bold text-black">{quiz.title}</h2>
                <p className="text-sm text-gray-700">{quiz.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <Link href={`/quiz/${quiz.id}`}>
                    <button className="text-green-500 hover:text-green-700">
                      <FaPlay size={20} />
                    </button>
                  </Link>
                  <Link href={`/editquiz/${quiz.id}`}>
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit size={20} />
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteQuiz(quiz.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && <div className="mt-4 text-white">Suppression en cours...</div>}
      </div>
    </Layout>
  );
}
