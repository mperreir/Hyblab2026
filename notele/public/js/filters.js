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
    const tagsSelectionnes = [...document.querySelectorAll("#GenZ_filters button.active")].map(i => i.value);
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

function surprise(){
    const chosenPinNumber = Math.floor(Math.random() * 15) + 1;
    entreprises.forEach((entreprise) =>{
        const entrepriseDiv = document.getElementById("E"+String(entreprise.id))
        if (entreprise.id == chosenPinNumber){
            showPin(entrepriseDiv);
        }else{
            hidePin(entrepriseDiv);
        }
    });
}

/*====================*/
/* TYPEWRITER
/*====================*/
const b5 = document.getElementById("B5");
const originalText = "Jobs pas comme les autres";
const emojiFrames = ["🚀", "🔮", "🎭", "🎪", "🍳", "🥋", "🎤", "🤖", "🎯", "🏆"];
const stepDelay = 200;
const pauseDelay = 0;
let timeout = null;

const letters = originalText.split("").map((c, i) => ({ char: c, index: i })).filter(c => c.char !== " ");
const chunkSize = Math.ceil(letters.length / emojiFrames.length);
const chunks = emojiFrames.map((_, e) => letters.slice(e * chunkSize, (e + 1) * chunkSize));

const buildText = (upTo) => {
    let result = "";
    let letterIndex = 0;
    for (let e = 0; e < emojiFrames.length; e++) {
        const chunk = chunks[e];
        if (!chunk.length) continue;
        const start = chunk[0].index;
        result += originalText.slice(letterIndex, start);
        result += e < upTo ? emojiFrames[e] : originalText.slice(start, chunk[chunk.length - 1].index + 1);
        letterIndex = chunk[chunk.length - 1].index + 1;
    }
    return result + originalText.slice(letterIndex);
};

const runForward = (step, textNode) => {
    textNode.textContent = buildText(step);
    if (step < emojiFrames.length) {
        timeout = setTimeout(() => runForward(step + 1, textNode), stepDelay);
    } else {
        timeout = setTimeout(() => runBackward(step, textNode), pauseDelay);
    }
};

const runBackward = (step, textNode) => {
    textNode.textContent = buildText(step - 1);
    if (step - 1 > 0) {
        timeout = setTimeout(() => runBackward(step - 1, textNode), stepDelay);
    } else {
        textNode.textContent = originalText;
    }
};

b5.addEventListener("mouseenter", () => {
    clearTimeout(timeout);
    const textNode = b5.childNodes[0];
    timeout = setTimeout(() => runForward(1, textNode), 0);
});

b5.addEventListener("mouseleave", () => {
    clearTimeout(timeout);
    b5.childNodes[0].textContent = originalText;
});
/*====================*/
/* TYPEWRITER
/*====================*/