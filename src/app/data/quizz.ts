// data/quizzes.ts
export const quizz = [
    {
        id: 'harry-potter-1',
        title: 'quiz sur Harry Potter 1',
        description: 'Testez vos connaissances sur le premier film de la saga Harry Potter !',
        imageUrl: 'https://fr.web.img6.acsta.net/c_310_420/pictures/18/07/02/17/25/3643090.jpg',  // Image du film
        questions: [
            {
                question: 'Qui est le réalisateur de Harry Potter à l\'école des sorciers ?',
                options: ['Chris Columbus', 'Alfonso Cuarón', 'David Yates'],
                answer: 'Chris Columbus'
            },
            {
                question: 'Quel est le nom de la baguette de Harry Potter ?',
                options: ['Baguette de sureau', 'Baguette de saule', 'Baguette de houx'],
                answer: 'Baguette de saule'
            },
            {
                question: 'Quel est le nom de l\'école où Harry Potter étudie ?',
                options: ['Poudlard', 'Beauxbâtons', 'Durmstrang'],
                answer: 'Poudlard'
            },
            // Ajoute d'autres questions ici
        ]
    }
];
