class Entreprise {
  id;
  nom;
  taille;
  secteur;
  tags;
  vu;  

  constructor(id,taille,secteur,nom,tags,vu) {
    this.id = id;
    this.taille = taille;
    this.secteur = secteur;
    this.nom = nom;
    this.tags = tags;
    this.vu = vu;

  }
}

function restaurerVus() {
    const vus = JSON.parse(localStorage.getItem("entreprises_vus"));
    if (vus) {
        vus.forEach((vu, i) => entreprises[i].vu = vu);
    }
}

function sauvegarderVus() {
    const vus = entreprises.map(e => e.vu);
    localStorage.setItem("entreprises_vus", JSON.stringify(vus));
}

let entreprises = [
  new Entreprise(1,"Grande entreprise", "Alimentaire", "Ecofrost", [],false),
  new Entreprise(2,"PME", "Tech", "Red System", ["Jobs pas comme les autres"],false),
  new Entreprise(3,"PME", "Alimentaire", "Storme", ["Affaire de famille"],false),
  new Entreprise(4,"Independant", "Alimentaire", "Les Glaces d'Élodie", [],false),
  new Entreprise(5,"PME", "Agriculture", "Moulin de Moulbaix", ["Affaire de famille"],false),
  new Entreprise(6,"Grande entreprise", "Commerce", "Famiflora", [],false),
  new Entreprise(7,"PME", "Art", "Atlantis Security", ["Jobs pas comme les autres"],false),
  new Entreprise(8,"PME", "Art", "Les Camuches", [],false),
  new Entreprise(9,"Independant", "Agriculture", "Mother Flower", ["Boss ladies"],false),
  new Entreprise(10,"PME", "Tech", "Technord", [],false),
  new Entreprise(11,"PME", "Alimentaire", "Six Fumaison", ["Jobs pas comme les autres"],false),
  new Entreprise(12,"PME", "Agriculture", "Domaine Degavre", ["Jobs pas comme les autres"],false),
  new Entreprise(13,"Independant", "Commerce", "Doc Phone", ["Jobs pas comme les autres"],false),
  new Entreprise(14,"PME", "Tech", "MyQM", ["Plot twist"],false),
  new Entreprise(15,"Independant", "Art", "Hélène Création", ["Boss ladies"],false),
];
restaurerVus();

const pins = {  "Alimentaire" : "./img/pin_Alimentaire.svg", "Tech" : "./img/pin_tech.svg", "Agriculture" : "./img/pin_agriculture.svg",
                "Art" : "./img/pin_art.svg", "Commerce" : "./img/pin_commerce.svg", "Industrie" : "./img/pin_industrie.svg",
                "Sante" : "./img/pin_sante.svg",};

var i = 1;
entreprises.forEach((entreprise) => {
    const entreprise_div = document.createElement("div");
    entreprise_div.id = "E" + String(i);
    entreprise_div.className = "entreprisePin Pin"

    const entreprise_pin = document.createElement("img");
    entreprise_pin.alt = "Pin entreprise " + entreprise.nom;
    entreprise_pin.src = pins[entreprise.secteur];

    if (entreprise.secteur == "Commerce" || entreprise.secteur == "Art"){
        entreprise_pin.style.scale = "0.875";
    }else if (entreprise.secteur == "Tech"){
        entreprise_pin.style.scale = "0.9";
    }

    const wrapper = document.createElement("span");
    wrapper.classList.add("pin-anim");
    wrapper.appendChild(entreprise_pin);
    entreprise_div.appendChild(wrapper);

    const parentDiv = document.getElementById("pinLayer");
    const nextDiv = document.getElementById("V1");

  parentDiv.insertBefore(entreprise_div, nextDiv);
  i++;
});

window.addEventListener("load", () => {
    const pins = document.querySelectorAll(".pin-anim");
    pins.forEach((anim, index) => {
        setTimeout(() => {
            void anim.offsetWidth;
            anim.classList.add("visible");
        }, 200 + index * 20); // 80ms entre chaque pin
    });
});

window.addEventListener("load", () => {
    const buttons = document.querySelectorAll("#GenZ_filters button");
    const total = buttons.length;
    
    // Cache tous les boutons au départ
    buttons.forEach(btn => btn.classList.add("avant-chute"));

    buttons.forEach((btn, index) => {
        setTimeout(() => {
            btn.classList.remove("avant-chute"); // rend visible
            btn.classList.add("visible");         // lance l'animation
            btn.addEventListener("animationend", () => {
                btn.classList.remove("visible");  // retire l'animation
                // opacity reste à 1 car .avant-chute est retirée
            }, { once: true });
        }, 850 + (total - 1 - index) * 120);
    });
});