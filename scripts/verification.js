const submitFormulaire = document.querySelector(".btn-submit");

const prenom = document.querySelector("#first");
const nom = document.querySelector("#last");
const email = document.querySelector("#email");
const dateDeNaissance = document.querySelector("#birthdate");
const nbTournoisParticipes = document.querySelector("#quantity");

prenom.addEventListener('focusout',()=>{
    VerifNomPrenom("prénom",prenom);
  })
  
  nom.addEventListener('focusout',()=>{
    VerifNomPrenom("nom",nom);
  })
  
  email.addEventListener('focusout',()=>{
    VerifEmail(email);
  })
  
  dateDeNaissance.addEventListener('focusout',()=>{
    VerifDateNaissance(dateDeNaissance);
  })
  
  nbTournoisParticipes.addEventListener('focusout',()=>{
    VerifTournoisParticipes(nbTournoisParticipes);
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
  
    let boolVerifPrenom = VerifNomPrenom("prénom",prenom);
    let boolVerifNom = VerifNomPrenom("nom",nom);
    let boolVerifEmail = VerifEmail(email);
    let boolVerifDateNaissance = VerifDateNaissance(dateDeNaissance);
    let boolVerifTournois = VerifTournoisParticipes(nbTournoisParticipes);
    let boolVerifLocation = VerifInputLocation(inputTournoi);
    let boolVerifConditions = VerifConditionsUtilisation(inputCondition);
  
    
    if(boolVerifPrenom && boolVerifNom && boolVerifEmail && boolVerifDateNaissance && boolVerifTournois && boolVerifLocation && boolVerifConditions ) // Tous les champs sont complétés
    {
      // On traite les informations côté backend
      document.reserve.reset();
      modalConfirmation.style.display = "flex";
    }
  
    return false;
    
  }
  
  function VerifNomPrenom(champs,saisie)
  {
    let erreur = "";
    let verification = true;
    if(saisie.value.length <2)
    {
      erreur = `<span class=erreur >Veuillez entrer 2 caractères ou plus pour le champ du ${champs.toLowerCase()}.</span>`;
      verification = false;
    }
    else{
      // Ajout regex nom/prénom
      let regex = /^[a-z\é\è\ê\ï\ö-]{2,}$/i;
      let res = saisie.value.match(regex);
      if(!res)
      {
        erreur = `<span class=erreur>Veuillez saisir que des lettres pour votre ${champs.toLowerCase()}.</span>`;
        verification = false;
      }
      console.log(res);
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
  
  function VerifEmail(saisie)
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
  
  function VerifDateNaissance(saisie)
  {
    let erreur = "";
    let dateNaissanceJS = DateVersDateJS(saisie.value);
    let dateAujourdhui = new Date();
    let verification = true;
    if(dateNaissanceJS == "")
    {
      erreur = `<span class=erreur>Vous devez entrer votre date de naissance.</span>`;
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
  
  function DateVersDateJS(date)
  {
    if(date == "")
    {
      return "";
    }
    let formatDate = date.split("-");
    let dateNaissanceJS = new Date(formatDate[0],(formatDate[1]-1),formatDate[2]);
    return dateNaissanceJS;
  }
  
  function VerifTournoisParticipes(saisie)
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
  
  function VerifInputLocation(saisie)
  {
    let erreur = "";
    let saisieUtilisateur = saisie
    let verification = true;
    if(saisieUtilisateur == "")
    {
      erreur = "<span class='erreur'>Vous devez choisir une option.</span>"
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
  
  function VerifConditionsUtilisation(saisie)
  {
    let erreur = "";
    let verification = true;
    if(saisie.checked == false)
    {
      erreur = "<span class='erreur'>Vous devez vérifier que vous acceptez les termes et conditions.</span>";
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
  