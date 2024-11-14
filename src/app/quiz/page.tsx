import Layout from '../components/Layout';
import Link from 'next/link';  // Utilisation de Link pour la navigation
import { quizz } from '../data/quizz';  // Importation des données des quiz

export default function QuizPage() {
    return (
        <Layout>
            <div className="flex flex-col items-center min-h-screen">
                <h1 className="text-4xl font-bold text-gray-800 mt-8">Quiz</h1>
                <p className="text-lg text-gray-600 text-center mt-4">Testez vos connaissances cinématographiques</p>

                <div className="mt-8">
                    {quizz.map(quiz => (
                        <div key={quiz.id} className="group relative">
                            {/* Utilisation correcte de Link sans la balise <a> */}
                            <Link href={`/quiz/${quiz.id}`} passHref>
                                <img
                                    src={quiz.imageUrl}
                                    alt={quiz.title}
                                    className="w-48 h-64 object-cover transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-gray-700"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}