import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../lib/prisma";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt', // Utilisation du JWT pour la gestion des sessions
    },
    callbacks: {
        async jwt({ token, user }) {
            // Ajout des informations utilisateur dans le JWT
            if (user) {
                token.id = user.id;
                token.role = user.role; // Assure-toi que l'utilisateur a un champ 'role' dans la base de données
            }
            return token;
        },
        async session({ session, token }) {
            // Ajout des informations du JWT dans la session
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role; // Ajout du rôle dans la session
            }
            return session;
        },
    },
});
