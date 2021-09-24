// Fonction pour savoir si le panier est vide
  function panierEmpty() {
    if (
      objetLocalStorage == null ||
      objetLocalStorage == 0
    ) {
      return true;
    } else {
      return false;
    }
  }
// Sélection de la classe ou j'injecte le contenue HTML
let cart = document.querySelector(".card-panier__commande");

// Déclaration de la variable "objetLocalStorage" dans laquelle on met les key et les values qui sont dans le localStorage
// JSON.parse : pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
let objetLocalStorage = JSON.parse(localStorage.getItem("products"));

main();

function main() {
  panier();
  totalPanier();
  viderPanier();
  formulaire();
}

function panier() {
  let test = document.querySelector(".width-vide-panier");
  let panierCard = document.querySelector(".card-panier");
  let panierVide = document.querySelector(".panier-vide");

  // Indique "Votre panier est vide" si aucun objet n'est présent dans le localStorage
  if (localStorage.getItem("products")) {
    panierVide.style.display = "none";
  }

  // Création des <div> en fonction des éléments du localStorage
  for (let produit in objetLocalStorage) {
    let descriptionTeddie = document.createElement("div");
    cart.insertBefore(descriptionTeddie, test);
    descriptionTeddie.classList.add("row", "card-panier__commande", "description-teddie", "mb-2");
    
    // Div photo
    let teddiePhoto = document.createElement("img");
    descriptionTeddie.appendChild(teddiePhoto);
    teddiePhoto.classList.add("col", "card-panier__commande");
    teddiePhoto.src = objetLocalStorage[produit].image;
    teddiePhoto.style = (style="width:10%;");

    // Div Nom du Teddie
    let teddieName = document.createElement("div");
    descriptionTeddie.appendChild(teddieName);
    teddieName.classList.add("col", "card-panier__commande");
    teddieName.innerHTML = objetLocalStorage[produit].name;

    // Div Couleur
    let teddieColors = document.createElement("div");
    descriptionTeddie.appendChild(teddieColors);
    teddieColors.classList.add("col", "card-panier__commande", "title-colors");
    teddieColors.innerHTML = objetLocalStorage[produit].colors;

    // Div Prix
    let teddiePrice = document.createElement("div");
    descriptionTeddie.appendChild(teddiePrice);
    teddiePrice.classList.add("col", "card-panier__commande", "price");
    teddiePrice.innerHTML = objetLocalStorage[produit].price + " €";
  }
}

// ------ Calcul et affichage du total de la commande du panier ------
function totalPanier () {
  let prixCommande = [];

  // On va chercher les prix dans le panier si le panier n'est pas vide
  if (panierEmpty() == false) {
    for(let m = 0; m < objetLocalStorage.length; m++){
      let prixPanier = objetLocalStorage[m].price;

      // On met les prix du panier dans la variable prixCommande
      prixCommande.push(prixPanier)
    };
  };

  // On additionne les prix qu'il y a dans le tableau de la variable prixCommande avec la
  // méthode .reduce
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const prixTotalPanier = prixCommande.reduce(reducer,0);

  // On sélectionne la <div> ou s'affichera le prix total de la commande et sa mise en page
  const totalPrix = document.querySelector(".total");
  totalPrix.textContent = "Total : " + prixTotalPanier + " €";
}



// Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage
function viderPanier() {

  const buttonViderPanier = document.querySelector(".vide-panier");
  buttonViderPanier.addEventListener("click", () => {
    localStorage.clear();
  });
}
 
