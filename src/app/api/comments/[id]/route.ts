import { prisma } from '@/app/lib/prisma';
import jwt from 'jsonwebtoken';

export async function PUT(req: { json: () => any; headers: { get: (arg0: string) => any; }; }, {params}: any) {
    const { id } = params;
    const body = await req.json();

    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Token manquant ou invalide' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decodedUser;

    try {
        decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Token invalide ou expiré' }), { status: 401 });
    }

    const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } });
    // @ts-ignore
    if (!comment || comment.userId !== decodedUser.id) {
        return new Response(JSON.stringify({ error: 'Accès refusé' }), { status: 403 });
    }

    await prisma.comment.update({
        where: { id: parseInt(id) },
        data: { content: body.content },
    });

    return new Response(JSON.stringify({ message: 'Commentaire mis à jour avec succès' }), { status: 200 });
}

export async function DELETE(req: { headers: { get: (arg0: string) => any; }; }, {params}: any) {
    const { id } = params;

    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Token manquant ou invalide' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    let decodedUser;

    try {
        decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Token invalide ou expiré' }), { status: 401 });
    }

    const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } });
    // @ts-ignore
    if (!comment || comment.userId !== decodedUser.id) {
        return new Response(JSON.stringify({ error: 'Accès refusé' }), { status: 403 });
    }

    await prisma.comment.delete({ where: { id: parseInt(id) } });

    return new Response(JSON.stringify({ message: 'Commentaire supprimé avec succès' }), { status: 200 });
}
