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

//function to renderOneCard
function renderOneCard(cardObj){
  const card = document.createElement('ul')
  card.id = `${cardObj.id}`
  card.className='card'
  card.innerHTML=`
  <img src="${cardObj.image}" class="card-pic" />
  <div class="card-info">
      <p>${cardObj.name}</p>
      <p> ${cardObj.cardType}</p>
      <p> ${cardObj.edition}</p>

  <div class="card-buttons">
      <button id ="buyout" class="waves-effect waves-light btn red accent-4">Purchase For:$<span class="current-bid">${cardObj.price}</span></button>
  `
  main.appendChild(card)
 
  card.querySelector('#buyout').addEventListener('click', (event)=>{
      console.log(event)
      card.remove()
      deleteCard(cardObj)
  })
}