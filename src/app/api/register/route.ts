import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {

        if (request.headers.get("Content-Type") !== "application/json") {
            return NextResponse.json({ message: "Content-Type doit être application/json" }, { status: 400 });
        }
        // Extraction des données du corps de la requête
        const { username, email, password } = await request.json();

        // Validation des données
        if (!username || !email || !password) {
            return NextResponse.json(
                { message: 'Tous les champs sont requis.' },
                { status: 400 }
            );
        }

        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'Cet email est déjà utilisé.' },
                { status: 400 }
            );
        }

        // Hashage du mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Création du nouvel utilisateur
        const newUser = await prisma.user.create({
            data: {
                nomUsers: username, // Remplacez par le champ exact dans votre base
                email,
                mdp: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: 'Utilisateur créé avec succès.', user: newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        return NextResponse.json(
            { message: 'Erreur serveur. Veuillez réessayer plus tard.' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // Fermer la connexion à la base de données
    }
}
