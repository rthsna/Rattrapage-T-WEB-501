const express = require('express');
const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.static('public'));

// Route de base
app.get('/', (req, res) => {
    res.send('JobBoard API - Projet T-WEB-501');
});

// Route de test
app.get('/api/test', (req, res) => {
    res.json({ message: 'API fonctionnelle' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});