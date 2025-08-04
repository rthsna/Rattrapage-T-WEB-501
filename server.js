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

// Routes pour les annonces
app.get('/api/annonce', (req, res) => {
    const sql = 'SELECT * FROM annonce';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/annonce/:id', (req, res) => {
    const adId = req.params.id;
    const sql = `SELECT * FROM annonce WHERE id = ?`;
    db.query(sql, [adId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Annonce non trouvée' });
        res.json(result[0]);
    });
});

app.post('/api/annonce', (req, res) => {
    const { titre, short_description, full_description, typecontrat, salaire, lieu, tpstravail, id_entreprise } = req.body;
    const sql = `INSERT INTO annonce (titre, short_description, full_description, typecontrat, salaire, lieu, tpstravail, id_entreprise) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [titre, short_description, full_description, typecontrat, salaire, lieu, tpstravail, id_entreprise], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Annonce créée avec succès', id: result.insertId });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});