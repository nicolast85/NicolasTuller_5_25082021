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

    let teddiePhoto = document.createElement("img");
    descriptionTeddie.appendChild(teddiePhoto);
    teddiePhoto.classList.add("col", "card-panier__commande");
    teddiePhoto.src = objetLocalStorage[produit].image;
    teddiePhoto.style = (style="width:10%;");

    let teddieName = document.createElement("div");
    descriptionTeddie.appendChild(teddieName);
    teddieName.classList.add("col", "card-panier__commande");
    teddieName.innerHTML = objetLocalStorage[produit].name;

    let teddieColors = document.createElement("div");
    descriptionTeddie.appendChild(teddieColors);
    teddieColors.classList.add("col", "card-panier__commande", "title-colors");
    teddieColors.innerHTML = objetLocalStorage[produit].colors;

    let teddiePrice = document.createElement("div");
    descriptionTeddie.appendChild(teddiePrice);
    teddiePrice.classList.add("col", "card-panier__commande", "price");
    teddiePrice.innerHTML = objetLocalStorage[produit].price + " €";
  }
}

// Calcul et affichage du total de la commande du panier
function totalPanier () {
  let prixCommande = [];
  let totalPrix = document.querySelector(".total");

  // On push chaque prix du DOM dans un tableau
  let teddiePrices = document.querySelectorAll(".price");
  for (let price in teddiePrices) {
    prixCommande.push(teddiePrices[price].innerHTML);
  }

  // On enlève les undefined du tableau
  prixCommande = prixCommande.filter((und) => {
    return und != undefined;
  });

  // On Transforme en nombre toute les valeurs du tableau
  prixCommande = prixCommande.map((x) => parseFloat(x));

  // Additionner les valeurs du tableau pour avoir le prix total
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  prixCommande = prixCommande.reduce(reducer);

  // Affichage du prix en €
  totalPrix.innerText = `Total : ${(prixCommande = new Intl.NumberFormat("fr-FR",{ style: "currency", currency: "EUR", }).format(prixCommande))}`;
}



// Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage
function viderPanier() {

  const buttonViderPanier = document.querySelector(".vide-panier");
  buttonViderPanier.addEventListener("click", () => {
    localStorage.clear();
  });
}

function formulaire() {

  // On récupère les inputs depuis le formulaire.
  const submit = document.querySelector("#submit");
  let inputPrenom = document.querySelector("#prenom");
  let inputNom = document.querySelector("#nom");
  let inputCp = document.querySelector("#cp");
  let inputVille = document.querySelector("#ville");
  let inputAdresse = document.querySelector("#adresse");
  let inputMail = document.querySelector("#mail");
  let inputTelephone = document.querySelector("#telephone");
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

      // Si le formulaire est valide, le tableau "produitAcheter" contiendra un tableau d'objet 
      // qui sont les produits achetés, et "order" contiendra ce tableau ainsi que l'objet qui 
      // contient les infos de l'acheteur
      let produitAcheter = [];
      produitAcheter.push(objetLocalStorage);

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

      // Envoi de la requête POST au back-end
      const options = fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { 
          "Content-Type": "application/json"
        },
      });
      
       // Affichage uniquement du prix sur la prochaine page
       let priceConfirmation = document.querySelector(".total").innerText;
       priceConfirmation = priceConfirmation.split(" :");

      // Envoie de la requête, on changera de page avec un localStorage qui ne contiendra 
      // plus que le prénom, l'orderId et le prix.
      fetch("http://localhost:3000/api/teddies/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        localStorage.setItem("name", inputPrenom.value);
        localStorage.setItem("total", priceConfirmation[1]);
        localStorage.setItem("orderId", data.orderId);
 
        // Destination de la requête
         document.location.href = "confirmation.html";
      })      
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        });
      }
  });
}