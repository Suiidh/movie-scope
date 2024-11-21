'use client'; // Marque le fichier comme un composant client

import { useState } from 'react';
import Layout from '../components/Layout';

export default function About() {
    const [suggestion, setSuggestion] = useState('');
    const [suggestionsList, setSuggestionsList] = useState([]);

    const handleSuggestionChange = (e) => {
        setSuggestion(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (suggestion.trim()) {
            // Ajouter la suggestion à la liste
            setSuggestionsList([...suggestionsList, suggestion]);
            setSuggestion(''); // Réinitialiser le champ après soumission
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-start p-6 max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-lg">
                {/* Partie gauche - À propos */}
                <div className="w-2/3 pr-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">À propos</h1>
                    <p className="text-lg text-gray-700 mb-4">
                        Bienvenue sur notre blog de cinéma où l'on partage nos avis et critiques sur divers films. Ici, vous trouverez des recommandations, des analyses et des discussions autour des œuvres cinématographiques que nous aimons et découvrons.
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        Ce blog a été créé par <strong>Lucas Martin</strong>,<strong>Enzo Marion</strong>,<strong>Jordan Pipet</strong>, des passionnés de cinéma qui aiment explorer chaque aspect du 7e art. Que vous soyez amateur de films classiques ou de nouveautés, vous trouverez ici une source d'inspiration pour vos prochaines séances cinéma. Alors n'hésitez pas à partager vos avis avec nous.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Faites-nous une suggestion !</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="suggestion" className="block text-lg font-semibold text-gray-700 mb-2">
                                Votre suggestion de film :
                            </label>
                            <textarea
                                id="suggestion"
                                value={suggestion}
                                onChange={handleSuggestionChange}
                                placeholder="Écrivez ici votre suggestion de film..."
                                rows="4"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Envoyer
                        </button>
                    </form>
                </div>

                {/* Partie droite - Menu défilant des suggestions */}
                <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg overflow-y-auto h-96">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Suggestions reçues</h3>
                    <div className="space-y-2">
                        {suggestionsList.length === 0 ? (
                            <p className="text-gray-600">Aucune suggestion pour le moment.</p>
                        ) : (
                            suggestionsList.map((suggestion, index) => (
                                <div key={index} className="p-3 bg-white border rounded-lg shadow-sm">
                                    <p className="text-gray-700">{suggestion}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
