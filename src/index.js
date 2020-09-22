document.addEventListener('DOMContentLoaded', () => {
    getDogs()
    clickHandler()
})

const BASE_URL = "http://localhost:3000/dogs/"

const getDogs = () => {
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => {
        renderDogs(data)
    })
}

const renderDogs = (dogCollection) => {
    for (const dog of dogCollection) {
        renderDog(dog)
    }
}

const renderDog = (dog) => {
    const dogTable = document.querySelector('#table-body')
    const dogRow = createDogRow(dog)
    dogTable.append(dogRow)
}

const createDogRow = (dog) => {
    const dogRow = document.createElement('tr')
    dogRow.innerHTML = `
        <td name="name">${dog.name}</td> 
        <td name="breed">${dog.breed}</td> 
        <td name="sex">${dog.sex}</td> 
        <td><button data-dog-id= "${dog.id}">Edit Dog</button></td>
    `
    return dogRow 
}

const clickHandler = () => {
    document.addEventListener('click', e => {
        if (e.target.matches('button')) {
            const dogRow = e.target.closest('tr')
            const dogId = e.target.dataset.dogId
            // console.log(dogRow)
            populateForm(dogRow, dogId)
        }
    })
}

const populateForm = (dogRow, dogId) => {
    const dog = getDogInfo(dogRow, dogId)
    const form = document.querySelector('#dog-form')
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
    const submitButton = form.lastElementChild
    submitButton.dataset.dogId = dog.id
}

const getDogInfo = (dogRow, dogId) => {
    const dog = {}
    dog.id = dogId
    dog.name = dogRow.querySelector('td[name="name"]').textContent
    dog.breed = dogRow.querySelector('td[name="breed"]').textContent
    dog.sex = dogRow.querySelector('td[name="sex"]').textContent
    return dog
}

