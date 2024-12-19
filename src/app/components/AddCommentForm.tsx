"use client";

import { useState } from 'react';

export default function AddCommentForm({ filmId }: { filmId: number }) {
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Récupération du token JWT depuis le localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Utilisateur non authentifié. Veuillez vous connecter pour commenter.');
            return;
        }

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Envoi du token dans l'en-tête
                },
                body: JSON.stringify({ filmId, content }),
            });

            if (response.ok) {
                window.location.reload(); // Recharge la page pour afficher le nouveau commentaire
            } else {
                const errorData = await response.json();
                setError(`Erreur lors de l'ajout du commentaire : ${errorData.error}`);
            }
        } catch (error) {
            setError('Erreur réseau. Veuillez réessayer plus tard.');
        }
    };

    return (
        <div>
            {error && (
                <p className="text-red-500 text-sm mb-4">
                    {error}
                </p>
            )}
            <form onSubmit={handleSubmit} className="mt-4">
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Écrivez votre commentaire ici..."
            required
        />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600"
                >
                    Ajouter un commentaire
                </button>
            </form>
        </div>
    );
}
