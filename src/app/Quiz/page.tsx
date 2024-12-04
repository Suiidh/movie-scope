"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash, FaEdit, FaPlay, FaTimes } from "react-icons/fa"; 
import Layout from "../components/Layout";
import { useRouter } from "next/navigation";  // Pour gérer la redirection

export default function QuizPage() {
  const [quizz, setQuizz] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Message de succès
  const [showSuccess, setShowSuccess] = useState<boolean>(false); // Pour afficher/masquer le message de succès
  const router = useRouter();

  useEffect(() => {
    const fetchQuizz = async () => {
      try {
        const response = await fetch("/api/quizz");
        if (!response.ok) throw new Error("Erreur lors de la récupération des quiz.");
        const data = await response.json();
        setQuizz(data);

        // Vérification de la query "success" dans l'URL pour afficher le message de succès
        const success = new URLSearchParams(window.location.search).get('success');
        const action = new URLSearchParams(window.location.search).get('action'); // Récupérer l'action

        if (success === 'true') {
          // Déterminer si c'est une création ou une modification
          if (action === 'create') {
            setSuccessMessage("Quiz créé avec succès !");
          } else if (action === 'edit') {
            setSuccessMessage("Quiz modifié avec succès !");
          }
          setShowSuccess(true); // Afficher le message de succès
        }
      } catch (error) {
        console.error("Erreur :", error);
        setError("Erreur lors de la récupération des quiz.");
      }
    };

    fetchQuizz();
  }, []);

  // Fonction pour gérer la suppression d'un quiz
  const deleteQuiz = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce quiz ?")) return;

    setLoading(true); 
    setError(null);

    try {
      const response = await fetch(`/api/quizz/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erreur lors de la suppression du quiz.");

      // Met à jour la liste des quiz après suppression
      setQuizz(quizz.filter((quiz) => quiz.id !== id));

      setSuccessMessage("Quiz supprimé avec succès !");
      setShowSuccess(true); // Afficher le message de succès
    } catch (error) {
      console.error("Erreur :", error);
      setError("Erreur lors de la suppression du quiz.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer la fermeture du message de succès
  const closeSuccessMessage = () => {
    setShowSuccess(false); // Fermer le message de succès
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

        {/* Affichage du message de succès */}
        {showSuccess && successMessage && (
          <div className="flex items-center justify-between bg-green-500 text-white p-4 rounded mb-4">
            <span>{successMessage}</span>
            <button onClick={closeSuccessMessage} className="text-white">
              <FaTimes size={20} />
            </button>
          </div>
        )}

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
                {/* Affichage de l'image si elle existe */}
                {quiz.image && (
                  <img
                    src={quiz.image}
                    alt={quiz.title}
                    className="h-32 w-full object-cover rounded mt-2"
                  />
                )}
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
