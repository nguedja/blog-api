const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin vers la base
const dbPath = path.resolve(__dirname, '../blog.db');

// Création connexion
const db = new sqlite3.Database(dbPath, (err) => {

    if (err) {
        console.error("Erreur connexion DB", err.message);
    } else {
        console.log("Connecté à SQLite");

        // Création table si elle n'existe pas
        db.run(`
            CREATE TABLE IF NOT EXISTS articles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titre TEXT NOT NULL,
                contenu TEXT NOT NULL,
                auteur TEXT NOT NULL,
                categorie TEXT,
                tags TEXT,
                date TEXT
            )
        `);
    }

});

module.exports = db;