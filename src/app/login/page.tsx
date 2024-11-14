"use client"; // Utilisation comme Client Component

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '400px', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Connexion</h1>
                <form>
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
                        style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
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
