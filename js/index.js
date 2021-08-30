(async function() {
    const articles = await getArticles()

    for (article of articles) {
    displayArticles(article)
    }
})()

function getArticles() {
    return fetch("http://localhost:3000/api/teddies")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(articles) {
           return articles
        })
        .catch(function(error) {
            window.alert('Le serveur n\'est pas disponible, essayez ultérieurement.')
        })
}

function displayArticles(article) {
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("imageUrl").src = article.imageUrl
    cloneElt.getElementById("name").textContent = article.name
    cloneElt.getElementById("price").textContent = article.price / 100 + " €"
    cloneElt.getElementById("_id").href += '?id={article._id}'

    document.getElementById("main").appendChild(cloneElt)
}