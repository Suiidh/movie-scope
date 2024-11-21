"use client"; // Indiquer que c'est un composant client

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Nouveau state pour afficher le succès
    const router = useRouter();

    // Fonction pour gérer la soumission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation des mots de passe
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            setSuccessMessage(''); // Efface le message de succès si présent
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Si l'inscription réussit
                setError('');
                setSuccessMessage('Inscription réussie ! Vous allez être redirigé.');
                setTimeout(() => {
                    router.push('/login'); // Redirection vers la page de connexion
                }, 2000); // Délai pour permettre à l'utilisateur de lire le message
            } else {
                // Si une erreur survient
                setError(data.message || 'Erreur lors de l\'inscription.');
                setSuccessMessage(''); // Efface le message de succès si présent
            }
        } catch (err) {
            console.error('Erreur lors de l\'inscription:', err);
            setError('Erreur interne du serveur.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '400px',
                    width: '100%',
                    padding: '2rem',
                    borderRadius: '10px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Inscription</h2>
                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>}
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        backgroundColor: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    S'inscrire
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    style={{
                        marginTop: '10px',
                        padding: '10px',
                        border: '1px solid #333',
                        borderRadius: '5px',
                        backgroundColor: 'transparent',
                        color: '#333',
                        cursor: 'pointer',
                    }}
                >
                    Retour
                </button>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Déjà un compte ?{' '}
                    <Link href="/login" style={{ color: '#333', textDecoration: 'underline' }}>
                        Connectez-vous
                    </Link>
                </p>
            </form>
        </div>
    );
}
