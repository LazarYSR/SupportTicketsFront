import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import api from '../api/api';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate(); // Initialiser le hook useNavigate

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await api.get('/tickets');
                console.log('Fetched tickets:', response.data); // Vérifiez la réponse ici
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error.message); // Ajoutez ce log
            }
        };
        fetchTickets();
    }, []);

    const handleViewDetails = (ticketId) => {
        navigate(`/view/${ticketId}`); // Rediriger vers ViewTicket avec l'ID du ticket
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                    Ticket List
                </h1>
                {tickets.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {tickets.map((ticket) => (
                            <li
                                key={ticket._id}
                                className="py-4 flex items-center justify-between"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {ticket.title || 'No Title'}
                                    </h2>
                                    <p
                                        className={`text-sm font-medium px-2 py-1 rounded ${
                                            ticket.status === 'open'
                                                ? 'bg-green-100 text-green-800'
                                                : ticket.status === 'closed'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {ticket.status || 'No Status'}
                                    </p>
                                </div>
                                <button
                                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
                                    onClick={() => handleViewDetails(ticket._id)} // Appeler handleViewDetails
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No tickets available.</p>
                )}
            </div>
        </div>
    );
};

export default TicketList;
