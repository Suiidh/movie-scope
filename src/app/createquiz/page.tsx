'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa"; // Pour la croix de fermeture

const CreateQuizPage = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: "" }]);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Message de succès
  const [showSuccess, setShowSuccess] = useState<boolean>(false); // Pour afficher/masquer le message de succès
  const router = useRouter();

  // Ajout du message de succès après création du quiz
  const showSuccessMessage = () => {
    setSuccessMessage("Quiz ajouté avec succès !");
    setShowSuccess(true);
  };

  // Enregistrement du quiz
  const saveQuiz = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const quizData = { title: quizTitle, description: quizDescription, questions };

    try {
      // Envoi des données du quiz
      const response = await fetch("/api/quizz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      if (!response.ok) throw new Error("Erreur lors de l'enregistrement du quiz");

      showSuccessMessage(); // Afficher le message de succès

      // Envoi de l'image si présente
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const imageResponse = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });
        if (!imageResponse.ok) throw new Error("Erreur lors de l'upload de l'image");
      }

      router.push("/quiz");
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false); // Fermer le message de succès
  };

  const handleQuestionChange = (index: number, field: "question" | "answer" | "options", value: string | string[]) => {
    const updatedQuestions = [...questions];
    if (field === "options") {
      updatedQuestions[index].options = value as string[];
    } else {
      updatedQuestions[index][field] = value as string;
    }
    setQuestions(updatedQuestions);
  };

  // Ajout d'une nouvelle question
  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }]);
  };

  // Suppression d'une question
  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
      <div className="max-w-4xl mx-auto p-8 bg-black text-white shadow-lg rounded">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Créer un Quiz</h1>

        {/* Bouton Retour */}
        <button
            onClick={() => router.back()}
            className="mb-6 text-white bg-gray-700 hover:bg-gray-800 py-2 px-4 rounded flex items-center"
        >
          <FaTimes className="mr-2" size={20} /> Retour
        </button>

        {/* Message de succès */}
        {showSuccess && successMessage && (
            <div className="flex items-center justify-between bg-green-600 text-white p-4 rounded mb-4">
              <span>{successMessage}</span>
              <button onClick={closeSuccessMessage} className="text-white">
                <FaTimes size={20} />
              </button>
            </div>
        )}

        {/* Formulaire de création de quiz */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-white">Titre du Quiz</label>
            <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
                placeholder="Entrez le titre du quiz"
                required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-white">Description</label>
            <textarea
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
                placeholder="Entrez la description du quiz"
                required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-white">Questions</label>
            {questions.map((q, index) => (
                <div key={index} className="mb-4 border p-4 rounded bg-gray-800">
                  <label className="block text-md font-medium text-white">Question</label>
                  <input
                      type="text"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                      className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
                      placeholder="Entrez la question"
                      required
                  />

                  <div className="mt-2">
                    <label className="block text-md font-medium text-white">Options</label>
                    {q.options.map((option, optIndex) => (
                        <input
                            key={optIndex}
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const updatedOptions = [...q.options];
                              updatedOptions[optIndex] = e.target.value;
                              handleQuestionChange(index, "options", updatedOptions);
                            }}
                            className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
                            placeholder={`Option ${optIndex + 1}`}
                            required
                        />
                    ))}
                  </div>

                  <div className="mt-2">
                    <label className="block text-md font-medium text-white">Réponse Correcte</label>
                    <input
                        type="text"
                        value={q.answer}
                        onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
                        placeholder="Entrez la réponse correcte"
                        required
                    />
                  </div>

                  <button
                      type="button"
                      onClick={() => removeQuestion(index)}
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
            <label className="block text-lg font-medium text-white">Image du Quiz (facultatif)</label>
            <input
                type="file"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                className="w-full p-3 mt-2 border border-gray-300 rounded text-black"
            />
          </div>

          <div className="mb-4 flex justify-center">
            <button
                type="submit"
                onClick={saveQuiz}
                disabled={isLoading}
                className="px-6 py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? "Enregistrement..." : "Créer le Quiz"}
            </button>
          </div>
        </form>
      </div>
  );
};

export default CreateQuizPage;
