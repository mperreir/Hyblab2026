"use strict"

window.scrollTo(0, 0);


const affiches = document.querySelector(".affiches");

const zone_pour = document.querySelector(".zoon_pour");
const zone_contre = document.querySelector(".zoon_contre");

const film_cards = [];
// generate affiche

const nb_card = 13;
let nb_tours = Math.round(Math.random() * 30 + 10);
const distance = 200;




function degtoscale(angle) {
  const scalemax = 3;
  const scalemin = 0.3;

  return ((Math.cos(angle) * distance + distance) * (scalemax - scalemin) / (distance * 2) + scalemin)
}



[...Array(nb_card).keys()].forEach((index) => {

  const section = createCard(
    "LE RETOUR DU PROJECTIONNISTE",
    "Documentaire",
    "Orkhan Aghazadeh",
    "Un vieil homme propose de faire revivre le cinéma dans son village."
  );

  film_cards.push(section)


  affiches.appendChild(section)
})


//anmation card
film_cards.forEach((card) => {
  const front = card.querySelector(".affiche_front");
  const back = card.querySelector(".affiche_back");
  const tl = gsap.timeline({ paused: true })
    .to(front, { duration: 1, rotationY: 180 })
    .to(back, { duration: 1, rotationY: 0 }, 0)

  card.addEventListener("click", function () {
    if (tl.progress() === 0) {
      tl.play();
    } else {
      tl.reverse();
    }
  });

})


console.log("---------------")
console.log(film_cards)
film_cards.sort(() => Math.random() - 0.5)
console.log(film_cards)
console.log("---------------")

const rect_poss = Array(nb_card)
let timelinesRestantes = 0;
film_cards.forEach((elem, index) => {
  rect_poss[index] = elem.getBoundingClientRect();
})


setTimeout(function () {

  window.scrollTo(0, 0);

  film_cards.forEach((elem, index) => {


    const angle = ((2 * Math.PI) / film_cards.length) * index


    // console.log(angle * 360 / (Math.PI*2))
    // console.log(Math.sin(angle)*distance +(window.innerHeight/2))

    const rect = rect_poss[index]

    gsap.set(affiches, {
      margin: 0,
    })

    gsap.set(elem, {
      position: "absolute",
      x: rect.left,
      y: rect.top,
      top: 0,
      left: 0
    });

    timelinesRestantes += 1
    const t1 = gsap.timeline({ ease: Linear })
    .eventCallback("onComplete", () => {
        timelinesRestantes--; // une timeline est finie
        if(timelinesRestantes === 0){
            // Toutes les timelines sont terminées
            console.log("Tout est fini !");
            observer(); // votre fonction
        }
    });


    t1.to(elem, {
      delay: Math.random(),
      duration: 2,
      y: rect.top - 50
    })
      .to(elem, {
        duration: 1,
        y: Math.sin(angle) * distance + (window.innerHeight / 2),
        z: Math.cos(angle) * distance,
        x: (window.innerWidth / 2),
        scale: degtoscale(angle),
        xPercent: -50,
        yPercent: -50,
      }, 3)

      ;[...Array(nb_tours).keys()].forEach(decalage => {
        decalage = decalage + 1;
        const angle = ((2 * Math.PI) / film_cards.length) * ((index + decalage) % film_cards.length)

        t1.to(elem, {
          duration: 0.5 * (decalage / nb_tours) / 2,
          y: Math.sin(angle) * distance + (window.innerHeight / 2),// + window.innerHeight/2,
          z: Math.cos(angle) * distance,
          x: (window.innerWidth / 2),
          scale: degtoscale(angle),
          xPercent: -50,
          yPercent: -50,
        })
      })




    if ((index + nb_tours) % film_cards.length == 0) {
      t1.to(elem, {
        duration: 1,
        x: window.innerWidth / 2 - 100,
      }, "+=0")
        .to(zone_contre, {
          duration: 1,
          "--transparance_contre": "100%"
        }, "<")
        .to(elem, {
          duration: 1,
          x: window.innerWidth / 2,
        }, "+=0")
        .to(zone_contre, {
          duration: 1,
          "--transparance_contre": "70%"
        }, "<")

        .to(elem, {
          duration: 1,
          x: window.innerWidth / 2 + 100,
        }, "+=0")
        .to(zone_pour, {
          duration: 1,
          "--transparance_pour": "0%"
        }, "<")
        .to(elem, {
          duration: 1,
          x: window.innerWidth / 2,
        }, "+=0")
        .to(zone_pour, {
          duration: 1,
          "--transparance_pour": "30%"
        }, "<")
    }


  })

}, 2000);



