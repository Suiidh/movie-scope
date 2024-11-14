// src/app/components/Navbar.tsx

import Link from 'next/link';

export default function Navbar() {
  return (
<<<<<<< HEAD
    <nav style={{ padding: '1rem', backgroundColor: '#333', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ul style={{display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0}}>
          <li>
            <Link href="/" style={{color: 'white', textDecoration: 'none'}}>
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/films" style={{color: 'white', textDecoration: 'none'}}>
              Films
            </Link>
          </li>
          <li>
            <Link href="/quiz" style={{color: 'white', textDecoration: 'none'}}>
              Quiz
            </Link>
          </li>
          <li>
            <Link href="/about" style={{color: 'white', textDecoration: 'none'}}>
              À propos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
=======
      <nav style={navStyles}>
        <div style={navContainerStyles}>
          {/* Logo à gauche */}
          <div style={logoStyles}><Link href="/" style={linkStyles}>
            <img
                src="/path/to/logo.png" // Remplacez par le chemin vers votre logo
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

          {/* Boutons de connexion et inscription à droite */}
          <div style={authButtonsStyles}>
            <Link href="/login" style={authButtonStyles}>Connexion</Link>
            <Link href="/register" style={{ ...authButtonStyles, backgroundColor: '#28a745' }}>Inscription</Link>
          </div>
        </div>
      </nav>
>>>>>>> 68a2317e074e3880d75877b699c1ee6dfde78013
  );
}

// Styles en objet JavaScript
const navStyles = {
  padding: '1rem 2rem', // Plus de padding horizontal pour plus d'espace
  backgroundColor: '#333',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Ajout d'une légère ombre pour un effet flottant
};

const navContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px', // Limite la largeur du container
};

const logoStyles = {
  flex: 1, // Logo à gauche
};

const logoImageStyles = {
  height: '40px', // Ajustez la taille du logo
  width: 'auto',
};

const navLinksStyles = {
  display: 'flex',
  listStyle: 'none',
  gap: '30px', // Plus d'espace entre les liens
  margin: 0,
  padding: 0,
  flex: 2, // Pour que le menu soit centré
  justifyContent: 'center',
};

const linkStyles = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px', // Augmenter la taille de la police
  fontWeight: 'bold',
  padding: '10px 15px', // Augmenter le padding pour plus d'espace
  borderRadius: '5px', // Coins arrondis pour les liens
  transition: 'background-color 0.3s ease, color 0.3s ease', // Ajout d'une transition douce
};

linkStyles[':hover'] = {
  backgroundColor: '#555', // Change la couleur de fond au survol
  color: '#fff', // Garde la couleur du texte blanche lors du survol
};

const authButtonsStyles = {
  display: 'flex',
  gap: '15px', // Plus d'espace entre les boutons
};

const authButtonStyles = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px', // Plus de padding pour les boutons
  borderRadius: '5px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'background-color 0.3s, transform 0.3s', // Ajout de transition pour effet de survol
  textAlign: 'center',
};

authButtonStyles[':hover'] = {
  backgroundColor: '#0056b3',
  transform: 'scale(1.05)', // Légère augmentation de la taille au survol
};

// Optionnel: Pour changer la couleur de fond de l'inscription
const registerButtonStyles = {
  ...authButtonStyles,
  backgroundColor: '#28a745', // Vert pour inscription
};

registerButtonStyles[':hover'] = {
  backgroundColor: '#218838',
  transform: 'scale(1.05)',
};
