'use strict';



const app = require( 'express' )();
const path = require('path');
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

app.use(cookieParser());


// VARIABLES - BASE DE DONNEES
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
let db;

// ROUTES API

app.get('/init', async function ( req, res ) {
    await initialisation();
    await test1();
    await test2();
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


app.get("/create-user", async (req,res)=>{

    let token = req.cookies.token;
    let user = null;

    console.log("Token : ",token);
    if(token){
        user = await GetUserByToken(token);
    }

    console.log(user);
    if(!user){
        console.log("Création de token chez le client");
        token = generateToken();

        await ajoutUtilisateur(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000*60*60*24*30
        });
    }

    res.json({status:"ok"});
});


function generateToken(){

    const token = crypto.randomBytes(32).toString("hex");

    return token;
}

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
    CREATE TABLE IF NOT EXISTS Utilisateur(
        id INTEGER PRIMARY KEY,
        token TEXT
    ) STRICT;

    CREATE TABLE IF NOT EXISTS Film (
        id INTEGER PRIMARY KEY,
        nom TEXT,
        affiche TEXT,
        bande_annonce TEXT,
        critique TEXT, 
        nb_etoile INTEGER,
        description TEXT, 
        realisateur TEXT,
        date_sortie TEXT
    ) STRICT ;

    CREATE TABLE IF NOT EXISTS FilmAime(
        id_film INTEGER,
        id_utilisateur INTEGER,
        PRIMARY KEY (id_film, id_utilisateur)
    ) STRICT;


    CREATE TABLE IF NOT EXISTS Acteur(
        id INTEGER PRIMARY KEY, 
        nom TEXT, 
        prenom TEXT
    );

    CREATE TABLE IF NOT EXISTS FilmActeur(
        id_film INTEGER,
        id_acteur INTEGER,
        PRIMARY KEY (id_film, id_acteur)
    );

    CREATE TABLE IF NOT EXISTS FilmCoupDeCoeur(
        id_film INTEGER PRIMARY KEY,
        date TEXT
    );
    `); 
}

async function test1(){
    // Données tests généré par IA
    const user1 = await GetUserById(1);

    if(!user1){
        // Utilisateurs
        await ajoutUtilisateur("token_user_1");
        await ajoutUtilisateur("token_user_2");
        await ajoutUtilisateur("token_user_3");
        await ajoutUtilisateur("token_user_4");


        // Acteurs
        await ajoutActeur("Downey", "Robert");
        await ajoutActeur("Evans", "Chris");
        await ajoutActeur("Holland", "Tom");
        await ajoutActeur("DiCaprio", "Leonardo");


        // Films
        await ajoutFilm(
            "Iron Man",
            "ironman.jpg",
            "https://youtube.com/ironman",
            "Excellent film Marvel",
            5,
            "Tony Stark construit une armure pour devenir Iron Man",
            "Jon Favreau",
            "2024-05-01"
        );

        await ajoutFilm(
            "Avengers",
            "avengers.jpg",
            "https://youtube.com/avengers",
            "Super film d'équipe",
            5,
            "Les héros Marvel s'unissent",
            "Joss Whedon",
            "2024-05-01"
        );

        await ajoutFilm(
            "Spider-Man",
            "spiderman.jpg",
            "https://youtube.com/spiderman",
            "Très divertissant",
            4,
            "Peter Parker devient Spider-Man",
            "Jon Watts",
            "2024-06-01"
        );


        // Relations film-acteur
        await ajoutFilmActeur(1,1); // Iron Man - Robert Downey Jr
        await ajoutFilmActeur(2,1); // Avengers - Downey
        await ajoutFilmActeur(2,2); // Avengers - Chris Evans
        await ajoutFilmActeur(3,3); // Spiderman - Tom Holland


        // Likes utilisateurs
        await ajoutFilmAime(1,1);
        await ajoutFilmAime(1,2);
        await ajoutFilmAime(2,1);
        await ajoutFilmAime(2,3);
        await ajoutFilmAime(3,4);
    }

    
}

async function test2(){

    const { last_date } = await GetLastDate();
    const films = await GetFilmsByDate(last_date);
    const filmsCoeur = await GetFilmsCoupDeCoeurByDate(last_date);
    const classement = await GetClassement(last_date);
    const user = await GetUserById(2);
    const like = await GetLikeByUserId(2);
    const acteurs = await GetActeursByFilm(1);

    console.log("Derniers films : ",films);
    console.log("Film Coup de Coeur : ",filmsCoeur);
    console.log("Classement : ",classement);
    console.log("Utilisateur 2 : ",user);
    console.log("Like de l'utilisateur 2 : ",like);
    console.log("Acteurs du film 1: ",acteurs);
}

// ======================
// == GET INSTRUCTIONS ==
// ======================

async function GetLastDate(){
    const db = await getDB();
    
    const query = `
        SELECT max(date_sortie) as last_date from Film
    `;

    const result = await db.get(query, []);

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


// =========================
// == INSERT INSTRUCTIONS ==
// =========================

async function ajoutUtilisateur(token){
    const db = await getDB();

    const insert = db.run(`
        INSERT INTO Utilisateur (token) VALUES (?)
    `,[token]);

}

async function ajoutFilmAime(id_film, id_utilisateur){
    const db = await getDB();

    const insert = db.run(`
        INSERT INTO FilmAime (id_film, id_utilisateur) VALUES (?,?)
    `,[id_film, id_utilisateur]);

}

async function ajoutFilm(nom, affiche, bande_annonce, critique, nb_etoile, description, realisateur, date_sortie){
    const db = await getDB();
    
    const insert = db.run(`
        INSERT INTO Film (nom, affiche, bande_annonce, critique, nb_etoile, description, realisateur, date_sortie) VALUES (?,?,?,?,?,?,?,?)
    `,[nom, affiche, bande_annonce, critique, nb_etoile, description, realisateur, date_sortie]);

}

async function ajoutActeur(nom, prenom){
    const db = await getDB();

    const insert = db.run(`
        INSERT INTO Acteur (nom, prenom) VALUES (?,?)
    `,[nom,prenom]);
    

}

async function ajoutFilmActeur(id_film, id_acteur){
    const db = await getDB();

    const insert = db.run(`
        INSERT INTO FilmActeur (id_film, id_acteur) VALUES (?,?)
    `,[id_film,id_acteur]);

}

async function ajoutFilmCoupDeCoeur(id_film, date){
    const db = await getDB();

    const insert = db.run(`
        INSERT INTO Film (id_film, date) VALUES (?,?)
    `,[id_film,date]);
    

}





// Export our API
module.exports = app;
