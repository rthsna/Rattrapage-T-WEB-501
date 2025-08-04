const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
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

// Routes d'authentification
app.post('/api/register', (req, res) => {
    const { nom, prenom, email, password, telephone, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });
    
    const hash = bcrypt.hashSync(password, 10);
    const sql = 'INSERT INTO people (nom, prenom, email, password, telephone, role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nom, prenom, email, hash, telephone, role || 'user'], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Inscription réussie', id: result.insertId });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });
    
    const sql = 'SELECT * FROM people WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'Utilisateur non trouvé' });
        
        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }
        
        delete user.password;
        res.json({ message: 'Connexion réussie', user });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});