main();

function main() {
  orderConfirm();
}

// Affiche les données du localStorage dans leur <div>
function orderConfirm() {
  const orderName = document.querySelector(".name h2");
  const orderTotal = document.querySelector(".total span");
  const orderId = document.querySelector(".orderid span");
  

// Renvoie les donnée du localStorage
  orderName.innerText = localStorage.getItem("name");
  orderTotal.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");

  localStorage.clear();
}
