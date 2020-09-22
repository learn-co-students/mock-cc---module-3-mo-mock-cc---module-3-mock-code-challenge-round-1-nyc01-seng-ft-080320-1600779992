const DOGS_BASE_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {

    const getDogs = () => {
        fetch(DOGS_BASE_URL)
        .then(resp => resp.json())
        .then(dogs => renderDogs(dogs))
    }

    const renderDogs = dogs => {
        dogs.map(renderDog)
    }

    const renderDog = dog => {
        const table = document.querySelector("#table-body")
        const tableRow = document.createElement("tr")
        tableRow.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>
        `
        table.append(tableRow)
    }


    getDogs();
})

{/* <tbody id="table-body"> */}