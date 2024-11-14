

export const quizz = [
    {
        id: 'harry-potter-1',
        title: 'Quiz sur Harry Potter 1',
        description: 'Testez vos connaissances sur le premier film de la saga Harry Potter !',
        imageUrl: 'https://fr.web.img6.acsta.net/c_310_420/pictures/18/07/02/17/25/3643090.jpg',
        questions: [
            {
                id: 'q1',
                question: 'Qui est le réalisateur de Harry Potter à l\'école des sorciers ?',
                options: ['Chris Columbus', 'Alfonso Cuarón', 'David Yates'],
                answer: 'Chris Columbus'
            },
            {
                id: 'q2',
                question: 'Quel est le nom de la baguette de Harry Potter ?',
                options: ['Baguette de sureau', 'Baguette de saule', 'Baguette de houx'],
                answer: 'Baguette de saule'
            },
            {
                id: 'q3',
                question: 'Quel est le nom de l\'école où Harry Potter étudie ?',
                options: ['Poudlard', 'Beauxbâtons', 'Durmstrang'],
                answer: 'Poudlard'
            },
            {
                id: 'q4',
                question: 'Quel est le nom de l\'oncle de Harry Potter ?',
                options: ['Vernon Dursley', 'Harry Dursley', 'James Potter'],
                answer: 'Vernon Dursley'
            },
            {
                id: 'q5',
                question: 'Quel est le sort que Harry utilise pour la première fois sur son épouvantard ?',
                options: ['Expecto Patronum', 'Riddikulus', 'Expelliarmus'],
                answer: 'Riddikulus'
            },
            {
                id: 'q6',
                question: 'Quel est le nom de la plateforme où les élèves prennent le train pour Poudlard ?',
                options: ['9¾', '12A', '7B'],
                answer: '9¾'
            },
            {
                id: 'q7',
                question: 'Qui est le professeur de potions à Poudlard ?',
                options: ['Severus Snape', 'Minerva McGonagall', 'Filius Flitwick'],
                answer: 'Severus Snape'
            },
            {
                id: 'q8',
                question: 'Quel est le nom de l\'animal de compagnie de Ron Weasley ?',
                options: ['Hedwige', 'Croûtard', 'Norbert'],
                answer: 'Croûtard'
            },
            {
                id: 'q9',
                question: 'Quel est le nom du train qui mène à Poudlard ?',
                options: ['Le Poudlard Express', 'Le Train de la Sorcellerie', 'Le Magic Express'],
                answer: 'Le Poudlard Express'
            },
            {
                id: 'q10',
                question: 'Quelle est la première phrase que Harry Potter entend de Hagrid ?',
                options: ['"Vous êtes un sorcier, Harry !"', '"Il est temps de partir, Harry."', '"Bienvenue à Poudlard, Harry."'],
                answer: '"Vous êtes un sorcier, Harry !"'
            }
        ],
        validateAnswer: function(questionId, selectedAnswer) {
            const question = this.questions.find(q => q.id === questionId);
            if (question) {
                if (selectedAnswer === question.answer) {
                    return { isCorrect: true, message: 'Bonne réponse !' };
                } else {
                    return { isCorrect: false, message: 'Mauvaise réponse.' };
                }
            } else {
                return { isCorrect: false, message: 'Question introuvable.' };
            }
        }
    }
];
