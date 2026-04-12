const container = document.getElementById('container')
const loading = document.getElementById('loading')
const btn = document.getElementById('btn')
const search = document.getElementById('search')
const toggle = document.getElementById('toggle')
const body = document.body

function fetchAnime(query) {

    if (!query) return

    loading.style.display = 'block'
    loading.innerText = "Loading..."
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

toggle.addEventListener('click', () => {

    if (body.classList.contains('light')) {
        body.classList.remove('light')
        body.classList.add('dark')
        toggle.innerText = '☀️'
    } else {
        body.classList.remove('dark')
        body.classList.add('light')
        toggle.innerText = '🌙'
    }

})

fetchAnime("naruto")