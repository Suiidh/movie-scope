"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash, FaEdit, FaPlay, FaTimes } from "react-icons/fa";
import Layout from "../components/Layout";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const [quizz, setQuizz] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // Modale de suppression
  const [quizToDelete, setQuizToDelete] = useState<any | null>(null); // Quiz à supprimer
  const [showEditModal, setShowEditModal] = useState<boolean>(false); // Modale de modification
  const [quizToEdit, setQuizToEdit] = useState<any | null>(null); // Quiz à modifier
  const [currentPage, setCurrentPage] = useState(1);
  const [quizzPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizz = async () => {
      try {
        const response = await fetch("/api/quizz");
        if (!response.ok) throw new Error("Erreur lors de la récupération des quiz.");
        const data = await response.json();
        setQuizz(data);

        const success = new URLSearchParams(window.location.search).get("success");
        const action = new URLSearchParams(window.location.search).get("action");

        if (success === "true") {
          if (action === "create") {
            setSuccessMessage("Quiz créé avec succès !");
          } else if (action === "edit") {
            setSuccessMessage("Quiz modifié avec succès !");
          }
          setShowSuccess(true);
        }
      } catch (error) {
        console.error("Erreur :", error);
        setError("Erreur lors de la récupération des quiz.");
      }
    };

    fetchQuizz();
  }, []);

  const openDeleteModal = (quiz: any) => {
    setQuizToDelete(quiz);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setQuizToDelete(null);
  };

  const openEditModal = (quiz: any) => {
    setQuizToEdit(quiz);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setQuizToEdit(null);
  };

  const handleDeleteQuiz = async () => {
    if (!quizToDelete) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/quizz/${quizToDelete.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erreur lors de la suppression du quiz.");

      setQuizz(quizz.filter((quiz) => quiz.id !== quizToDelete.id));
      setSuccessMessage("Quiz supprimé avec succès !");
      setShowSuccess(true);
      closeDeleteModal();
    } catch (error) {
      console.error("Erreur :", error);
      setError("Erreur lors de la suppression du quiz.");
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
  };

  // Gestion de la pagination
  const quizzPerPage = 5; // Nombre de quiz par page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastQuiz = currentPage * quizzPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzPerPage;
  const currentQuizzes = quizz.slice(indexOfFirstQuiz, indexOfLastQuiz);
  const totalPages = Math.ceil(quizz.length / quizzPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
      <Layout>
        <div className="flex flex-col items-center min-h-screen px-4 py-8 sm:px-12 bg-black">
          <div className="w-full flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold text-white">Liste des Quiz</h1>
            <Link href="/createquiz">
              <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-transform hover:scale-105">
                Ajouter un Quiz
              </button>
            </Link>
          </div>

          {showSuccess && successMessage && (
              <div
                  className="flex items-center justify-between bg-red-600 text-white p-4 rounded mb-4 animate-fade-in"
              >
                <span>{successMessage}</span>
                <button onClick={closeSuccessMessage} className="text-white">
                  <FaTimes size={20} />
                </button>
              </div>
          )}

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {currentQuizzes.length === 0 ? (
              <p className="text-gray-500">Aucun quiz disponible.</p>
          ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                {currentQuizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="h-64 w-64 border p-4 rounded-lg shadow-lg bg-gray-800 hover:shadow-xl transition-shadow flex flex-col justify-between"
                    >
                      {quiz.image && (
                          <img
                              src={`/uploads/${quiz.image}`} // Utilisation d'un chemin local
                              alt="Quiz Image"
                              className="w-full h-32 object-cover rounded-t mb-4"
                          />
                      )}
                      <h2 className="text-lg font-bold text-white">{quiz.title}</h2>
                      <p className="text-sm text-gray-300 line-clamp-2">{quiz.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <Link href={`/quiz/${quiz.id}`}>
                          <button className="text-red-600 hover:text-red-700">
                            <FaPlay size={20} />
                          </button>
                        </Link>
                        <button
                            onClick={() => openEditModal(quiz)}
                            className="text-white hover:text-gray-400"
                        >
                          <FaEdit size={20}/>
                        </button>
                        <button
                            onClick={() => openDeleteModal(quiz)}
                            className="text-red-600 hover:text-red-700"
                        >
                          <FaTrash size={20}/>
                        </button>
                      </div>
                    </div>
                ))}
              </div>
          )}

          {loading && <div className="mt-4 text-white">Suppression en cours...</div>}

          {/* Modale de confirmation de suppression */}
          {showDeleteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-lg font-bold text-white mb-4">Confirmer la suppression</h3>
                  <p className="text-gray-400 mb-4">
                    Voulez-vous vraiment supprimer le quiz{" "}
                    <span className="font-bold">{quizToDelete?.title}</span> ?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                        onClick={handleDeleteQuiz}
                        className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                    <button
                        onClick={closeDeleteModal}
                        className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Modale de modification (si nécessaire) */}
          {showEditModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-lg font-bold text-white mb-4">Modifier le Quiz</h3>
                  <p className="text-gray-400 mb-4">
                    Modifier les informations du quiz{" "}
                    <span className="font-bold">{quizToEdit?.title}</span> ?
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link href={`/editquiz/${quizToEdit?.id}`}>
                      <button className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700">
                        Modifier
                      </button>
                    </Link>
                    <button
                        onClick={closeEditModal}
                        className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-md ${
                            currentPage === index + 1
                                ? "bg-red-600 text-white"
                                : "bg-gray-800 text-white hover:bg-red-600"
                        } transition-transform hover:scale-105`}
                    >
                      {index + 1}
                    </button>
                ))}
              </div>
          )}
        </div>
      </Layout>
  );
}