///////////////////////

// const img = document.getElementById("img");
// const card = document.getElementById("card");

// img.onload = () => {
//   const colorThief = new ColorThief();
//   const color = colorThief.getColor(img);

//   card.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
// };







//



console.log("nb_tours = ", nb_tours)
console.log("correcte = ", (film_cards.length + (-nb_tours) % film_cards.length) % film_cards.length)
console.log(film_cards)

film_cards[(film_cards.length + (-nb_tours) % film_cards.length) % film_cards.length].setAttribute("style", "border:3px solid red;")


function observer() {
  gsap.registerPlugin(Observer);

  let decalageY = 0.0
  Observer.create({
    target: window,
    type: "touch",
    debounce: true,

    onChangeY(self) {

      decalageY += self.deltaY / 200;

      film_cards.forEach((elem, index) => {
        const angle = (((2 * Math.PI) / film_cards.length) * ((index + nb_tours) % film_cards.length)) + decalageY
        gsap.set(elem, {
          y: Math.sin(angle) * distance + (window.innerHeight / 2),
          z: Math.cos(angle) * distance,
          scale: degtoscale(angle),

        });
      })
    },

    onRelease() {

      const curent_index = (film_cards.length + (-nb_tours) % film_cards.length) % film_cards.length

      const ang = (((2 * Math.PI) / film_cards.length) * ((curent_index + nb_tours) % film_cards.length)) + decalageY
      const degangle = Math.round(ang * 180 / Math.PI)


      const censibiliter = 10

      console.log("degangle : ", degangle)
      console.log("25%", degangle / (censibiliter * 2))

      if (degangle > censibiliter) {
        nb_tours += 1 //Math.round(degangle / (censibiliter * 2))
      }
      else if (degangle < -censibiliter) {
        nb_tours -= 1 //Math.round(-degangle / (censibiliter * 2))
      }
      console.log(nb_tours)

      decalageY = 0;

      film_cards.forEach((elem, index) => {
        const angle = (((2 * Math.PI) / film_cards.length) * ((index + nb_tours) % film_cards.length))

        gsap.to(elem, {
          duration: 0.2,
          y: Math.sin(angle) * distance + (window.innerHeight / 2),
          z: Math.cos(angle) * distance,
          scale: degtoscale(angle),
        });

      })
    }


  });


  gsap.registerPlugin(Observer)

  let decalageX = 0;

  Observer.create({
    target: window,
    type: "pointer,touch",
    dragMinimum: 5,

    onChangeX(self) {
      decalageX += self.deltaX
      const curent_elem = (film_cards.length + (-nb_tours) % film_cards.length) % film_cards.length
      gsap.set(film_cards[curent_elem], {
        x: decalageX + window.innerWidth / 2,
      })

      gsap.set(zone_contre, {
        "--transparance_contre": ((100-70)*(decalageX/window.innerWidth)+70)
      })
    },

    onRelease() {
      if (decalageX > 250) {
        decalageX = window.innerWidth /2 + 100;
        console.log("DROIT")
      }
      else if (decalageX < -250) {
        decalageX = -window.innerWidth /2 -100;
        console.log("GAUCHE")
      }else{
        decalageX = 0;

      }

      console.log("decalageX",decalageX)

      const curent_index = (film_cards.length + (-nb_tours) % film_cards.length) % film_cards.length

      gsap.to(film_cards[curent_index], {
        duration : 0.2,
        x: decalageX + window.innerWidth / 2,
        onComplete(){
          decalageX = 0;
        }
      })
    }
  })
}