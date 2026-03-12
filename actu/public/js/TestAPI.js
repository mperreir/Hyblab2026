const API = "http://localhost:8080/actu/api"

async function init(){
    const liste = document.querySelector("#listFilm");

    await fetch(API + "/create-user", {
        method: "GET",
        credentials: "include"
    });

    const filmsResponse = await fetch(API + "/film-week", {
        method: "GET",
        credentials: "include"
    });

    const films = await filmsResponse.json();

    console.log(films);

    liste.innerHTML = films.map(f => `<li>${f.nom} (${f.date_sortie})</li>`).join('');
}

init();