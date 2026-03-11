"use strict";

// async init function (because of the awaits on fetches)
const initPageProjet = async function(){

  
  // Retrieve the partner's topic from our API
  let response = await fetch('api/topic');
  const data1 = await response.json();

  const titre = document.getElementById('titre');
  titre.textContent = `Our topic is "${data1.topic}".`;
};