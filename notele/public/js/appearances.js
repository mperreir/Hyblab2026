for (let i = 0; i < entreprises.length ;i++){
    if (entreprises[i].vu == true){
        const idTxt = "E" + String(i+1)
        const pin = document.getElementById(idTxt);
        pin.style.filter = "brightness(0) saturate(100%) invert(34%) sepia(14%) saturate(2266%) hue-rotate(210deg) brightness(95%) contrast(84%)";
    } 
}

function seePin(){
    
}