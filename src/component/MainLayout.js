import React from 'react';
import Navbar from './Navbar'; // Importer la Navbar

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar /> {/* Navbar partagée */}
            <main className="p-4 container mx-auto">{children}</main> {/* Contenu de la page */}
        </div>
    );
};

export default MainLayout;
