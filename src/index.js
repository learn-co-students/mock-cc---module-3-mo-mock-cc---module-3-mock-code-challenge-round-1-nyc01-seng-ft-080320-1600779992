document.addEventListener('DOMContentLoaded', () => {
    getDogs()
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
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button data-dog-id= "${dog.id}">Edit Dog</button></td>
    `
    return dogRow 
}