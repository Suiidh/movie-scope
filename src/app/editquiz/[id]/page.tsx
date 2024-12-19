"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaTimes } from "react-icons/fa"; // Pour la croix de fermeture

export default function EditQuizPage() {
  const router = useRouter();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);

  // Récupérer les données existantes du quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizz/${params.id}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération du quiz.");
        const data = await response.json();

        setTitle(data.title);
        setDescription(data.description);
        setQuestions(
            data.questions.map((q: any) => ({
              id: q.id,
              question: q.question,
              answer: q.answer,
              options: q.options.map((o: any) => o.value),
            }))
        );
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération du quiz.");
      }
    };

    fetchQuiz();
  }, [params.id]);

  // Ajouter une nouvelle question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: null, question: "", answer: "", options: ["", "", "", ""] },
    ]);
  };

  // Gérer la sauvegarde
  const handleSave = async () => {
    setLoading(true);
    setError(null);

    const body = {
      title,
      description,
      questions: questions.map((q) => ({
        id: q.id, // null si nouvelle question
        question: q.question,
        answer: q.answer,
        options: q.options,
      })),
    };

    try {
      const response = await fetch(`/api/quizz/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour du quiz.");
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour du quiz.");
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    router.push("/quiz?success=true");
  };

  const openDeleteModal = (index: number) => {
    setQuestionToDelete(index);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setQuestionToDelete(null);
  };

  const handleDeleteQuestion = () => {
    if (questionToDelete !== null) {
      setQuestions(questions.filter((_, i) => i !== questionToDelete));
    }
    closeDeleteModal();
  };

  return (
      <div className="max-w-4xl mx-auto p-8 bg-black text-white shadow-lg rounded">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Modifier le Quiz</h1>

        {/* Bouton Retour */}
        <button
            onClick={() => router.back()}
            className="mb-6 text-white bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded flex items-center"
        >
          <FaTimes className="mr-2" size={20} /> Retour
        </button>

        {/* Message d'erreur */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-white">Titre du Quiz</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
                placeholder="Entrez le titre du quiz"
                required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-white">Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
                placeholder="Entrez la description du quiz"
                required
            ></textarea>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4 text-white">Questions</h2>
            {questions.map((q, index) => (
                <div key={index} className="mb-4 p-4 border rounded bg-gray-800">
                  <label className="block text-md font-medium text-white">Question</label>
                  <input
                      type="text"
                      value={q.question}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].question = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                      className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
                      placeholder="Entrez la question"
                      required
                  />

                  <div className="mt-2">
                    <label className="block text-md font-medium text-white">Réponse Correcte</label>
                    <input
                        type="text"
                        value={q.answer}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].answer = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                        className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
                        placeholder="Entrez la réponse correcte"
                        required
                    />
                  </div>

                  <div className="mt-2">
                    <label className="block text-md font-medium text-white">Options</label>
                    {q.options.map((option: string, optIndex: number) => (
                        <input
                            key={optIndex}
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const updatedQuestions = [...questions];
                              updatedQuestions[index].options[optIndex] = e.target.value;
                              setQuestions(updatedQuestions);
                            }}
                            className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
                            placeholder={`Option ${optIndex + 1}`}
                            required
                        />
                    ))}
                  </div>

                  <button
                      type="button"
                      onClick={() => openDeleteModal(index)}
                      className="mt-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Supprimer cette question
                  </button>
                </div>
            ))}
          </div>

          <div className="mb-4 flex justify-center">
            <button
                type="button"
                onClick={addQuestion}
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Ajouter une question
            </button>
          </div>

          <div className="mb-4">
            <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Sauvegarde en cours..." : "Sauvegarder les modifications"}
            </button>
          </div>
        </form>

        {/* Modale de confirmation de succès */}
        {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-green-500 p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-lg font-bold text-white mb-4">Quiz modifié avec succès !</h3>
                <button
                    onClick={closeSuccessModal}
                    className="text-white px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
                >
                  Fermer
                </button>
              </div>
            </div>
        )}

        {/* Modale de confirmation de suppression */}
        {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-lg font-bold text-black mb-4">Confirmez la suppression de la question ?</h3>
                <div className="flex justify-around">
                  <button
                      onClick={handleDeleteQuestion}
                      className="text-white px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                  <button
                      onClick={closeDeleteModal}
                      className="text-black px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}
