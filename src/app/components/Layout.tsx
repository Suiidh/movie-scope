// src/app/components/Layout.tsx

import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />  {/* Barre de navigation */}
      <main style={{ flex: '1' }}>{children}</main> {/* Contenu principal */}
      <footer style={{ padding: '1rem', backgroundColor: '#333', color: 'white', textAlign: 'center' }}>
        <p>© 2024 Mon Blog de Films</p>
      </footer>
    </div>
  );
}
