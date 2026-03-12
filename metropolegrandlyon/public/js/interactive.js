const list_int = document.getElementsByClassName("interactive");

for(const int of list_int) {//On récupère chaque élément interactif de index.html
  int.addEventListener("click", () => {//A chaque clic sur un élément on affiche le Pop-Up avec le texte indiqué
    popUp(int.id)
  });
};


/**
 * Affiche un Pop-Up avec un texte correpondant à l'ID donné en paramètre
 */
function popUp(id){
  fetch('data/text.json')
  .then(response => response.json())
  .then(data => {
    const PopUp = document.getElementById('P');
    const PopUpTxt = document.getElementById('PopUpTxt');

    PopUpTxt.textContent = data[id];//On affecte le texte au PopUp
    PopUp.style.display = "block";//On affiche le Pop-Up

    //FERMER LE POP-UP
    const closeBtn = document.getElementById('close');

    closeBtn.onclick = () => PopUp.style.display = "none";
    window.onclick = (event) => {
      if (event.target == PopUp) PopUp.style.display = "none";
    };

  })
};