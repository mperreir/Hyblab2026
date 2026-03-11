'use strict';
const sqlite3 = require('sqlite3').verbose();
const app = require( 'express' )();
const path = require('path');

const dbPath = path.join(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erreur de connexion SQLite :", err.message);
    } else {
        console.log("API connectée à la base de données SQLite.");
    }
});

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

// GET ARTICLES/
app.get('/articles', function ( req, res ) {
    // Get the database connection from the server
    //const db = require('../server').db;

    // Query the database for all articles
    db.all(`SELECT "ID", "Title", "Date", "Permalink", "Image URL", "Image Title", 
                "Image Alt Text", "Image Featured", "Attachment URL", "Catégories", "Étiquettes", categorie_tag,
                "_post_review_box_title", "_yoast_wpseo_primary_category", "_yoast_wpseo_estimated-reading-time-minutes", 
                "_yoast_wpseo_content_score", "_yoast_wpseo_metadesc", "_latlngmarker", "Slug", "Post Modified Date" FROM articles`, [], (err, rows) => {
        if (err) {
            console.error('Error fetching articles:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Rows:', rows);
            res.json(rows);
        }
    });
} );

// GET ARTICLES/:category 
app.get('/articles/:category', function ( req, res ) {
    const category = req.params.category;

    if (!["Initiative personnelle/quotidienne", "Entrepreneuriat", "Collectifs", "Service publique"].includes(category)){
        res.status(400).json({ error: 'Invalid category' });
        return;
    }

    db.all(`SELECT "ID", "Title", "Date", "Permalink", "Image URL", "Image Title", 
                "Image Alt Text", "Image Featured", "Attachment URL", "Étiquettes", "categorie_tag",
                "_post_review_box_title", "_yoast_wpseo_primary_category", "_yoast_wpseo_estimated-reading-time-minutes", 
                "_yoast_wpseo_content_score", "_yoast_wpseo_metadesc", "_latlngmarker", "Slug", "Post Modified Date" 
                FROM articles WHERE "categorie_tag" LIKE ?`, `%${category}%`, (err, rows) => {
        if (err) {
            console.error('Error fetching articles by category:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(rows);
            res.json(rows);
        }
    });
} );


app.get('')

// Export our API
module.exports = app;
