const container = document.getElementById('container')
const loading = document.getElementById('loading')
const btn = document.getElementById('btn')
const search = document.getElementById('search')

function fetchAnime(query) {

    loading.style.display = 'block'
    container.innerHTML = ''

    fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
    .then(res => res.json())
    .then(data => {

        loading.style.display = 'none'

        data.data.forEach(item => {

            const card = document.createElement('div')
            card.className = 'card'

            const img = document.createElement('img')
            img.src = item.images.jpg.image_url

            const title = document.createElement('h3')
            title.innerText = item.title

            const score = document.createElement('p')
            score.innerText = "⭐ " + item.score

            card.appendChild(img)
            card.appendChild(title)
            card.appendChild(score)

            container.appendChild(card)

        })

    })
    .catch(() => {
        loading.innerText = "Failed to load data"
    })
}

btn.addEventListener('click', () => {
    fetchAnime(search.value)
})

search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchAnime(search.value)
    }
})

fetchAnime("naruto")