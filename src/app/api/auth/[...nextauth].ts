import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (user && user.mdp === credentials?.password) {
                    return user;
                }

                return null; // Si l'utilisateur n'est pas trouvé ou les credentials sont invalides
            },
        }),
    ],
    session: {
        strategy: "jwt", // Utilisation de JWT pour les sessions
    },
    callbacks: {
        async session({ session, user }) {
            if (user) {
                // Ajout du rôle dans la session
                session.user.role = user.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin', // Redirige vers une page personnalisée de connexion
    },
};

export default NextAuth(authOptions);
