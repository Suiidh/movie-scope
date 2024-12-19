import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../lib/prisma";  // Vérifiez le bon chemin vers votre fichier prisma

export const authOptions = {
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

                if (user && user.password === credentials?.password) {
                    return user;
                }
                return null;  // Si l'utilisateur ou le mot de passe ne correspond pas, retourne null
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),  // Utilise Prisma Adapter pour la gestion de la session
    session: { strategy: "jwt" },  // Utilisation des JWT pour la gestion des sessions
    callbacks: {
        async session({ session, user }) {
            if (user) {
                session.user.id = user.id;
                session.user.role = user.role;
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);
