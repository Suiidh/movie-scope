import Layout from '../components/Layout';

export default function Films() {
  return (
    <Layout>
      <div className="container">
        <h2>Liste de Films</h2>
        <div className="grid">
          {/* Exemple d'un film */}
          <div className="movie-card">
            <img src="/affiche1.jpg" alt="Film 1" />
            <h3>Titre du Film 1</h3>
            <button>En savoir plus</button>
          </div>
          <div className="movie-card">
            <img src="/affiche2.jpg" alt="Film 2" />
            <h3>Titre du Film 2</h3>
            <button>En savoir plus</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
