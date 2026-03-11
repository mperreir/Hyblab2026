'use strict';

const app = require( 'express' )();
const path = require('path');

// BASE DE DONNEES

const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

app.get('/init', async function ( req, res ) {
    initialisation();
    res.json({'Ok':true});
} );
// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );


// BASE DE DONNEES

async function initialisation(){
    const db = await open({
    filename: './actu/api/BDD/database.db',
    driver: sqlite3.Database
    })
    db.exec(`
    CREATE TABLE Utilisateur(
        id INTEGER PRIMARY KEY,
        token TEXT
    ) STRICT
    `); 
}

async function initialisation(){
    const db = await open({
    filename: './actu/api/BDD/database.db',
    driver: sqlite3.Database
    })
    db.exec(`
    CREATE TABLE Utilisateur(
        id INTEGER PRIMARY KEY,
        token TEXT
    ) STRICT
    `); 
}


// Export our API
module.exports = app;
