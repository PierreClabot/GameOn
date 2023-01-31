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
const submitFormulaire = document.querySelector(".btn-submit");

// Champs formulaire
const prenom = document.querySelector("#first");
const nom = document.querySelector("#last");
const email = document.querySelector("#email");
const dateDeNaissance = document.querySelector("#birthdate");
const nbTournoisParticipes = document.querySelector("#quantity");

// Vérification quand on quitte de l'input
prenom.addEventListener('focusout',()=>{
  fctVerifNomPrenom("prénom",prenom);
})

nom.addEventListener('focusout',()=>{
  fctVerifNomPrenom("nom",nom);
})

email.addEventListener('focusout',()=>{
  fctVerifEmail(email);
})

dateDeNaissance.addEventListener('focusout',()=>{
  fctVerifDateNaissance(dateDeNaissance);
})

nbTournoisParticipes.addEventListener('focusout',()=>{
  fctVerifTournoisParticipes(nbTournoisParticipes);
})


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function validate(){
  // On récupère les saisies


  const inputLocation = document.querySelectorAll("input[name=location]");

  let inputTournoi = '';
  for(let i=0;i<inputLocation.length;i++)
  {
    if(inputLocation[i].checked)
    {
      inputTournoi = inputLocation[i];
    }
  }

  const inputCondition = document.querySelector("#checkbox1");

  let boolVerifPrenom = fctVerifNomPrenom("prénom",prenom);
  let boolVerifNom = fctVerifNomPrenom("nom",nom);
  let boolVerifEmail = fctVerifEmail(email);
  let boolVerifDateNaissance = fctVerifDateNaissance(dateDeNaissance);
  let boolVerifTournois = fctVerifTournoisParticipes(nbTournoisParticipes);
  let boolVerifLocation = fctVerifInputLocation(inputTournoi);
  let boolVerifConditions = fctVerifConditionsUtilisation(inputCondition);

  
  if(boolVerifPrenom && boolVerifNom && boolVerifEmail && boolVerifDateNaissance && boolVerifTournois && boolVerifLocation && boolVerifConditions ) // Un des champs n'est pas complété
  {
    // On traite les informations côté backend
    modalConfirmation.style.display = "flex";
    
  }

  return false;
  
}

function fctVerifNomPrenom(champs,saisie)
{
  let erreur = "";
  let verification = true;
  if(saisie.value.length <2)
  {
    erreur = `<span class=erreur >Votre ${champs.toLowerCase()} doit compter au minimum 2 caractères</span>`;
    verification = false;
  }

  if(erreur != "") // On vérifie qu'il y a une erreur de saisie
  {
    if(saisie.parentNode.lastChild.className != "erreur") // Si l'erreur n'est pas déjà affiché
    {
      saisie.parentNode.insertAdjacentHTML('beforeend', erreur);
    }
  }
  else // Si pas d'erreur, on supprime l'erreur qu'on a déjà affiché
  {
    if(saisie.parentNode.lastChild.className == "erreur")
    {
      saisie.parentNode.lastChild.remove();
    }
  }
  return verification;
}

function fctVerifEmail(saisie)
{
  let erreur = "";
  let verification = true;

  if(saisie.value == "") // pas d'email saisie
  {
    erreur = "<span class=erreur>Veuillez saisir votre email</span>";
    verification = false;
  }
  else // email saisie -> On vérifie le format avec regex
  {
    let regex = /\w*[@].[a-z]{1,}[.][a-z]{2,3}/i;
    // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let res = saisie.value.match(regex);
    if(!res)
    {
      erreur = "<span class=erreur>Veuillez sélectionner un email valide</span>";
      verification = false;
    }
  }


  if(erreur != "") // On vérifie qu'il y a une erreur de saisie
  {
    if(saisie.parentNode.lastChild.className != "erreur") // Si l'erreur n'est pas déjà affiché
    {
      saisie.parentNode.insertAdjacentHTML('beforeend', erreur); // On créer le span avec la classe erreur et son contenu
    }
    else
    {
      saisie.parentNode.lastChild.innerHTML = erreur; // span erreur déjà existant, on remplace uniquement le contenu
    }
  }
  else // Si pas d'erreur, on supprime l'erreur qu'on a déjà affiché
  {
    if(saisie.parentNode.lastChild.className == "erreur")
    {
      saisie.parentNode.lastChild.remove();
    }
  }
  
  return verification;
}

