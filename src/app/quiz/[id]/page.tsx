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
    const [hasSubmitted, setHasSubmitted] = useState(false);  // État pour savoir si l'utilisateur a soumis les réponses

    // Fonction pour gérer la sélection de réponse
    const handleAnswerChange = (questionId: string, selectedAnswer: string) => {
        // Ne permet pas de modifier les réponses une fois que le quiz est soumis
        if (!hasSubmitted) {
            setAnswers({
                ...answers,
                [questionId]: selectedAnswer,
            });
        }
    };

    // Fonction pour valider les réponses et calculer le score
    const validateAnswers = () => {
        const newResult: { [key: string]: { isCorrect: boolean; message: string } } = {};
        let correctAnswers = 0;

        quiz.questions.forEach(q => {
            const selectedAnswer = answers[q.id];
            const isCorrect = selectedAnswer === q.answer;
            newResult[q.id] = {
                isCorrect: isCorrect,
                message: isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse.'
            };

            if (isCorrect) {
                correctAnswers++;
            }
        });

        setResult(newResult);
        setScore(correctAnswers);  // Met à jour le score
        setHasSubmitted(true);  // Marque que l'utilisateur a soumis ses réponses
    };

    return (
        <Layout>
            <div className="flex flex-col items-center min-h-screen px-4 sm:px-8 pb-8"> {/* Modifié pour donner de l'espace en bas */}
                <h1 className="text-2xl font-bold text-gray-800 mt-6">{quiz.title}</h1>
                <p className="text-sm text-gray-600 text-center mt-2">{quiz.description}</p>

                {/* Questions en 2 colonnes, centrées et ajustées */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 w-full justify-center">
                    {quiz.questions.map((question, index) => (
                        <div key={index} className="mb-4 w-full">
                            <h3 className="text-base font-semibold text-gray-800">{question.question}</h3>
                            <div className="mt-2">
                                {question.options.map((option, idx) => (
                                    <div key={idx} className="flex items-center text-sm">
                                        <input
                                            type="radio"
                                            id={`q${index}-option${idx}`}
                                            name={`q${index}`}
                                            value={option}
                                            checked={answers[question.id] === option}
                                            onChange={() => handleAnswerChange(question.id, option)}
                                            className="mr-2"
                                            disabled={hasSubmitted}  // Désactive les radios une fois que l'utilisateur a soumis
                                        />
                                        <label htmlFor={`q${index}-option${idx}`} className="text-sm text-gray-700">{option}</label>
                                    </div>
                                ))}
                            </div>

                            {/* Afficher la mauvaise réponse en rouge et la bonne en vert */}
                            {result[question.id] && (
                                <div className="mt-2">
                                    {/* Si la réponse est incorrecte, affichez l'option incorrecte en rouge */}
                                    {answers[question.id] !== question.answer && (
                                        <p className="text-sm text-red-500">
                                            {`Mauvaise réponse !`}
                                        </p>
                                    )}

                                    {/* Afficher la bonne réponse en vert */}
                                    {answers[question.id] !== question.answer && (
                                        <p className="text-sm text-green-500">
                                            {`La bonne réponse était : "${question.answer}"`}
                                        </p>
                                    )}

                                    {/* Afficher un message pour une réponse correcte */}
                                    {result[question.id]?.isCorrect && (
                                        <p className="text-sm text-green-500">
                                            Bonne réponse !
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Section de validation et score, séparée du footer */}
                <div className="mt-8 flex flex-col items-center w-full">
                    <button
                        onClick={validateAnswers}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg text-sm"
                        disabled={hasSubmitted}  // Désactive le bouton "Valider" une fois qu'il est cliqué
                    >
                        Valider
                    </button>

                    {/* Affichage du score, même s'il est nul */}
                    {hasSubmitted && (
                        <div className="text-lg font-semibold mt-4">
                            {score > 0
                                ? `Votre score : ${score} sur ${quiz.questions.length}`
                                : `Désolé, vous n'avez aucune bonne réponse.`}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default QuizPage;
