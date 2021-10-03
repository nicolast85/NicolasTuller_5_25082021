// On récupère uniquement l'article dont on a besoin via le paramètre dans la requête
fetch ("http://localhost:3000/api/teddies/" + teddieId()) 
    .then (response=>response.json())
    .then(teddie=>{
        viewTeddie(teddie);
    })
    .catch (function (err) {
        window.alert('Le serveur n\'est pas disponible, essayez ultérieurement.')
    });

  // fonction qui recupère l 'ID du teddie
  function teddieId() {
    return location.search.split('=')[1];
  }
  console.log(location.search.split('='));
  // fonction qui permet de sélectionner la couleur
  function getSelectedColors() {
    return colors.value;
  }

  // fonction qui affiche la fiche produit avec création des <div>
  function viewTeddie(teddie) {

    let divArticle = document.createElement('div');
    divArticle.className = 'card m-3 p-3';
    teddieChoix.appendChild(divArticle);

    // Image du teddie
    let img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = teddie.imageUrl;
    img.alt = teddie.name;
    divArticle.appendChild(img);

    let divTeddy = document.createElement('div');
    divTeddy.className = 'card-body';
  
    // Nom du teddie
    let h1 = document.createElement('h1');
    h1.className = 'card-title text-center';
    h1.innerHTML = teddie.name;
    divTeddy.appendChild(h1);

    // Description du teddie
    let p = document.createElement('p');
    p.className = 'card-text text-center';
    p.innerHTML = teddie.description;
    divTeddy.appendChild(p);
    p.insertAdjacentText("beforebegin", "Description :");

    // Sélecteur des couleurs du teddie
    let select = document.createElement('select');
    select.className = 'custom-select';
    select.id = 'colors';
    divTeddy.appendChild(select);
    select.insertAdjacentText("beforebegin", "Choix de la couleurs :");

    // boucle pour afficher les différentes couleurs des teddies
    for (let i = 0; i < teddie.colors.length; i++) {
      let option = document.createElement('option');
      option.text = teddie.colors[i];
      select.appendChild(option);
    }
  
  // Affiche le prix en Euro des teddies
    let string = document.createElement('string');
    string.className = 'card-price';
    string.innerHTML = teddie.price/100 + " €";
    divTeddy.appendChild(string);
    string.insertAdjacentText("beforebegin", "Prix : ");
    divArticle.appendChild(divTeddy); 

  // Bouton Ajouter au panier
  let button = document.createElement('button');
  button.setAttribute = 'type', 'submit';
  button.id = 'btnAjoutPanier'
  button.className = 'btn';
  button.innerHTML = 'Ajouter au panier';
  divArticle.appendChild(button);
  
  button.addEventListener('click', addProduct)
  

  // fonction pour ajouter le produit au localstorage et l'avoir dans le panier
  function addProduct(){

    let products = []; 
    if (getSelectedColors()) {
      if(localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products')); 
      }

      products.push({_id : teddie._id, image : teddie.imageUrl, name : teddie.name, colors : colors.value, price : teddie.price/100});
      localStorage.setItem('products', JSON.stringify(products));

      window.confirm(teddie.name + " " + 'de couleur ' + colors.value + ' a été ajouté au panier. Merci !');
      window.location.reload();
    
    } else {
      console.error('Retour du serveur : ', response.status);
      alert('Erreur rencontrée : ' + response.status);
    } 
  };
};
