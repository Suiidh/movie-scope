"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Importez useRouter
import Layout from "../../components/Layout";

export default function QuizDetailPage() {
  const { id } = useParams();
  const router = useRouter();  // Utilisez le hook useRouter pour la navigation
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [log, setLog] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizz/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du quiz.");
        }
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quiz) {
    return <div>Chargement...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerClick = (option: string) => {
    setSelectedOption(option);

    const isCorrect = option === currentQuestion.answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setLog([
      ...log,
      {
        question: currentQuestion.question,
        selected: option,
        correct: isCorrect,
        correctAnswer: currentQuestion.answer,
      },
    ]);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleBackToQuizList = () => {
    router.push("/quiz");  // Redirige vers la page de liste des quiz
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-screen px-4 py-8 sm:px-12">
        {/* Conteneur principal */}
        <div className="w-full max-w-6xl flex flex-col sm:flex-row gap-6">
          {/* Section Quiz */}
          <div className="flex-1 bg-gray-900 p-4 sm:p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {quiz.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mb-6">
              {quiz.description}
            </p>

            {quizFinished ? (
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">
                  Quiz terminé !
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mt-2">
                  Votre score final est : {score} sur {quiz.questions.length}
                </p>
                {/* Bouton pour revenir à la liste des quiz */}
                <button
                  onClick={handleBackToQuizList}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm sm:text-base font-semibold rounded-md hover:bg-blue-600"
                >
                  Retour à la liste des quiz
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
                  {currentQuestion.question}
                </h2>
                <div className="space-y-2">
                  {currentQuestion.options.map((option: any, index: number) => (
                    <button
                      key={index}
                      className={`w-full px-3 py-2 text-sm sm:text-base border rounded-md ${
                        selectedOption === option.value
                          ? option.value === currentQuestion.answer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-blue-800"
                      } focus:outline-none`}
                      onClick={() => handleAnswerClick(option.value)}
                      disabled={!!selectedOption}
                    >
                      {option.value}
                    </button>
                  ))}
                </div>

                {selectedOption && (
                  <div className="mt-4 flex justify-between items-center">
                    <p
                      className={`text-sm sm:text-base font-medium ${
                        selectedOption === currentQuestion.answer
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {selectedOption === currentQuestion.answer
                        ? "Bonne réponse !"
                        : `Incorrect. La bonne réponse : ${currentQuestion.answer}`}
                    </p>
                    <button
                      className="px-3 py-2 bg-blue-500 text-white text-sm sm:text-base font-semibold rounded-md hover:bg-blue-600"
                      onClick={handleNextQuestion}
                    >
                      Question suivante
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Section Historique */}
          <div className="w-full sm:w-1/3 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
              Historique
            </h2>
            <ul className="space-y-3">
              {log.map((entry, index) => (
                <li
                  key={index}
                  className="border rounded-md p-3 bg-gray-900 shadow-sm"
                >
                  <p className="text-sm sm:text-base font-medium text-gray-300">
                    Question {index + 1} : {entry.question}
                  </p>
                  <p className="text-sm text-gray-300">
                    Votre réponse :{" "}
                    <span
                      className={`font-semibold ${
                        entry.correct ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {entry.selected}
                    </span>
                  </p>
                  {!entry.correct && (
                    <p className="text-sm text-gray-300">
                      Bonne réponse :{" "}
                      <span className="font-semibold text-green-400">
                        {entry.correctAnswer}
                      </span>
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm sm:text-base font-semibold text-black bg-white p-2 rounded">
              Score actuel : {score} / {quiz.questions.length}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
