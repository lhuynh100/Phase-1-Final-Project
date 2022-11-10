// content load
document.addEventListener('DOMContentLoaded', function(){
    
// base URL
const myUrl = 'http://localhost:3000/cards/'

//grab elements of document
const main = document.getElementById('main')
const availableCards = document.getElementById('view')
const newCard = document.getElementById('forSale')

function clearContainer(){
  main.innerHTML = ''
}

// event listeners
availableCards.addEventListener('click', fetchCards)
newCard.addEventListener('click', createForm)

function fetchCards(){
  fetch (myUrl)
  .then (res=>res.json())
  .then(data=> {
    clearContainer()
    data.forEach(card => renderOneCard(card))
  }
  )}

// function to renderOneCard // use interpolation to inject the value
function renderOneCard(cardObj){
  const card = document.createElement('ul')
  card.id = `${cardObj.id}`
  card.className='card'
  card.innerHTML=`
  <img src="${cardObj.image}" class="card-image"/>
  <div class="card-info">
      <p>${cardObj.name}</p>
      <p>${cardObj.cardType}</p>
      <p>${cardObj.edition}</p>
  <div class="card-buttons">
      <button id ="buynow" class="waves-effect waves-light btn red accent-4">Purchase For:${cardObj.price}</button>
      `
  main.append(card)
  card.querySelector('#buynow').addEventListener('click', (event)=>{
      console.log(event)
      card.remove()
      deleteCard(cardObj)
  })
}

//function to submit new card
function createForm(){
  clearContainer()
  const form = document.createElement('form')
  form.id = 'addCardForm'
  form.innerHTML= `
      <h3>Submit Your Card to Sale</h3>
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
      <button id ="submitCard" class="waves-effect waves-light btn red accent-4">Submit Card </button>
  `
  main.append(form)
  // debugger
  document.querySelector('form').addEventListener('submit', createNewCard)
}

function createNewCard(e){
  e.preventDefault()
  // debugger
  let newCardObj={
      name:e.target.name.value,
      image:e.target.image.value,
      edition:e.target.edition.value,
      cardType:e.target.cardType.value,
      price:e.target.price.value,       
  }
  console.log(newCardObj)
  renderOneCard(newCardObj)
  postNewCard(newCardObj)
  document.querySelector('form').reset()
}

//funtion to post new cards to db
function postNewCard(newCardObj){
  console.log(newCardObj)
  fetch (myUrl,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(newCardObj)
  })
  .then(res=>res.json())
  .then(pokemon=>console.log(pokemon))
}

// function to delete card from db
function deleteCard(cardObj){
  fetch(`${myUrl}${cardObj.id}`,{
      method: 'DELETE',
      headers:{
          'Content-Type':'application/json'
      }
  })
  .then(res=>res.json())
  .then(data=>console.log(data))
}
})