function formulaire() {

  // ---Création des fonctions de validation du formulaire---

    // Création de la fonction de validation pour les champs : Prénom, Nom et Ville
      function validNom(value) {
          return /^[a-zA-ZéèîïÉÈÎÏ][A-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/.test(value);
      };
      // Création de la fonction de validation pour le champ : Code Postal
      function validCp(value) {
          return /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(value);
      };
      // Création de la fonction de validation pour le champ : Adresse
      function validAdresse(value) {
          return /^\d+\s[A-z]+\s[A-z]+/.test(value);
      };
      // Création de la fonction de validation pour le champ : Adresse Mail
      function validMail(value) {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
      };
      // Création de la fonction de validation pour le champ : Téléphone
      function validTelephone(value) {
          return /^[+](\d{3})\)?(\d{3})(\d{5,6})$|^(\d{10,10})$/.test(value);
      };

  // On récupère les inputs depuis le formulaire.
  const submit = document.querySelector("#submit");
  let inputPrenom = document.querySelector("#prenom");

      // Vérification de la validité du Prénom
      inputPrenom.addEventListener("change", function (event) {
        if (validNom(inputPrenom.value)) {
            document.querySelector("#prenom_valide").textContent = " Champ Valide !";
            document.querySelector("#prenom_valide").className ='champ_valide text-success font-weight-bold far fa-check-circle';
        } else {
            document.querySelector("#prenom_valide").textContent = " Veuillez à bien remplir ce champ merci !";
            document.querySelector("#prenom_valide").className ='champ_valide text-danger font-weight-bold far fa-times-circle';
            alert( "Aucun chiffre ou symbole ne sont autorisés pour les champs : Prénom, Nom et Ville" )
            event.preventDefault()
        }
      });

  let inputNom = document.querySelector("#nom");

      // Vérification de la validité du Nom
      inputNom.addEventListener("change", function (event) {
        if (validNom(inputNom.value)) {
            document.querySelector("#nom_valide").textContent = " Champ Valide !";
            document.querySelector("#nom_valide").className ='champ_valide text-success font-weight-bold far fa-check-circle';
        } else {
            document.querySelector("#nom_valide").textContent = " Veuillez à bien remplir ce champ merci !";
            document.querySelector("#nom_valide").className ='champ_valide text-danger font-weight-bold far fa-times-circle';
            alert( "Aucun chiffre ou symbole ne sont autorisés pour les champs : Prénom, Nom et Ville" )
            event.preventDefault()
        }
      });

  let inputCp = document.querySelector("#cp");

      // Vérification de la validité du Code Postal
      inputCp.addEventListener("change", function (event) {
        if (validCp(inputCp.value)) {
            document.querySelector("#cp_valide").textContent = " Champ Valide !";
            document.querySelector("#cp_valide").className ='champ_valide text-success font-weight-bold far fa-check-circle';
        } else {
            document.querySelector("#cp_valide").textContent = " Veuillez à bien remplir ce champ merci !";
            document.querySelector("#cp_valide").className ='champ_valide text-danger font-weight-bold far fa-times-circle';
            alert( "Merci d'inscrire un Code Postal valide" )
            event.preventDefault()
        }
      });

  let inputVille = document.querySelector("#ville");

      // Vérification de la validité de la Ville
      inputVille.addEventListener("change", function (event) {
        if (validNom(inputVille.value)) {
            document.querySelector("#ville_valide").textContent = " Champ Valide !";
            document.querySelector("#ville_valide").className ='champ_valide text-success font-weight-bold far fa-check-circle';
        } else {
            document.querySelector("#ville_valide").textContent = " Veuillez à bien remplir ce champ merci !";
            document.querySelector("#ville_valide").className ='champ_valide text-danger font-weight-bold far fa-times-circle';
            alert( "Aucun chiffre ou symbole ne sont autorisés pour les champs : Prénom, Nom et Ville" )
            event.preventDefault()
        }
      });

  let inputAdresse = document.querySelector("#adresse");

      // Vérification de la validité de l'Adresse
      inputAdresse.addEventListener("change", function (event) {
        if (validAdresse(inputAdresse.value)) {
            document.querySelector("#adresse_valide").textContent = " Champ Valide !";
            document.querySelector("#adresse_valide").className ='champ_valide text-success font-weight-bold far fa-check-circle';
        } else {
            document.querySelector("#adresse_valide").textContent = " Veuillez à bien remplir ce champ merci !";
            document.querySelector("#adresse_valide").className ='champ_valide text-danger font-weight-bold far fa-times-circle';
            alert( "Merci d'inscrire une Adresse valide" )
            event.preventDefault()
        }
      });

  let inputMail = document.querySelector("#mail");

      // Vérification de la validité de l'Adresse Mail
      inputMail.addEventListener("change", function (event) {
        if (validMail(inputMail.value)) {
            document.querySelector("#mail_valide").textContent = " Champ Valide !";
            document.querySelector("#mail_valide").className ='champ_valide text-success font-weight-bold far fa-check-circle';
        } else {
            document.querySelector("#mail_valide").textContent = " Veuillez à bien remplir ce champ merci !";
            document.querySelector("#mail_valide").className ='champ_valide text-danger font-weight-bold far fa-times-circle';
            alert( "Merci d'inscrire une Adresse Mail valide" )
            event.preventDefault()
        }
      });

  let inputTelephone = document.querySelector("#telephone");

      // Vérification de la validité du numéro de Téléphone
      inputTelephone.addEventListener("change", function (event) {
        if (validTelephone(inputTelephone.value)) {
            document.querySelector("#telephone_valide").textContent = " Champ Valide !";
            document.querySelector("#telephone_valide").className ='champ_valide text-success font-weight-bold far fa-check-circle';
        } else {
            document.querySelector("#telephone_valide").textContent = " Veuillez à bien remplir ce champ merci !";
            document.querySelector("#telephone_valide").className ='champ_valide text-danger font-weight-bold far fa-times-circle';
            alert( "Merci d'inscrire un numéro de Téléphone valide" )
            event.preventDefault()
        }
      });

  let erreur = document.querySelector(".erreur");

  // Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur 
  // et on empêche l'envoi du formulaire.
  submit.addEventListener("click", (e) => {
    if (
      !inputPrenom.value ||
      !inputNom.value ||
      !inputCp.value ||
      !inputVille.value ||
      !inputAdresse.value ||
      !inputMail.value ||
      !inputTelephone.value
    ) {

      erreur.innerHTML = "Vous devez renseigner tous les champs pour finaliser votre commande !";

    } else {

      // Et on vérifie que les inputs soient bien valide avant d'envoyer sinon la requête ne se fait pas
      if
      (validNom(inputPrenom.value) && validNom(inputNom.value) && validCp(inputCp.value) && validNom(inputVille.value) && validAdresse(inputAdresse.value) && validMail(inputMail.value) && validTelephone(inputTelephone.value))

      {

      // Si le formulaire est valide, le tableau "produitAcheter" contiendra un tableau d'objet 
      // qui sont les produits achetés, et "order" contiendra ce tableau ainsi que l'objet qui 
      // contient les infos de l'acheteur
      let produitAcheter = [];
      for (let produit in objetLocalStorage) {
        let productsId = objetLocalStorage[produit]._id;
        produitAcheter.push((productsId));
      }
      console.log(produitAcheter);

      const order = {
        contact: {
          firstName: inputPrenom.value,
          lastName: inputNom.value,
          address: inputAdresse.value,
          city: inputVille.value,
          email: inputMail.value,
        },
        products: produitAcheter,
      };
      console.log(order);

      // Affichage uniquement du prix (nombre) sur la prochaine page
      let priceConfirmation = document.querySelector(".total").innerText;
      priceConfirmation = priceConfirmation.split(" :");

      // Envoi de la requête POST au back-end
      fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: { 
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order),
      })
      // Envoie de la requête, on changera de page avec un localStorage qui ne contiendra 
      // plus que le prénom, l'orderId et le prix.
      .then((response) => response.json())
      .then((order) => {
        localStorage.clear();
        let orderId = order.orderId;
        console.log(orderId);
        localStorage.setItem("name", inputPrenom.value);
        localStorage.setItem("total", priceConfirmation[1]);
        localStorage.setItem("orderId", order.orderId);
 
        // Destination de la requête
        document.location.href = "confirmation.html";
      })      
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        });
      }
    }
  });
}