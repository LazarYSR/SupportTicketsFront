import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import api from '../api/api';

const AddTicket = () => {
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        status: 'open',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Initialiser le hook useNavigate

    const handleChange = (e) => {
        setTicket({ ...ticket, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation basique
        if (!ticket.title || !ticket.description) {
            alert('Title and description are required!');
            return;
        }

        setIsSubmitting(true);
        setError(null); // Réinitialise les erreurs avant chaque soumission

        try {
            const response = await api.post('/tickets', {
                ...ticket,
                created_at: new Date().toISOString(),
            });
            alert('Ticket added successfully!');
            console.log(response.data);
            setTicket({ title: '', description: '', status: 'open' }); // Réinitialise le formulaire

            // Rediriger vers la page de la liste des tickets
            navigate('/'); // Redirection vers la liste des tickets
        } catch (error) {
            console.error('Error adding ticket:', error);
            setError('An error occurred while adding the ticket.');
        } finally {
            setIsSubmitting(false); // Arrête l'indicateur de chargement
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
            >
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
                    Add a New Ticket
                </h2>
                {error && (
                    <div className="text-red-500 text-center mb-4">
                        {error}
                    </div>
                )}
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter ticket title"
                        value={ticket.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        disabled={isSubmitting}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter ticket description"
                        value={ticket.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        disabled={isSubmitting}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Add Ticket'}
                </button>
            </form>
        </div>
    );
};

export default AddTicket;
