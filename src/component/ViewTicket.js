import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Ajout de `useNavigate` pour la redirection
import api from '../api/api';

const ViewTicket = () => {
    const { id } = useParams(); // Récupère l'ID du ticket depuis les paramètres de l'URL
    const navigate = useNavigate(); // Pour gérer les redirections
    const [ticket, setTicket] = useState(null); // Stocke le ticket
    const [error, setError] = useState(''); // Stocke les erreurs éventuelles
    const [loading, setLoading] = useState(true); // Gestion du chargement

    // Charger les détails du ticket
    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await api.get(`/tickets/${id}`);
                setTicket(response.data); // Met à jour les données du ticket
            } catch (err) {
                setError('Erreur lors de la récupération du ticket');
            } finally {
                setLoading(false); // Désactiver l'état de chargement
            }
        };

        fetchTicket();
    }, [id]);

    // Gestion de la redirection vers la page d'édition
    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    // Gestion de la redirection vers la page de confirmation de suppression
    const handleDelete = () => {
        navigate(`/delete/${id}`);
    };

    // Affichage pendant le chargement
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-700">Chargement des détails du ticket...</p>
            </div>
        );
    }

    // Affichage en cas d'erreur
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-100">
                <p className="text-lg text-red-600 font-semibold">{error}</p>
            </div>
        );
    }

    // Affichage des détails du ticket avec les boutons
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
                {ticket ? (
                    <div>
                        <h1 className="text-2xl font-bold text-blue-600 mb-6">Détails du Ticket</h1>
                        <p className="mb-4">
                            <strong className="text-gray-700">Titre :</strong>{' '}
                            <span className="text-gray-800">{ticket.title}</span>
                        </p>
                        <p className="mb-4">
                            <strong className="text-gray-700">Description :</strong>{' '}
                            <span className="text-gray-800">{ticket.description}</span>
                        </p>
                        <p className="mb-4">
                            <strong className="text-gray-700">Status :</strong>{' '}
                            <span className={`px-2 py-1 text-sm rounded ${
                                ticket.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {ticket.status}
                            </span>
                        </p>
                        <p className="mb-6">
                            <strong className="text-gray-700">Créé le :</strong>{' '}
                            <span className="text-gray-800">
                                {new Date(ticket.created_at).toLocaleString()}
                            </span>
                        </p>
                        <div className="flex justify-around">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
                                onClick={handleEdit}
                            >
                                Modifier
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-200"
                                onClick={handleDelete}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Ticket introuvable.</p>
                )}
            </div>
        </div>
    );
};

export default ViewTicket;
