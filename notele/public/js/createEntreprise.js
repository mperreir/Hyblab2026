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
  new Entreprise(1,"PME", "Alimentaire", "Ecofrost", [],false),
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
    entreprise_div.appendChild(entreprise_pin)

    const parentDiv = document.getElementById("pinLayer");
    const nextDiv = document.getElementById("V1");

  parentDiv.insertBefore(entreprise_div, nextDiv);
  i++;
});