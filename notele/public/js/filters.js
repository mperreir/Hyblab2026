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
            entrepriseDiv.style.display = "block";
        }else{
            entrepriseDiv.style.display = "none";
        }
    });
}