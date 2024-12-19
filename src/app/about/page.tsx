'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Icône de suppression

interface Suggestion {
    id: number;
    text: string;
}

export default function About() {
    const [suggestion, setSuggestion] = useState('');
    const [suggestionsList, setSuggestionsList] = useState<Suggestion[]>([]);

    // Récupérer les suggestions depuis l'API
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await axios.get('/api/sugg');
                setSuggestionsList(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des suggestions', error);
            }
        };

        fetchSuggestions();
    }, []); // Se lance au montage du composant

    // Gérer le changement dans la zone de texte
    const handleSuggestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSuggestion(e.target.value);
    };

    // Soumettre une nouvelle suggestion
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (suggestion.trim()) {
            try {
                const response = await axios.post('/api/sugg', { text: suggestion });
                setSuggestionsList(prevState => [...prevState, response.data]);
                setSuggestion(''); // Réinitialiser le champ après soumission
            } catch (error) {
                console.error('Erreur lors de l\'envoi de la suggestion', error);
            }
        }
    };

    // Supprimer une suggestion en fonction de l'ID
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/sugg/${id}`);
            setSuggestionsList(prevState => prevState.filter(suggestion => suggestion.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la suggestion', error);
        }
    };

    return (
        <Layout>
            <div className="max-w-screen-xl mx-auto p-6 bg-black text-white rounded-lg shadow-lg mt-10 m-4 flex flex-col lg:flex-row">
                {/* Partie gauche - À propos */}
                <div className="lg:w-2/3 pr-6 mb-6 lg:mb-0">
                <h1 className="text-3xl font-bold text-red-600 mb-4">À propos</h1>
                    <p className="text-lg text-gray-300 mb-4">
                        Bienvenue sur notre blog de cinéma où l'on partage nos avis et critiques sur divers films. Ici, vous trouverez des recommandations, des analyses et des discussions autour des œuvres cinématographiques que nous aimons et découvrons.
                    </p>
                    <p className="text-lg text-gray-300 mb-6">
                        Ce blog a été créé par <strong className="text-red-600">Lucas Martin</strong>, <strong className="text-red-600">Enzo Marion</strong>, <strong className="text-red-600">Jordan Pipet</strong>, des passionnés de cinéma qui aiment explorer chaque aspect du 7e art. Que vous soyez amateur de films classiques ou de nouveautés, vous trouverez ici une source d'inspiration pour vos prochaines séances cinéma. Alors n'hésitez pas à partager vos avis avec nous.
                    </p>

                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Faites-nous une suggestion !</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="suggestion" className="block text-lg font-semibold text-gray-300 mb-2">
                                Votre suggestion de film :
                            </label>
                            <textarea
                                id="suggestion"
                                value={suggestion}
                                onChange={handleSuggestionChange}
                                placeholder="Écrivez ici votre suggestion de film..."
                                rows={4}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-black"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                            Envoyer
                        </button>
                    </form>
                </div>

                {/* Partie droite - Menu défilant des suggestions */}
                <div className="lg:w-1/3 bg-gray-800 p-4 rounded-lg shadow-lg overflow-y-auto h-96">
                    <h3 className="text-xl font-semibold text-red-600 mb-4">Suggestions reçues</h3>
                    <div className="space-y-4">
                        {suggestionsList.length === 0 ? (
                            <p className="text-gray-500">Aucune suggestion pour le moment.</p>
                        ) : (
                            suggestionsList.map((suggestion) => (
                                <div key={suggestion.id} className="p-3 bg-gray-700 border rounded-lg shadow-sm flex justify-between items-center space-x-2 hover:bg-gray-600 transition">
                                    <p className="text-gray-300 break-words max-w-full text-ellipsis overflow-hidden" style={{ wordWrap: 'break-word' }}>
                                        {suggestion.text}
                                    </p>
                                    <button
                                        onClick={() => handleDelete(suggestion.id)}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
