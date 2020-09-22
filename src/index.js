document.addEventListener('DOMContentLoaded', () => {

})

const DOGS_URL = "http://localhost:3000/dogs"

const getDogs = () => {
    fetch(DOGS_URL)
    .then(response => response.json())
    .then(data => console.log(data))
}
getDogs()

const renderDogs = (dogCollection) => { // this renders a list of all dogs
    for (dog of dogCollection){
        //for each dog of the dogCollection data
        const dogLi = document.createElement('li')
        dogLi.textContent = dog.name
        dogLi.dataset.dogId = dog.id

        const dogUl = document.createElement('ul')
        
    }
}