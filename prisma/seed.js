const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const films = [
    {
      titre: 'Inception',
      image: 'https://example.com/images/inception.jpg',
      description: 'Un thriller de science-fiction sur le rêve.',
      duree: 2.5,
      avis: 4.8,
      dateSortie: new Date('2010-07-16')
    },
    {
      titre: 'The Matrix',
      image: 'https://example.com/images/the-matrix.jpg',
      description: 'Un film de science-fiction et d’action sur une réalité virtuelle.',
      duree: 2.2,
      avis: 4.7,
      dateSortie: new Date('1999-03-31')
    },
    {
      titre: 'Interstellar',
      image: 'https://example.com/images/interstellar.jpg',
      description: 'Une aventure à travers l’espace et le temps.',
      duree: 2.9,
      avis: 4.6,
      dateSortie: new Date('2014-11-07')
    },
    {
      titre: 'The Dark Knight',
      image: 'https://example.com/images/the-dark-knight.jpg',
      description: 'Un film sur la lutte contre le crime à Gotham.',
      duree: 2.5,
      avis: 4.9,
      dateSortie: new Date('2008-07-18')
    },
    {
      titre: 'Fight Club',
      image: 'https://example.com/images/fight-club.jpg',
      description: 'Un thriller psychologique sur la société moderne.',
      duree: 2.3,
      avis: 4.4,
      dateSortie: new Date('1999-10-15')
    },
    {
      titre: 'Pulp Fiction',
      image: 'https://example.com/images/pulp-fiction.jpg',
      description: 'Un film culte sur la vie criminelle.',
      duree: 2.4,
      avis: 4.5,
      dateSortie: new Date('1994-10-14')
    },
    {
      titre: 'Forrest Gump',
      image: 'https://example.com/images/forrest-gump.jpg',
      description: 'Un drame sur la vie extraordinaire d’un homme ordinaire.',
      duree: 2.2,
      avis: 4.8,
      dateSortie: new Date('1994-07-06')
    },
    {
      titre: 'The Shawshank Redemption',
      image: 'https://example.com/images/the-shawshank-redemption.jpg',
      description: 'Un drame sur la rédemption en prison.',
      duree: 2.2,
      avis: 4.9,
      dateSortie: new Date('1994-09-22')
    },
    {
      titre: 'The Godfather',
      image: 'https://example.com/images/the-godfather.jpg',
      description: 'Un classique du film de mafia.',
      duree: 2.9,
      avis: 4.9,
      dateSortie: new Date('1972-03-24')
    },
    {
      titre: 'Gladiator',
      image: 'https://example.com/images/gladiator.jpg',
      description: 'Une épopée historique sur la Rome antique.',
      duree: 2.5,
      avis: 4.6,
      dateSortie: new Date('2000-05-05')
    },
    {
      titre: 'Titanic',
      image: 'https://example.com/images/titanic.jpg',
      description: 'Un drame romantique sur un célèbre naufrage.',
      duree: 3.1,
      avis: 4.7,
      dateSortie: new Date('1997-12-19')
    },
    {
      titre: 'The Lord of the Rings: The Fellowship of the Ring',
      image: 'https://example.com/images/the-lord-of-the-rings.jpg',
      description: 'Une aventure fantastique en Terre du Milieu.',
      duree: 3.0,
      avis: 4.8,
      dateSortie: new Date('2001-12-19')
    },
    {
      titre: 'The Avengers',
      image: 'https://example.com/images/the-avengers.jpg',
      description: 'Un film d’action réunissant des super-héros.',
      duree: 2.4,
      avis: 4.3,
      dateSortie: new Date('2012-05-04')
    },
    {
      titre: 'The Silence of the Lambs',
      image: 'https://example.com/images/the-silence-of-the-lambs.jpg',
      description: 'Un thriller psychologique avec un célèbre criminel.',
      duree: 1.9,
      avis: 4.7,
      dateSortie: new Date('1991-02-14')
    },
    {
      titre: 'Schindler’s List',
      image: 'https://example.com/images/schindlers-list.jpg',
      description: 'Un drame poignant sur la Seconde Guerre mondiale.',
      duree: 3.2,
      avis: 4.9,
      dateSortie: new Date('1993-11-30')
    },
    {
      titre: 'Jurassic Park',
      image: 'https://example.com/images/jurassic-park.jpg',
      description: 'Un film de science-fiction avec des dinosaures.',
      duree: 2.1,
      avis: 4.5,
      dateSortie: new Date('1993-06-11')
    },
    {
      titre: 'Avatar',
      image: 'https://example.com/images/avatar.jpg',
      description: 'Une aventure de science-fiction sur une planète extraterrestre.',
      duree: 2.7,
      avis: 4.4,
      dateSortie: new Date('2009-12-18')
    },
    {
      titre: 'Braveheart',
      image: 'https://example.com/images/braveheart.jpg',
      description: 'Une épopée historique sur la liberté écossaise.',
      duree: 3.0,
      avis: 4.6,
      dateSortie: new Date('1995-05-24')
    },
    {
      titre: 'The Lion King',
      image: 'https://example.com/images/the-lion-king.jpg',
      description: 'Un classique d’animation sur la vie en Afrique.',
      duree: 1.8,
      avis: 4.9,
      dateSortie: new Date('1994-06-15')
    },
    {
      titre: 'The Green Mile',
      image: 'https://example.com/images/the-green-mile.jpg',
      description: 'Un drame fantastique dans une prison américaine.',
      duree: 3.0,
      avis: 4.8,
      dateSortie: new Date('1999-12-10')
    }
  ];

  // Insérer les 20 films
  await prisma.film.createMany({
    data: films
  });

  console.log('Les films ont été ajoutés avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
