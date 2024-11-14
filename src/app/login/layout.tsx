// src/app/login/layout.tsx

export const metadata = {
    title: 'Connexion | Movie Scope',
    description: 'Connectez-vous à votre compte Movie Scope',
};

export default function LoginLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <body style={layoutStyles}>
        <div style={containerStyles}>
            {children}
        </div>
        </body>
        </html>
    );
}

// Styles en objet JavaScript
const layoutStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
};

const containerStyles = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
};
