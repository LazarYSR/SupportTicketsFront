import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importer useNavigate
import api from '../api/api';

const EditTicket = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        status: '',
    });
    const navigate = useNavigate(); // Initialiser le hook useNavigate

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await api.get(`/tickets/${id}`);
                setTicket(response.data);
            } catch (error) {
                console.error('Error fetching ticket:', error);
            }
        };

        fetchTicket();
    }, [id]);

    const handleChange = (e) => {
        setTicket({ ...ticket, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/tickets/${id}`, ticket);
            alert('Ticket updated successfully!');
            
            // Rediriger vers la page de la liste des tickets après la mise à jour
            navigate('/');
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full"
            >
                <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
                    Edit Ticket
                </h2>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="status"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={ticket.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition duration-200"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditTicket;
