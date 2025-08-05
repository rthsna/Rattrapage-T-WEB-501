const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'job_board2025'
});

db.connect(err => {
    if (err) {
        process.exit(1);
    }
});

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
      if (result.length === 0) return res.status(404).json({ message: 'annonce non trouvée' });
      res.json(result[0]);
  });
});

app.post('/api/annonce', (req, res) => {
  const { titre, short_description, full_description, typecontrat, salaire, lieu, tpstravail, id_entreprise } = req.body;
  const sql = `INSERT INTO annonce (titre, short_description, full_description, typecontrat, salaire, lieu, tpstravail, id_entreprise) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [titre, short_description, full_description, typecontrat, salaire, lieu, tpstravail, id_entreprise], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'annonce crée avec succès', id: result.insertId });
  });
});

app.put('/api/annonce/:id', (req, res) => {
  const adId = req.params.id;
  const {titre, short_description, full_description, typecontrat, salaire, lieu, tpstravail, id_entreprise } = req.body;
  const sql = `UPDATE annonce
               SET titre = ?, short_description = ?, full_description = ?, typecontrat = ?, salaire = ?, lieu = ?, tpstravail = ?, id_entreprise = ?
               WHERE id = ?`;
  db.query(sql, [titre, short_description, full_description, typecontrat, salaire, lieu, tpstravail, id_entreprise, adId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'annonce mise à jour avec succès' });
  });
});

app.delete('/api/annonce/:id', (req, res) => {
  const adId = req.params.id;
  const sql = `DELETE FROM annonce WHERE id = ?`;
  db.query(sql, [adId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Annonce supprimée succès' });
  });
});

app.get('/api/companies', (req, res) => {
  const sql = 'SELECT * FROM companies';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/companies/:id', (req, res) => {
  const companyId = req.params.id;
  const sql = 'SELECT * FROM companies WHERE id = ?';
  db.query(sql, [companyId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Entreprise non trouvée' });
    res.json(result[0]);
  });
});

app.post('/api/companies', (req, res) => {
  const { name, description, location } = req.body;
  const sql = 'INSERT INTO companies (name, description, location) VALUES (?, ?, ?)';
  db.query(sql, [name, description, location], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Entreprise créée avec succès', id: result.insertId });
  });
});

app.put('/api/companies/:id', (req, res) => {
  const companyId = req.params.id;
  const { name, description, location } = req.body;
  const sql = 'UPDATE companies SET name = ?, description = ?, location = ? WHERE id = ?';
  db.query(sql, [name, description, location, companyId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Entreprise mise à jour avec succès' });
  });
});

app.delete('/api/companies/:id', (req, res) => {
  const companyId = req.params.id;
  const sql = 'DELETE FROM companies WHERE id = ?';
  db.query(sql, [companyId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Entreprise supprimée avec succès' });
  });
});

app.get('/api/people', (req, res) => {
  const sql = 'SELECT * FROM people';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/people/:id', (req, res) => {
  const personId = req.params.id;
  const sql = 'SELECT * FROM people WHERE id = ?';
  db.query(sql, [personId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(result[0]);
  });
});

app.post('/api/people', (req, res) => {
  const { nom, prenom, email, password, telephone, role } = req.body;
  const sql = 'INSERT INTO people (nom, prenom, email, password, telephone, role) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nom, prenom, email, password, telephone, role], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Utilisateur créé avec succès', id: result.insertId });
  });
});

app.put('/api/people/:id', (req, res) => {
  const personId = req.params.id;
  const { nom, prenom, email, password, telephone, role } = req.body;
  const sql = 'UPDATE people SET nom = ?, prenom = ?, email = ?, password = ?, telephone = ?, role = ? WHERE id = ?';
  db.query(sql, [nom, prenom, email, password, telephone, role, personId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Utilisateur mis à jour avec succès' });
  });
});

app.delete('/api/people/:id', (req, res) => {
  const personId = req.params.id;
  const sql = 'DELETE FROM people WHERE id = ?';
  db.query(sql, [personId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Utilisateur supprimé avec succès' });
  });
});

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

app.get('/api/applications', (req, res) => {
  const sql = 'SELECT * FROM applications';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/applications/:id', (req, res) => {
  const appId = req.params.id;
  const sql = 'SELECT * FROM applications WHERE id = ?';
  db.query(sql, [appId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: 'Candidature non trouvée' });
    res.json(result[0]);
  });
});

app.post('/api/applications', (req, res) => {
  const { id_personne, id_advertisement, message } = req.body;
  const sql = 'INSERT INTO applications (id_personne, id_advertisement, message) VALUES (?, ?, ?)';
  db.query(sql, [id_personne, id_advertisement, message], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Candidature créée avec succès', id: result.insertId });
  });
});

app.put('/api/applications/:id', (req, res) => {
  const appId = req.params.id;
  const { id_personne, id_advertisement, message } = req.body;
  const sql = 'UPDATE applications SET id_personne = ?, id_advertisement = ?, message = ? WHERE id = ?';
  db.query(sql, [id_personne, id_advertisement, message, appId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Candidature mise à jour avec succès' });
  });
});

app.delete('/api/applications/:id', (req, res) => {
  const appId = req.params.id;
  const sql = 'DELETE FROM applications WHERE id = ?';
  db.query(sql, [appId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Candidature supprimée avec succès' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Serveur lancé sur le port 3000');
});