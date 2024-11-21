"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CreateQuizPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<any[]>([]);

    // Charger les quizzes existants depuis localStorage au démarrage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
            setQuizzes(storedQuizzes);
        }
    }, []);

    // Sauvegarder les quizzes dans localStorage
    useEffect(() => {
        if (typeof window !== "undefined" && quizzes.length > 0) {
            localStorage.setItem('quizzes', JSON.stringify(quizzes));
        }
    }, [quizzes]);

    const handleQuestionChange = (
        questionIndex: number,
        field: string,
        value: string,
        optionIndex?: number
    ) => {
        const newQuestions = [...questions];

        if (field === 'question') {
            newQuestions[questionIndex].question = value;
        } else if (field === 'option' && optionIndex !== undefined) {
            newQuestions[questionIndex].options[optionIndex] = value;
        } else if (field === 'answer') {
            newQuestions[questionIndex].answer = value;
        }

        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
    };

    const deleteQuestion = (index: number) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const quiz = {
            id: title.toLowerCase().replace(/\s+/g, '-'), // Utilisation du titre comme ID
            title,
            description,
            imageUrl,
            questions
        };

        // Ajouter le quiz à la liste
        const updatedQuizzes = [...quizzes, quiz];
        setQuizzes(updatedQuizzes);

        // Rediriger vers la page du quiz créé
        router.push(`/quiz/${quiz.id}`);
    };

    return (
        <div className="flex flex-col items-center min-h-screen px-4 sm:px-8 pb-8">
            <h1 className="text-2xl font-bold text-gray-800 mt-6">Créer un Quiz</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg mt-8">
                <input
                    type="text"
                    placeholder="Titre du quiz"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="URL de l'image"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <div>
                    {questions.map((q, index) => (
                        <div key={index} className="mb-4">
                            <input
                                type="text"
                                placeholder={`Question ${index + 1}`}
                                value={q.question}
                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                required
                            />
                            {q.options.map((opt, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    placeholder={`Option ${idx + 1}`}
                                    value={opt}
                                    onChange={(e) => handleQuestionChange(index, 'option', e.target.value, idx)}
                                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                                    required
                                />
                            ))}
                            <input
                                type="text"
                                placeholder="Réponse correcte"
                                value={q.answer}
                                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                                required
                            />
                            <button type="button" onClick={() => deleteQuestion(index)} className="text-red-500">Supprimer cette question</button>
                        </div>
                    ))}

                    <button type="button" onClick={addQuestion} className="px-4 py-2 bg-green-500 text-white rounded">Ajouter une question</button>
                </div>

                <button type="submit" className="mt-8 w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg">
                    Créer le quiz
                </button>
            </form>
        </div>
    );
};

export default CreateQuizPage;
