function createFrontCard(nom){
    const section = document.createElement("section");
  section.classList.add("film");

  const front_div = document.createElement("div");
  front_div.classList.add("affiche_front");

  const affiche = document.createElement("img");
  affiche.setAttribute("src", "./img/background.svg");

  front_div.appendChild(affiche);
  section.appendChild(front_div);

  return section;
}

function createEndCard(nom,critique){
    const section = document.createElement("section");
    section.classList.add("film");


    const affiche = document.createElement("img");
    affiche.setAttribute("src", "./img/background.svg");

    const back_div = document.createElement("div");
    back_div.classList.add("affiche_back");

    const film_title = document.createElement("h2");
    film_title.innerText = nom;
    const film_text = document.createElement("p");
    film_text.innerText =critique;

    back_div.appendChild(film_title);
    back_div.appendChild(film_text);

    section.appendChild(back_div);

    return section
}

function createCard(nom,critique){
  const section = document.createElement("section");
  section.classList.add("film");

  const front_div = document.createElement("div");
  front_div.classList.add("affiche_front");

  const affiche = document.createElement("img");
  affiche.setAttribute("src", "./img/background.svg");

  front_div.appendChild(affiche);

  const back_div = document.createElement("div");
  back_div.classList.add("affiche_back");

  const film_title = document.createElement("h2");
  film_title.innerText = nom;
  const film_text = document.createElement("p");
  film_text.innerText =critique;

  back_div.appendChild(film_title);
  back_div.appendChild(film_text);

  section.appendChild(front_div);
  section.appendChild(back_div);

  const tl = gsap.timeline({ paused: true })
    .to(front_div, { duration: 1, rotationY: 180 })
    .to(back_div, { duration: 1, rotationY: 0 }, 0)

  section.addEventListener("click", function () {
    if (tl.progress() === 0) {
      tl.play();
    } else {
      tl.reverse();
    }
  });

  return section;
}

const affiches = document.querySelector(".affiches");

for(let i=0;i<5;i++){
  const div = document.createElement('div');
  div.appendChild(createFrontCard("HEY"));
  div.appendChild(createEndCard("HEY","Oui."));
  
  div.classList.add("container");
  affiches.appendChild(div);

}

document.getElementById("btnExport").addEventListener("click", () => {
  const element = document.getElementById("affiches");

  html2canvas(element).then(canvas => {
    // Convertit le canvas en image
    const imgData = canvas.toDataURL("image/png");

    // Crée un lien pour télécharger
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "capture.png";
    link.click();
  });
});
