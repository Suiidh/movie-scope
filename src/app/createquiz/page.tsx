// CreateQuizPage.tsx
'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";  // Utilisé pour rediriger après soumission

const CreateQuizPage = () => {
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [quizTitle, setQuizTitle] = useState("");  // Nouveau champ pour le titre du quiz
  const [quizDescription, setQuizDescription] = useState("");  // Nouveau champ pour la description du quiz
  const [image, setImage] = useState<File | null>(null); // État pour l'image
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fonction pour gérer les changements dans les champs de la question
  const handleQuestionChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Fonction pour gérer les changements dans les options
  const handleOptionChange = (index: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Fonction pour ajouter une nouvelle question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  // Fonction pour supprimer une question
  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  // Fonction pour gérer le changement d'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Fonction pour envoyer le quiz au serveur
  const handleSaveQuiz = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const quizData = {
      title: quizTitle,
      description: quizDescription,
      questions,
    };

    try {
      // 1. Envoi des données JSON séparées
      const response = await fetch("/api/quizz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du quiz.");
      }

      const data = await response.json();
      console.log("Quiz créé avec succès", data);

      // 2. Envoi de l'image si elle existe
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const imageResponse = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });

        if (!imageResponse.ok) {
          throw new Error("Erreur lors de l'upload de l'image.");
        }

        console.log("Image uploadée avec succès.");
      }

      // Rediriger vers la page des quiz après la soumission
      router.push("/quiz");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Créer un Quiz</h1>

      {/* Titre du quiz */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Titre du Quiz</label>
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="Entrez le titre du quiz"
          className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Description du quiz */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Description du Quiz</label>
        <textarea
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          placeholder="Entrez une description pour votre quiz"
          className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Champ d'upload de l'image */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Image du Quiz</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Liste des questions */}
      {questions.map((q, index) => (
        <div key={index} className="mb-6">
          <div className="mb-4">
            <label className="block text-lg font-medium">Question {index + 1}</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
              placeholder="Entrez votre question"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Options */}
          <div className="mb-4">
            <label className="block text-lg font-medium">Options</label>
            {q.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                placeholder={`Option ${optionIndex + 1}`}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md mb-2"
              />
            ))}
          </div>

          {/* Réponse correcte */}
          <div className="mb-4">
            <label className="block text-lg font-medium">Réponse correcte</label>
            <input
              type="text"
              value={q.answer}
              onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
              placeholder="Entrez la réponse correcte"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Bouton pour supprimer la question */}
          <button
            type="button"
            onClick={() => handleRemoveQuestion(index)}
            className="px-4 py-2 text-white bg-red-500 rounded-md mt-4 hover:bg-red-600"
          >
            Supprimer la question
          </button>
        </div>
      ))}

      {/* Bouton pour ajouter une nouvelle question */}
      <button
        type="button"
        onClick={handleAddQuestion}
        className="px-4 py-2 text-white bg-blue-500 rounded-md mt-4 hover:bg-blue-600"
      >
        Ajouter une question
      </button>

      {/* Bouton pour sauvegarder le quiz */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSaveQuiz}
          disabled={isLoading || !quizTitle || !quizDescription || questions.some(q => !q.question || !q.answer)}
          className={`px-6 py-3 text-white rounded-lg ${isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
        >
          {isLoading ? "Enregistrement..." : "Sauvegarder le quiz"}
        </button>
      </div>
    </div>
  );
};

export default CreateQuizPage;
