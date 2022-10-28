//base URL
const baseURL = 'http://localhost:3000/cards/'

//grab elements of document
const main = document.getElementById('main')
const viewCollection = document.getElementById('view')
const newCard = document.getElementById('newCard')

//content load and page refresh
document.addEventListener('DOMContentLoaded',()=>{
    
})

function pagerefresh(){
  main.innerHTML = ''
}

//event listeners
viewCollection.addEventListener('click', fetchCards)
newCard.addEventListener('click', createNewCard)

function fetchCards(){
  fetch (baseURL)
  .then (res=>res.json())
  .then (pagerefresh())
  .then(data=>data.forEach(card=>renderOneCard(card)))    
}