
import axios from 'axios';

// Crée une instance d'Axios avec la configuration de base
const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/', // Utilisé pour accéder au backend depuis Docker
    timeout: 5000, // Délai d'attente (5 secondes)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Gestionnaire d'intercepteurs pour les erreurs (optionnel)
api.interceptors.response.use(
    (response) => response, // Passe les réponses réussies
    (error) => {
        console.error('Erreur API:', error.response || error.message);
        return Promise.reject(error); // Retourne l'erreur pour que le frontend la gère
    }
);

export default api;
