// src/app/quiz/[id]/page.tsx

'use client';  // Indique que ce fichier est un composant client

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

    return (
        <Layout>
            <div className="flex flex-col items-center min-h-screen">
                <h1 className="text-4xl font-bold text-gray-800 mt-8">{quiz.title}</h1>
                <p className="text-lg text-gray-600 text-center mt-4">{quiz.description}</p>

                <div className="mt-8">
                    {quiz.questions.map((question, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-xl font-bold text-gray-800">{question.question}</h3>
                            <div className="mt-2">
                                {question.options.map((option, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`q${index}-option${idx}`}
                                            name={`q${index}`}
                                            value={option}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`q${index}-option${idx}`} className="text-lg text-gray-700">{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default QuizPage;
