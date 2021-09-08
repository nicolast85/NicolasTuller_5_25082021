let cart = document.querySelector(".card-panier__commande");
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
    descriptionTeddie.classList.add("row", "card-panier__commande", "description-teddie");

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

function totalPanier () {
  let prixCommande = [];
  let totalPrix = document.querySelector(".total");

  // On push chaque prix du DOM dans un tableau
  let teddiePriceQuantity = document.querySelectorAll(".price");
  for (let price in teddiePriceQuantity) {
    prixCommande.push(teddiePriceQuantity[price].innerHTML);
  }

  // On enlève les undefined du tableau
  prixCommande = prixCommande.filter((el) => {
    return el != undefined;
  });

  // Transformer en nombre chaque valeur du tableau
  prixCommande = prixCommande.map((x) => parseFloat(x));

  // Additionner les valeurs du tableau pour avoir le prix total
  const reducer = (acc, currentVal) => acc + currentVal;
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

  // On récupère les inputs depuis le DOM.
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
          city: inputVille.value,
          address: inputAdresse.value,
          email: inputMail.value,
        },
        products: produitAcheter,
      };

      // Envoi de la requête POST au back-end
      // Création de l'entête de la requête
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      };

      // Préparation du prix formaté pour l'afficher sur la prochaine page
      let priceConfirmation = document.querySelector(".total").innerText;
      priceConfirmation = priceConfirmation.split(" :");

      // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
      fetch("http://localhost:3000/api/teddies/order", options)
        .then((response) => response.json())
        .then((data) => {
          localStorage.clear();
          console.log(data)
          localStorage.setItem("orderId", data.orderId);
          localStorage.setItem("total", priceConfirmation[1]);

          //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
           document.location.href = "confirmation.html";
        })
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        });
    }
  });
}