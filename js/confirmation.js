main();

function main() {
  orderConfirm();
}

function orderConfirm() {
  const orderTotal = document.querySelector(".total string");
  const orderId = document.querySelector(".orderid string");
  
  orderTotal.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");

  
}