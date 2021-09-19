main();

function main() {
  orderConfirm();
}

// Affiche les données du localStorage dans leur <div>
function orderConfirm() {
  const orderName = document.querySelector(".name span");
  const orderTotal = document.querySelector(".total span");
  const orderId = document.querySelector(".orderid span");
  

// Renvoie les donnée du localStorage
  orderName.innerText = localStorage.getItem("name");
  orderTotal.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");

  // On vide le localStorage pour de prochain achat
  localStorage.clear(); 
}
