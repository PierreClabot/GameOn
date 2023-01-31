function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalConfirmation = document.querySelector(".modal-confirmation");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector(".close");
// const submitFormulaire = document.querySelector(".btn-submit");

// Champs formulaire
// const prenom = ;
// const nom = document.querySelector("#last");
// const email = document.querySelector("#email");
// const dateDeNaissance = document.querySelector("#birthdate");
// const nbTournoisParticipes = document.querySelector("#quantity");

// Vérification quand on quitte de l'input


// close modal
close.addEventListener("click",closeModal)

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal(){
  modalbg.style.display = "none";
  modalConfirmation.style.display = "none";
}


