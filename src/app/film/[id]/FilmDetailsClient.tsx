"use client";

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import AddCommentForm from '../../components/AddCommentForm';
import { RiArrowGoBackFill } from "react-icons/ri";
import { useState, useEffect } from 'react';
import { decodeToken } from '../../lib/auth';

export default function FilmDetailsClient({ film }: { film: any }) {
    const [comments, setComments] = useState(film.comments);
    const [userId, setUserId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded?.id) {
                setUserId(decoded.id);
            }
        }
    }, []);

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
        setEditingContent(comment.content);
    };

    const handleSaveEdit = async (commentId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vous devez être connecté pour effectuer cette action.');
            return;
        }

        try {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content: editingContent }),
            });

            if (response.ok) {
                const updatedComments = comments.map((c) =>
                    c.id === commentId ? { ...c, content: editingContent } : c
                );
                setComments(updatedComments);
                setEditingCommentId(null);
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.error}`);
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditingContent('');
    };

    const openDeleteModal = (comment) => {
        setCommentToDelete(comment);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setCommentToDelete(null);
    };

    const handleDeleteComment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vous devez être connecté pour effectuer cette action.');
            return;
        }

        try {
            const response = await fetch(`/api/comments/${commentToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setComments(comments.filter((c) => c.id !== commentToDelete.id));
                closeDeleteModal();
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.error}`);
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
        }
    };

    const imageUrl = film.image.startsWith('/') ? film.image : `/${film.image}`;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            <div className="p-4 flex items-center">
                <Link href="/" className="text-blue-500 hover:underline flex items-center">
                    <RiArrowGoBackFill className="mr-2 text-2xl" /> Retour à la liste des films
                </Link>
            </div>

            <div className="flex flex-col justify-center items-center p-8">
                <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                    <Image
                        src={imageUrl}
                        alt={film.titre}
                        width={400}
                        height={160}
                        className="rounded-lg mb-6 mx-auto"
                    />
                    <h1 className="text-3xl font-bold mb-4">{film.titre}</h1>
                    <p className="text-gray-400 mb-4">{film.description}</p>
                    <p className="text-gray-300">
                        <strong>Durée :</strong> {film.duree} heures
                    </p>
                    <p className="text-gray-300">
                        <strong>Avis :</strong> {film.avis} / 5
                    </p>
                    <p className="text-gray-300">
                        <strong>Date de sortie :</strong> {new Date(film.dateSortie).toLocaleDateString('fr-FR')}
                    </p>
                </div>

                <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg mt-8 p-6">
                    <h2 className="text-2xl font-bold mb-4">Commentaires</h2>

                    {comments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-700 pb-4 mb-4">
                            {editingCommentId === comment.id ? (
                                <div>
                                    <textarea
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => handleSaveEdit(comment.id)}
                                            className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600"
                                        >
                                            Enregistrer
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        <strong>{comment.user.nomUsers} :</strong> {comment.content}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                        Posté le {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                                    </p>
                                    {comment.user.id === userId && (
                                        <div className="mt-2 flex gap-2">
                                            <button
                                                onClick={() => handleEditComment(comment)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(comment)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    <AddCommentForm filmId={film.id} />
                </div>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-lg font-bold text-white mb-4">Confirmer la suppression</h3>
                        <p className="text-gray-400 mb-4">
                            Voulez-vous vraiment supprimer ce commentaire ?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteComment}
                                className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600"
                            >
                                Supprimer
                            </button>
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
