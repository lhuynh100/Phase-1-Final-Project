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

//function to submit new card
function createNewCard(){
  pagerefresh()
  const form = document.createElement('form')
  form.id = 'addCardForm'
  form.innerHTML= `
      <h3>Submit your card for Sale</h3>
      <input
        type="text"
        name="name"
        value=""
        placeholder="Enter Card Name..."
        class="input-text"
      />
      <br />
      <input
        type="text"
        name="image"
        value=""
        placeholder="Enter Card Image URL..."
        class="input-text"
      />
      <br />
      <input
        type="text"
        name="edition"
        value=""
        placeholder="Enter Edition..."
        class="input-text"
      />
      <br />
      <input
        type="text"
        name="cardType"
        value=""
        placeholder="Enter Card Type..."
        class="input-text"
      />
      <br />
      <input
        type="text"
        name="price"
        value=""
        placeholder="Enter Your Price..."
        class="input-text"
      />
      <br />
      <button id ="submitCard" class="waves-effect waves-light btn blue accent-1">Submit Card </button>
  `
  main.appendChild(form)
  document.querySelector('form').addEventListener('submit', newCardObj)
}

function newCardObj(e){
  e.preventDefault()
  let newCardObj={
      name:e.target.name.value,
      image:e.target.image.value,
      edition:e.target.edition.value,
      cardType:e.target.cardType.value,
      price:e.target.price.value,       
  }
  renderOneCard(newCardObj)
  postNewCard(newCardObj)
  document.querySelector('form').reset()
}

//funtion to post new cards to db
function postNewCard(newCardObj){
  fetch (baseURL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(newCardObj)
  })
  .then(res=>res.json())
  .then(card=>console.log(card))
}

// function to delete card from db
function deleteCard(cardObj){
  fetch(`${baseURL}${cardObj.id}`,{
      method: 'DELETE',
      headers:{
          'Content-Type':'application/json'
      }
  })
  .then(res=>res.json())
  .then(data=>console.log(data))
}