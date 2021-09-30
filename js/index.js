(async function() {
    const articles = await getArticles()

    for (teddie of articles) {
    displayArticles(teddie)
    }
})()

// Appel de l'API
function getArticles() {
    return fetch("http://localhost:3000/api/teddies")
        .then(function(response) {
            return response.json()
        })
        .then(function(articles) {
           return articles
        })
        .catch(function(error) {
            window.alert('Le serveur n\'est pas disponible, essayez ultérieurement merci.')
        })
}

// Disposition des données de l'API dans les balises 
function displayArticles(teddie) {
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("imageUrl").src = teddie.imageUrl
    cloneElt.getElementById("name").textContent = teddie.name
    cloneElt.getElementById("price").textContent = teddie.price / 100 + " €"
    cloneElt.getElementById("_id").href += '?id=' + teddie._id

    document.getElementById("main").appendChild(cloneElt)
}