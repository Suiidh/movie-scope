"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";  // Corrigez le chemin si nécessaire

export default function QuizPage() {
  const [quizz, setQuizz] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuizz = async () => {
      try {
        const response = await fetch("/api/quizz");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des quiz.");
        }
        const data = await response.json();
        setQuizz(data); // Mettre à jour l'état avec les données reçues
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
  
    fetchQuizz();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen px-4 sm:px-8 pb-8">
        <h1 className="text-4xl font-bold text-gray-800 mt-8">Quiz</h1>
        <p className="text-lg text-gray-600 text-center mt-4">
          Testez vos connaissances cinématographiques
        </p>

        {/* Bouton pour créer un quiz */}
        <div className="mt-8 mb-6">
          <Link href="/createquiz">
            <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg">
              Créer un Quiz
            </button>
          </Link>
        </div>

        {/* Liste des quiz existants */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizz.map((quiz) => (
            <div key={quiz.id} className="group relative">
              <Link href={`/quiz/${quiz.id}`} passHref>
                <img
                  src={quiz.imageUrl || "/placeholder.jpg"}  // Utilisation de l'image depuis l'URL
                  alt={quiz.title}
                  className="w-full h-64 object-cover transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-gray-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white text-lg font-bold">{quiz.title}</h3>
                  <p className="text-white">{quiz.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
