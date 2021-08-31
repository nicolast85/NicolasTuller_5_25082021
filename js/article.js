(async function() {
    const articleId = getArticleId()
    const article = await getArticle(articleId)
    console.log(article)
    displayArticle(article)
})()

function getArticleId() {
    return new URL(location.href).searchParams.get("id")
}

function getArticle(articleId) {
    return fetch('http://localhost:3000/api/teddies/?id=')
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

function displayArticle(article) {

    document.getElementById("name").textContent = article.name
    document.getElementById("imageUrl").src = article.imageUrl
    document.getElementById("description").textContent = article.description
    document.getElementById("price").textContent = article.price / 100 + " €"
}