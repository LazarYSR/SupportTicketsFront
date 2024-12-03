import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

const DeleteTicket = () => {
    const { id } = useParams(); // Récupérer l'ID du ticket
    const navigate = useNavigate(); // Pour rediriger après suppression

    const handleDelete = async () => {
        try {
            await api.delete(`/tickets/${id}`);
            alert('Ticket deleted successfully!');
            navigate('/'); // Rediriger vers la liste des tickets après suppression
        } catch (error) {
            console.error('Error deleting ticket:', error.message);
            alert('Failed to delete the ticket. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/'); // Rediriger vers la liste des tickets si annulé
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">
                    Delete Ticket
                </h1>
                <p className="text-lg text-gray-700 text-center">
                    Are you sure you want to delete this ticket? This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-around">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-200"
                        onClick={handleDelete}
                    >
                        Confirm Delete
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400 transition duration-200"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTicket;
