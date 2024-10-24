// src/app/components/Navbar.tsx

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#333', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0 }}>
          <li>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/films" style={{ color: 'white', textDecoration: 'none' }}>
              Films
            </Link>
          </li>
          <li>
            <Link href="/about" style={{ color: 'white', textDecoration: 'none' }}>
              À propos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
