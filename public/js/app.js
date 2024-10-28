console.log("Client side javascript file is loaded!")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageError = document.querySelector('#message-error')

weatherForm.addEventListener('submit', (e) => {
    messageError.textContent = ''
    messageOne.textContent = ''
    messageTwo.textContent = ''
    
    e.preventDefault()
    const location = search.value
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageError.textContent = data.error
            } else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
        })
    })
})