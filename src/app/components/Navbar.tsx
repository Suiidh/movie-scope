"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Récupérer le token dans le localStorage ou le cookie
    const token = localStorage.getItem('token');

    if (token) {
      // Décoder le token pour obtenir les données de l'utilisateur
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décodage du JWT
      setUser({ name: decodedToken.name });
    }
  }, []);

  const handleLogout = () => {
    // Effacer le token du localStorage (ou du cookie)
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
      <nav style={navStyles}>
        <div style={navContainerStyles}>
          {/* Logo à gauche */}
          <div style={logoStyles}><Link href="/" style={linkStyles}>
            <img
                src="public/images/logo.PNG" // Remplacez par le chemin vers votre logo
                alt="Logo du site"
                style={logoImageStyles}
            />
          </Link></div>

          {/* Liens de navigation au centre */}
          <ul style={navLinksStyles}>
            <li><Link href="/" style={linkStyles}>Accueil</Link></li>
            <li><Link href="/films" style={linkStyles}>Films</Link></li>
            <li><Link href="/quiz" style={linkStyles}>Quiz</Link></li>
            <li><Link href="/about" style={linkStyles}>À propos</Link></li>
          </ul>

          {/* Afficher le nom de l'utilisateur et le bouton de déconnexion si l'utilisateur est connecté */}
          <div style={authButtonsStyles}>
            {!user ? (
                <>
                  <Link href="/login" style={authButtonStyles}>Connexion</Link>
                  <Link href="/register" style={{ ...authButtonStyles, backgroundColor: '#28a745' }}>Inscription</Link>
                </>
            ) : (
                <>
                  <span style={userNameStyles}>{user.name}</span>
                  <button onClick={handleLogout} style={logoutButtonStyles}>Déconnexion</button>
                </>
            )}
          </div>
        </div>
      </nav>
  );
}

// Styles en objet JavaScript
const navStyles = {
  padding: '1rem 2rem',
  backgroundColor: '#333',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const navContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px',
};

const logoStyles = {
  flex: 1,
};

const logoImageStyles = {
  height: '40px',
  width: 'auto',
};

const navLinksStyles = {
  display: 'flex',
  listStyle: 'none',
  gap: '30px',
  margin: 0,
  padding: 0,
  flex: 2,
  justifyContent: 'center',
};

const linkStyles = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: 'bold',
  padding: '10px 15px',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease, color 0.3s ease',
};

linkStyles[':hover'] = {
  backgroundColor: '#555',
  color: '#fff',
};

const authButtonsStyles = {
  display: 'flex',
  gap: '15px',
};

const authButtonStyles = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'background-color 0.3s, transform 0.3s',
  textAlign: 'center',
};

authButtonStyles[':hover'] = {
  backgroundColor: '#0056b3',
  transform: 'scale(1.05)',
};

const userNameStyles = {
  color: 'white',
  fontWeight: 'bold',
  fontSize: '18px',
};

const logoutButtonStyles = {
  backgroundColor: '#dc3545',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
};

logoutButtonStyles[':hover'] = {
  backgroundColor: '#c82333',
  transform: 'scale(1.05)',
};
