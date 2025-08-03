const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Route de base
app.get('/', (req, res) => {
    res.send('JobBoard API - Projet T-WEB-501');
});

// Route de test
app.get('/api/test', (req, res) => {
    res.json({ message: 'API fonctionnelle' });
});

// Route pour tester la connexion à la base de données
app.get('/api/db-test', (req, res) => {
    db.query('SELECT 1 as test', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur de connexion à la base de données' });
        }
        res.json({ message: 'Connexion à la base de données OK', results });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});