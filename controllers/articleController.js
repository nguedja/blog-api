const db = require("../config/database");


// 🟢 CREATE ARTICLE

exports.createArticle = (req, res) => {

    const { titre, contenu, auteur, categorie, tags } = req.body;

    if (!titre || !contenu || !auteur) {
        return res.status(400).json({
            message: "Titre, contenu et auteur obligatoires"
        });
    }

    const sql = `
        INSERT INTO articles 
        (titre, contenu, auteur, categorie, tags)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [titre, contenu, auteur, categorie, JSON.stringify(tags)],
        function (err) {

            if (err) {
                return res.status(500).json({
                    message: "Erreur création article"
                });
            }

            res.status(201).json({
                message: "Article créé",
                id: this.lastID
            });

        }
    );

};



// 🟢 GET ALL + FILTRES

exports.getAllArticles = (req, res) => {

    const { categorie, auteur, date } = req.query;

    let sql = `SELECT * FROM articles WHERE 1=1`;

    let params = [];

    if (categorie) {
        sql += ` AND categorie = ?`;
        params.push(categorie);
    }

    if (auteur) {
        sql += ` AND auteur = ?`;
        params.push(auteur);
    }

    if (date) {
        sql += ` AND date LIKE ?`;
        params.push(`${date}%`);
    }

    db.all(sql, params, (err, rows) => {

        if (err) {
            return res.status(500).json({
                message: "Erreur récupération articles"
            });
        }

        res.json(rows);

    });

};



// 🟢 GET BY ID

exports.getArticleById = (req, res) => {

    const id = req.params.id;

    db.get(
        `SELECT * FROM articles WHERE id = ?`,
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    message: "Erreur récupération article"
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: "Article non trouvé"
                });
            }

            res.json(row);

        }
    );

};



// 🟢 UPDATE

exports.updateArticle = (req, res) => {

    const id = req.params.id;

    const { titre, contenu, categorie, tags } = req.body;

    const sql = `
        UPDATE articles
        SET titre = ?, contenu = ?, categorie = ?, tags = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [titre, contenu, categorie, JSON.stringify(tags), id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    message: "Erreur modification"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Article non trouvé"
                });
            }

            res.json({
                message: "Article modifié"
            });

        }
    );

};



// 🟢 DELETE

exports.deleteArticle = (req, res) => {

    const id = req.params.id;

    db.run(
        `DELETE FROM articles WHERE id = ?`,
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    message: "Erreur suppression"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Article non trouvé"
                });
            }

            res.json({
                message: "Article supprimé"
            });

        }
    );

};



// 🟢 SEARCH

exports.searchArticles = (req, res) => {

    const query = req.query.query;

    const sql = `
        SELECT * FROM articles
        WHERE titre LIKE ? OR contenu LIKE ?
    `;

    db.all(
        sql,
        [`%${query}%`, `%${query}%`],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    message: "Erreur recherche"
                });
            }

            res.json(rows);

        }
    );

};