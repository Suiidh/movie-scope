import Layout from './components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="container">
        <section className="recent-movies">
          <h2>Films Récents</h2>
          <div className="grid">
            {/* Remplace ces éléments par des composants affichant tes films */}
            <div className="movie-card">
              <img src="/affiche1.jpg" alt="Film 1" />
              <h3>Titre du Film 1</h3>
              <p>Résumé court du film...</p>
            </div>
            <div className="movie-card">
              <img src="/affiche2.jpg" alt="Film 2" />
              <h3>Titre du Film 2</h3>
              <p>Résumé court du film...</p>
            </div>
          </div>
        </section>

        <section className="recommendations">
          <h2>Mes Recommandations</h2>
          <div className="grid">
            {/* Recommandations de films */}
            <div className="movie-card">
              <img src="/affiche3.jpg" alt="Film recommandé" />
              <h3>Film Recommandé 1</h3>
              <button>Voir les détails</button>
            </div>
            <div className="movie-card">
              <img src="/affiche4.jpg" alt="Film recommandé" />
              <h3>Film Recommandé 2</h3>
              <button>Voir les détails</button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
