function hidePin(entrepriseDiv) {
    const anim = entrepriseDiv.querySelector(".pin-anim");
    anim.classList.remove("visible");
    anim.classList.add("hiding");
    anim.addEventListener("transitionend", () => {
        if (anim.classList.contains("hiding")) {
            entrepriseDiv.style.display = "none";
        }
    }, { once: true });
}

function showPin(entrepriseDiv) {
    const anim = entrepriseDiv.querySelector(".pin-anim");
    entrepriseDiv.style.display = "block";
    anim.classList.remove("hiding");
    void anim.offsetWidth;
    anim.classList.add("visible");
}

function filter(e){
    if (e.target.tagName === "BUTTON"){
        e.target.classList.toggle("active")
    }

    const taillesSelectionnees = [...document.querySelectorAll("#tailleDropdown input:checked")].map(i => i.value);
    const secteursSelectionnes = [...document.querySelectorAll("#secteurDropdown input:checked")].map(i => i.value);
    const tagsSelectionnes = [...document.querySelectorAll("#GenZ_filters button.active")].map(i => i.innerHTML);
    const includesAny = (arr, values) => values.length === 0 || values.some(v => arr.includes(v));

    entreprises.forEach((entreprise) => {
        const entrepriseDiv = document.getElementById("E"+String(entreprise.id))
        if (includesAny(entreprise.secteur,secteursSelectionnes) && includesAny(entreprise.taille,taillesSelectionnees) && includesAny(entreprise.tags, tagsSelectionnes)){
            showPin(entrepriseDiv);
        }else{
            hidePin(entrepriseDiv);
        }
    });
}