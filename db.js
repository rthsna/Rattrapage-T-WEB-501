
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'job_board2025'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        process.exit(1);
    }
    console.log('Connexion à la base de données MySQL établie');
});

module.exports = db;