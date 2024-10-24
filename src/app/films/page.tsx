import prisma from '../lib/prisma';  // Chemin relatif à ajuster en fonction de ton projet
import Layout from '../components/Layout';  // Import du composant Layout

// Récupérer les films côté serveur avec Prisma
export default async function FilmsPage() {
  // Récupérer les films directement dans le composant
  const films = await prisma.film.findMany();
  console.log(films);
  return (
    <Layout>
      <div>
        <h1>Liste des Films</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {films.map((film) => (
            <div key={film.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
              <img 
                src={`/images/${film.image}`}  // Chemin vers l'image
                alt={film.titre} 
                style={{ width: '100%', borderRadius: '5px' }}  // Style pour que l'image prenne toute la largeur
              />
              <h2>{film.titre}</h2>
              <p>{film.description}</p>
              <p>Durée: {film.duree}h</p>
              <p>Note moyenne: {film.avis}/5</p>
              <p>Date de sortie: {new Date(film.dateSortie).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
