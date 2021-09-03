fetch ("http://localhost:3000/api/teddies/" + teddieId()) 
    .then (response=>response.json())
    .then(teddie=>{
        viewTeddie(teddie);
})
    .catch (function (err) {
        window.alert('Le serveur n\'est pas disponible, essayez ultérieurement.')
  });

  function teddieId() { // fonction qui recupère l 'ID du teddie
    return location.search.split('=')[1];
  }

  function getSelectedColors() { // fonction qui permet de selectionner la couleur 
    return colors.value;
  }

  // fonction qui affiche la fiche produit
function viewTeddie(teddie) {

    let newDiv = document.createElement('div');
  newDiv.className = 'card';

  teddieChoix.appendChild(newDiv);

  let img = document.createElement('img');
  img.className = 'card-img-top';
  img.src = teddie.imageUrl;
  img.alt = teddie.name;

  newDiv.appendChild(img);

  let div1 = document.createElement('div');
  div1.className = 'card-body';

  let h1 = document.createElement('h1');
  h1.className = 'card-title text-center';
  h1.innerHTML = teddie.name;

  div1.appendChild(h1);

  let p = document.createElement('p');
  p.className = 'card-text text-center';
  p.innerHTML = teddie.description;

  div1.appendChild(p);

  let select = document.createElement('select');
  select.className = 'custom-select';
  select.id = 'colors';

  div1.appendChild(select);

  // boucle pour afficher les différentes couleurs des teddies
  for (let i = 0; i < teddie.colors.length; i++) {
    let option = document.createElement('option');
    option.text = teddie.colors[i];
    select.appendChild(option);

}

    let string = document.createElement('string');
    string.className = 'card-price';
    string.innerHTML = teddie.price/100 + " €";

    div1.appendChild(string);

newDiv.appendChild(div1);

  let button = document.createElement('button');
  button.setAttribute = 'type', 'submit';
  button.id = 'btnAddCart'
  button.className = 'btn';
  button.innerHTML = 'Ajouter au panier';

  newDiv.appendChild(button);

  button.addEventListener('click', addProduct) 

  function addProduct(){ // fonction pour ajouter le produit au localstorage

    let products = []; 
    if (getSelectedColors()) {
      if(localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products')); // Converti les données au format JSON qui sont dans le localstorage
      }

      products.push({_id : teddie._id, image : teddie.imageUrl, name : teddie.name, colors : colors.value, price : teddie.price/100 });
      localStorage.setItem('products', JSON.stringify(products));
      alert('Ajouté au panier, Merci !');
      window.location.reload();
      
    } 
  };

};

// fonction qui affiche le nombre d'article dans le panier
function displayQty(){
  let quantityInCart = document.getElementById('checkout_items');
  if(products === null){
      quantityInCart.innerHTML = '0';
  }else{
      quantityInCart.innerHTML = products.length;
  }    
  return quantityInCart;

};