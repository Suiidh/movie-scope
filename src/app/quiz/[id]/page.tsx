'use client';  // Indique que ce fichier est un composant client

import { useState } from 'react';
import { usePathname } from 'next/navigation';  // Utilisation de next/navigation
import { quizz } from '../../data/quizz';  // Assurez-vous que le chemin vers le fichier est correct
import Layout from '../../components/Layout';  // Assurez-vous que le chemin vers le Layout est correct

const QuizPage = () => {
    const pathname = usePathname();  // Pour obtenir le chemin de l'URL

    // Extraire l'ID de l'URL, par exemple, /quiz/harry-potter-1
    const id = pathname?.split('/').pop();  // Extraire l'ID de l'URL dynamique

    // Trouver le quiz correspondant à l'ID
    const quiz = quizz.find(q => q.id === id);

    if (!quiz) {
        return <div>Quiz introuvable</div>;
    }

    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [result, setResult] = useState<{ [key: string]: { isCorrect: boolean; message: string } }>({});
    const [score, setScore] = useState(0);  // Ajout du score

    // Fonction pour gérer la sélection de réponse
    const handleAnswerChange = (questionId: string, selectedAnswer: string) => {
        setAnswers({
            ...answers,
            [questionId]: selectedAnswer,
        });
    };

    // Fonction pour valider les réponses et calculer le score
    const validateAnswers = () => {
        const newResult: { [key: string]: { isCorrect: boolean; message: string } } = {};
        let correctAnswers = 0;

        quiz.questions.forEach(q => {
            const selectedAnswer = answers[q.id];
            const validation = quiz.validateAnswer(q.id, selectedAnswer);
            newResult[q.id] = validation;

            if (validation.isCorrect) {
                correctAnswers++;
            }
        });

        setResult(newResult);
        setScore(correctAnswers);  // Met à jour le score
    };

    return (
        <Layout>
            <div className="flex flex-col items-center min-h-screen">
                <h1 className="text-3xl font-bold text-gray-800 mt-8">{quiz.title}</h1>
                <p className="text-base text-gray-600 text-center mt-4">{quiz.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                    {quiz.questions.map((question, index) => (
                        <div key={index} className="mb-4">
                            {/* Question avec une taille de police réduite */}
                            <h3 className="text-lg font-semibold text-gray-800">{question.question}</h3>
                            <div className="mt-2">
                                {question.options.map((option, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`q${index}-option${idx}`}
                                            name={`q${index}`}
                                            value={option}
                                            checked={answers[question.id] === option}
                                            onChange={() => handleAnswerChange(question.id, option)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`q${index}-option${idx}`} className="text-sm text-gray-700">{option}</label>
                                    </div>
                                ))}
                            </div>

                            {/* Afficher le message de validation de la réponse */}
                            {result[question.id] && (
                                <p style={{ color: result[question.id].isCorrect ? 'green' : 'red' }} className="text-sm mt-1">
                                    {result[question.id].message}
                                </p>
                            )}

                            {/* Afficher la bonne réponse si la question est fausse */}
                            {!result[question.id]?.isCorrect && result[question.id]?.message === 'Mauvaise réponse. Essayez encore !' && (
                                <p className="text-xs text-red-500 mt-1">
                                    La bonne réponse est: {question.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Afficher le score */}
                {score > 0 && (
                    <div className="mt-8 text-xl font-semibold">
                        <p>Vous avez obtenu {score} sur {quiz.questions.length} bonnes réponses !</p>
                    </div>
                )}

                <button
                    onClick={validateAnswers}
                    className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg text-sm"
                >
                    Valider les réponses
                </button>
            </div>
        </Layout>
    );
};

export default QuizPage;
