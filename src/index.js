document.addEventListener('DOMContentLoaded', () => {

})

const DOGS_URL = "http://localhost:3000/dogs"

const getDogs = () => {
    fetch(DOGS_URL)
    .then(response => response.json())
    .then(data => renderDogs(data))
}


const renderDogs = (dogCollection) => { // this renders a list of all dogs
    for (dog of dogCollection){
        //for each dog of the dogCollection data
        const dogTr = document.createElement('tr')
        dogTr.textContent = dog.name
        dogTr.dataset.dogId = dog.id

        const dogList = document.querySelector('#table-body')
        // console.log(dogId)
        dogList.append(dogTr)
    }
}

// Create renderDog for individual dogs details
const renderDog = dog => { // shows the dog info
    const dog 
}

const clickHandler = () => {
    document.addEventListener('click', e => {
        
    })
}

const submitHandler = () => {  // handling event listener for submit
    const form = document.querySelector('#dog-form')

    form.addEventListener('submit', e =>{
        e.preventDefault()

        const name = form.name.value
        const breed = form.breed.value
        const sex = form.sex.value

        const dog = {
            name: name,
            breed: breed,
            sex: sex,
        }

        const options ={
            method: "PATCH",
            headers: {
                "content-type" : "application/json",
                "accept" : "application/json"
            },
            body: JSON.stringify(dog)
        }
        fetch(DOGS_URL, options)
        .then(response => response.json())
        .then(dog => console.log(dog))
    })

    getDogs()
    submitHandler()
    clickHandler()
}