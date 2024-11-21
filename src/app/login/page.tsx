"use client"; // Utilisation comme Client Component

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Nouveau state pour afficher le succès
    const router = useRouter();

    // Fonction pour gérer la connexion
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Empêche le rechargement de la page

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Si la connexion réussit
                setSuccessMessage('Connexion réussie !');
                setError(''); // Supprime les éventuelles erreurs affichées
                localStorage.setItem('token', data.token); // Stocker le token JWT

                // Rediriger après un délai pour permettre à l'utilisateur de voir le message
                setTimeout(() => {
                    router.push('/'); // Rediriger vers une page protégée
                }, 2000);
            } else {
                // Si une erreur survient
                setSuccessMessage(''); // Supprime le message de succès
                setError(data.message || 'Erreur lors de la connexion');
            }
        } catch (err) {
            console.error('Erreur lors de la connexion:', err);
            setSuccessMessage('');
            setError('Erreur interne du serveur.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '400px', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Connexion</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
                        required
                    />
                    {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>}
                    <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: 'white', borderRadius: '5px', border: 'none' }}>
                        Se connecter
                    </button>
                </form>
                <button onClick={() => router.back()} style={{ marginTop: '10px', width: '100%', padding: '10px', border: '1px solid #333', borderRadius: '5px', backgroundColor: 'transparent', color: '#333' }}>
                    Retour
                </button>
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Pas encore de compte ? <Link href="/register">Inscrivez-vous</Link>
                </p>
            </div>
        </div>
    );
}
