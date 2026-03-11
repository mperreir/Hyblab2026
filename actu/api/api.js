'use strict';

const app = require( 'express' )();
const path = require('path');

// BASE DE DONNEES

const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

let db;

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

async function getDB(){
    if(!db){
        db = await open({
            filename: './actu/api/BDD/database.db',
            driver: sqlite3.Database
        })
    }
    return db;
}

async function initialisation(){
    const db = await getDB();
    db.exec(`
    CREATE TABLE Utilisateur(
        id INTEGER PRIMARY KEY,
        token TEXT
    ) STRICT
    `); 
}

// ======================
// == GET INSTRUCTIONS ==
// ======================

async function GetLastDate(){
    const db = await getDB();
    
    const query = `
        SELECT max(date_sortie) as last_date from Film
    `;

    const result = await db.all(query, []);

    return result;
}

// --- FILMS --- 

async function GetFilmsByDate(date){
    const db = await getDB();
    
    const query = `
        SELECT * FROM Film WHERE date_sortie = ?
    `;
    const result = await db.all(query, [date]);

    return result;
}

async function GetFilmsCoupDeCoeurByDate(date){
    const db = await getDB();
    
    const query = `
        SELECT * FROM FilmCoupDeCoeur FC JOIN Film F ON FC.id_film = F.id WHERE date_sortie = ?
    `;
    const result = await db.get(query, [date]);

    return result;
}

async function GetClassement(date){
    const db = await getDB();
    
    const query = `
        SELECT F.nom, COUNT(FA.id_utilisateur) as nb_likes
        FROM film F
        JOIN FilmAime FA ON F.id = FA.id_film
        WHERE F.date_sortie = ?
        GROUP BY F.id
        ORDER BY nb_likes DESC
    `;

    const result = await db.all(query, [date]);

    return result;
}

// --- USER --- 

async function GetUserById(id){
    const db = await getDB();
    
    const query = `
        SELECT * FROM Utilisateur WHERE id = ?
    `;

    const result = await db.get(query, [id]);

    return result;
}


async function GetLikeByUserId(userid){
    const db = await getDB();
    
    const query = `
        SELECT F.* FROM FilmAime FA JOIN Film F on FA.id_film = F.id WHERE FA.id_utilisateur = ?
    `;

    const result = await db.all(query, [userid]);

    return result;
}


// --- ACTEUR ---

async function GetActeursByFilm(idFilm){
    const db = await getDB();
    
    const query = `
        SELECT * FROM FilmActeur FA JOIN Acteur A ON FA.id_acteur = A.id WHERE FA.id_film = ? 
    `;

    const result = await db.all(query, [idFilm]);

    return result;
}

// Export our API
module.exports = app;
