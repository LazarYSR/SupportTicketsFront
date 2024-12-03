import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">
                    <Link to="/">Gestion des Tickets</Link>
                </h1>
                <div className="flex space-x-4">
                    <Link
                        to="/"
                        className="text-white hover:text-gray-200 transition duration-200"
                    >
                        Liste des Tickets
                    </Link>
                    <Link
                        to="/add"
                        className="text-white hover:text-gray-200 transition duration-200"
                    >
                        Ajouter un Ticket
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
