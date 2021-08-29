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
            alert(error)
        })
}

function displayArticles(article) {
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("imageUrl").textContent = article.imageUrl
    cloneElt.getElementById("name").textContent = article.name
    cloneElt.getElementById("price").textContent = article.price

    document.getElementById("main").appendChild(cloneElt)
}