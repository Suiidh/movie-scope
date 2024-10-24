"use client";  // Indique que ce composant est un Client Component

import React from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;  // Permet de recevoir le contenu des pages
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Header */}
      <header>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/films">Films</Link></li>
            <li><Link href="/about">À propos</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer>
        <p>© 2024 Lucas Martin - Tous droits réservés.</p>
        <p>Suivez-moi sur <a href="#">Instagram</a> et <a href="#">Twitter</a>.</p>
      </footer>

      {/* Styles CSS simples */}
      <style jsx>{`
        header {
          background-color: #333;
          color: white;
          padding: 20px;
          text-align: center;
        }

        nav ul {
          list-style: none;
          display: flex;
          justify-content: center;
        }

        nav ul li {
          margin: 0 15px;
        }

        nav ul li a {
          color: white;
          text-decoration: none;
        }

        main {
          padding: 20px;
        }

        footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 20px;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Layout;
