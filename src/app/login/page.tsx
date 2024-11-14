// src/app/login/page.tsx
"use client"; // Indique que ce fichier est un Client Component

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Logique de connexion à implémenter
        console.log('Tentative de connexion:', email, password);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h1>Connexion</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button
                onClick={handleLogin}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#333', color: 'white', border: 'none' }}
            >
                Se connecter
            </button>
            <p style={{ marginTop: '1rem' }}>
                Pas encore inscrit ? <Link href="/register" style={{ color: '#0070f3' }}>Créer un compte</Link>
            </p>
        </div>
    );
}
