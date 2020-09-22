const DOGS_BASE_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {

    const getDogs = () => {
        fetch(DOGS_BASE_URL)
        .then(resp => resp.json())
        .then(dogs => renderDogs(dogs))
    }

    const renderDogs = dogs => {
        document.querySelector("#table-body").innerHTML = ""
        dogs.map(renderDog)
    }

    const renderDog = dog => {
        const table = document.querySelector("#table-body")
        const tableRow = document.createElement("tr")
        tableRow.innerHTML = 
            `<td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button id="${dog.id}" class="edit-dog-btn">Edit Dog</button></td>`

        table.append(tableRow)
    }

    const clickHandler = () => {
        document.addEventListener("click", (e) => {
            if(e.target.matches(".edit-dog-btn")) {
                const dogRow = e.target.closest("tr")
                const dogData = getDogDataFromTable(dogRow);
                renderForm(dogData)
            }
        })
    }

    const submitHandler = () => {
        const form = document.querySelector("#dog-form")
        form.addEventListener("submit", (e) => {
            if (e.target.dataset.id) {
                e.preventDefault();
                updateDog(e.target)
            } else {
                e.preventDefault()
            }
        })
    }

    const updateDog = dogForm => {
        const dog_id = dogForm.dataset.id
        const dog_url = `${DOGS_BASE_URL}/${dog_id}`

        const dogObj = {
            id: dog_id,
            name: dogForm.name.value,
            breed: dogForm.breed.value,
            sex: dogForm.sex.value
        }

        const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(dogObj)
        }

        fetch(dog_url, fetchOptions)
        .then(resp => resp.json())
        .then(dog => getDogs())
    }  

    const getDogDataFromTable = dogRow => {
        const dogData = {
            name: dogRow.children[0].textContent,
            breed: dogRow.children[1].textContent,
            sex: dogRow.children[2].textContent,
            id: dogRow.children[3].firstChild.id
        }
        return dogData
    }

    const renderForm = dogData => {
        const form = document.querySelector("#dog-form")
        form.name.value = dogData.name
        form.breed.value = dogData.breed
        form.sex.value = dogData.sex
        form.dataset.id = dogData.id
    }

    submitHandler();
    clickHandler();
    getDogs();
})