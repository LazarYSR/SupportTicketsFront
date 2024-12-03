import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar'; // Assurez-vous que le chemin est correct
import TicketList from './component/ListTickets';
import AddTicket from './component/AddTicket';
import EditTicket from './component/EditTicket';
import ViewTicket from './component/ViewTicket';
import DeleteTicket from './component/DeleteTicket';

const App = () => {
    return (
        <Router>
            <Navbar /> {/* Ajoutez ceci pour inclure la barre de navigation */}
            <Routes>
                <Route path="/" element={<TicketList />} />
                <Route path="/add" element={<AddTicket />} />
                <Route path="/edit/:id" element={<EditTicket />} />
                <Route path="/view/:id" element={<ViewTicket />} />
                <Route path="/delete/:id" element={<DeleteTicket />} />
            </Routes>
        </Router>
    );
};

export default App;
