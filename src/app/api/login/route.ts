import {prisma} from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Données reçues :', body);

        // Assurez-vous que vous vérifiez les bonnes clés
        if (!body.email || !body.password) {
            console.error('Champs manquants :', { email: body.email, password: body.password });
            return new Response(
                JSON.stringify({ message: 'Email ou mot de passe manquant.' }),
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (!user) {
            return new Response(
                JSON.stringify({ message: 'Utilisateur non trouvé.' }),
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.mdp);

        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ message: 'Mot de passe incorrect.' }),
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        return new Response(
            JSON.stringify({ token }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        return new Response(
            JSON.stringify({ message: 'Erreur interne du serveur.' }),
            { status: 500 }
        );
    }
}
