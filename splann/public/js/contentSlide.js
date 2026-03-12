const initContentSlide = async function (index) {

}    

const createEmptyContent = async function(){
    let response = await fetch('data/contaminationMiniere.json');
    const data = await response.json();
    const nVolet = data.nVolet;
    let nBullet = 0;

    const endSlide = document.querySelector("#credit-slide");
    const sliderWrapper = document.querySelector(".swiper-wrapper");

    let slide;
    for (let i = 0; i < nVolet; i++) {
        nBullet = data.volet[i].nBullet;
        for(let j=0; j < nBullet; j++){
            slide = document.createElement("section");
            slide.classList.add("swiper-slide")
            slide.id = "content-slide"

            // Ajout du contenu

            let bulletContent = data.volet[i].bullet[j]
            console.log(i)
            console.log(bulletContent)
            for(let k=0; k<bulletContent.length; k++){
                if(bulletContent[k].type == "title"){
                    let title = document.createElement("h3");
                    title.innerHTML = bulletContent[k].content
                    slide.appendChild(title)
                }
                else if(bulletContent[k].type == "paragraph"){
                    let paragraph = document.createElement("p");
                    paragraph.innerHTML = bulletContent[k].content
                    slide.appendChild(paragraph)
                }
                else if(bulletContent[k].type == "img"){
                    let img = document.createElement("img");
                    img.src = bulletContent[k].content
                    slide.appendChild(img)
                }
            }
            
            

            sliderWrapper.insertBefore(slide, endSlide);
            }
            let extend = document.createElement("section")
            extend.id = "extended-content"
            console.log(data.volet[i].extendedContent)

            for(let j = 0; j < data.volet[i].extendedContent.length; j++){
                extendedElmt = data.volet[i].extendedContent[j]

                if (extendedElmt.type == "text"){
                    let paragraph = document.createElement("p");
                    paragraph.innerHTML = extendedElmt.content
                    extend.appendChild(paragraph)
                }
                else if(extendedElmt.type == "img"){
                    let img = document.createElement("img");
                    img.src = extendedElmt.content
                    extend.appendChild(img)
                }
            }

            slide.appendChild(extend)

    }
}