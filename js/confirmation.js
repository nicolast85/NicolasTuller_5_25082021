main();

function main() {
  orderConfirm();
}

function orderConfirm() {
  const orderName = document.querySelector(".name h2");
  const orderTotal = document.querySelector(".total string");
  const orderId = document.querySelector(".orderid string");
  
  orderName.innerText = localStorage.getItem("name");
  orderTotal.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");

  
}
