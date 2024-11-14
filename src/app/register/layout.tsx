export const metadata = {
    title: 'Inscription | Movie Scope',
    description: 'Page d\'inscription pour Movie Scope',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <body>{children}</body>
        </html>
    );
}
