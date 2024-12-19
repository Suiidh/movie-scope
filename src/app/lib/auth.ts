export function decodeToken(token: string) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décoder la partie payload du JWT
        return payload;
    } catch (error) {
        console.error('Erreur lors du décodage du token JWT :', error);
        return null;
    }
}