function fctVerifDateNaissance(saisie)
{
  let erreur = "";
  let dateNaissanceJS = fctDateVersDateJS(saisie.value);
  let dateAujourdhui = new Date();
  let verification = true;
  if(dateNaissanceJS == "")
  {
    erreur = `<span class=erreur>Veuillez saisir une date de naissance</span>`;
    verification = false;
  }

  if(dateNaissanceJS >= dateAujourdhui )
  {
    erreur = `<span class=erreur>Votre date de naissance ne peut être ultérieure ou égale à aujourd'hui</span>`;
    verification = false;
  }
  if(erreur != "") // On vérifie qu'il y a une erreur de saisie
  {
    if(saisie.parentNode.lastChild.className != "erreur") // Si l'erreur n'est pas déjà affiché
    {
      saisie.parentNode.insertAdjacentHTML('beforeend', erreur); // On créer le span avec la classe erreur et son contenu
    }
    else
    {
      saisie.parentNode.lastChild.innerHTML = erreur; // span erreur déjà existant, on remplace uniquement le contenu
    }
  }
  else // Si pas d'erreur, on supprime l'erreur qu'on a déjà affiché
  {
    if(saisie.parentNode.lastChild.className == "erreur")
    {
      saisie.parentNode.lastChild.remove();
    }
  }
  return verification;
}

function fctDateVersDateJS(date)
{
  if(date == "")
  {
    return "";
  }
  let formatDate = date.split("-");
  let dateNaissanceJS = new Date(formatDate[0],(formatDate[1]-1),formatDate[2]);
  return dateNaissanceJS;
}

function fctVerifTournoisParticipes(saisie)
{
  let nbParticipations = parseInt(saisie.value,10); // entier nbParticipation ?
  let erreur = "";
  let verification = true;
  if(isNaN(nbParticipations))
  {
    erreur = `<span class=erreur >Votre nombre de tournois participes n'est pas une valeur numérique</span>`;
    verification = false;
  }

  if(erreur != "") // On vérifie qu'il y a une erreur de saisie
  {
    if(saisie.parentNode.lastChild.className != "erreur") // Si l'erreur n'est pas déjà affiché
    {
      saisie.parentNode.insertAdjacentHTML('beforeend', erreur);
    }
  }
  else
  {
    if(saisie.parentNode.lastChild.className == "erreur") 
    {
      saisie.parentNode.lastChild.remove();
    }
  }
  return verification;
}

function fctVerifInputLocation(saisie)
{
  let erreur = "";
  let saisieUtilisateur = saisie
  let verification = true;
  if(saisieUtilisateur == "")
  {
    erreur = "<span class='erreur'>Veuillez choisir un tournoi</span>"
    verification = false;
  }
  
  saisieUtilisateur = document.querySelector("input[name=location]"); // Pour récupérer l'élément dans le dom pour pouvoir afficher l'erreur
  if(erreur != "") // On vérifie qu'il y a une erreur de saisie
  {
    if(saisieUtilisateur.parentNode.lastChild.className != "erreur") // Si l'erreur n'est pas déjà affiché
    {
      saisieUtilisateur.parentNode.insertAdjacentHTML('beforeend', erreur);
    }
  }
  else
  {
    if(saisieUtilisateur.parentNode.lastChild.className == "erreur") 
    {
      saisieUtilisateur.parentNode.lastChild.remove();
    }
  }

  return verification;
}

function fctVerifConditionsUtilisation(saisie)
{
  let erreur = "";
  let verification = true;
  if(saisie.checked == false)
  {
    erreur = "<span class='erreur'>Veuillez acceptez les conditions d'utilisation</span>";
    verification = false;
  }
  // return( saisie ? `<span>Veuillez acceptez les conditions d'utilisation</span>`:``)
  if(erreur != "") // On vérifie qu'il y a une erreur de saisie
  {
    if(saisie.parentNode.lastChild.className != "erreur") // Si l'erreur n'est pas déjà affiché
    {
      saisie.parentNode.insertAdjacentHTML('beforeend', erreur);
    }
  }
  else
  {
    if(saisie.parentNode.lastChild.className == "erreur") 
    {
      saisie.parentNode.lastChild.remove();
    }
  }

  return verification;
}


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


