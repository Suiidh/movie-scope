"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateQuizPage = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: "" }]);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleQuestionChange = (index: number, field: "question" | "answer", value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }]);
  const removeQuestion = (index: number) => setQuestions(questions.filter((_, i) => i !== index));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const saveQuiz = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const quizData = { title: quizTitle, description: quizDescription, questions };

    try {
      const response = await fetch("/api/quizz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) throw new Error("Erreur lors de l'enregistrement du quiz");

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const imageResponse = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });

        if (!imageResponse.ok) throw new Error("Erreur lors de l'upload de l'image");
      }

      router.push("/quiz?created=true");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () =>
    quizTitle && quizDescription && questions.every(q => q.question && q.answer);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Créer un Quiz</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium text-black">Titre du Quiz</label>
        <input
          type="text"
          className="w-full mt-2 p-3 border rounded"
          placeholder="Entrez le titre du quiz"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-black">Description</label>
        <textarea
          className="w-full mt-2 p-3 border rounded"
          placeholder="Entrez une description"
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-black">Image du Quiz</label>
        <input
          type="file"
          className="w-full mt-2"
          onChange={handleImageUpload}
        />
      </div>

      {questions.map((q, index) => (
        <div key={index} className="mb-6">
          <label className="block text-lg font-medium text-black">Question {index + 1}</label>
          <input
            type="text"
            className="w-full mt-2 p-3 border rounded"
            placeholder="Entrez la question"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
          />

          <label className="block mt-4 text-lg font-medium text-black">Options</label>
          {q.options.map((option, i) => (
            <input
              key={i}
              type="text"
              className="w-full mt-2 p-2 border rounded"
              placeholder={`Option ${i + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, i, e.target.value)}
            />
          ))}

          <label className="block mt-4 text-lg font-medium text-black">Réponse Correcte</label>
          <input
            type="text"
            className="w-full mt-2 p-3 border rounded"
            placeholder="Entrez la réponse correcte"
            value={q.answer}
            onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
          />

          <button
            onClick={() => removeQuestion(index)}
            className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="mb-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Ajouter une question
      </button>

      <button
        onClick={saveQuiz}
        disabled={!isFormValid() || isLoading}
        className={`px-6 py-3 text-white rounded ${isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
      >
        {isLoading ? "Enregistrement..." : "Sauvegarder le Quiz"}
      </button>
    </div>
  );
};

export default CreateQuizPage;
