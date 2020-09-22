document.addEventListener('DOMContentLoaded', () => {
const id = 1
const baseUrl = 'http://localhost:3000/dogs'

const fetchBase = () => {
    fetch(baseUrl)
    .then(resp => resp.json())
    .then(data => console.log(data))
    .then(data => dogsRow(data))
}

const dogsRow = dogsArray => {
    for (dog of dogsArray) {
        const dogRow = document.createElement('tr')
        dogRow.dataset.id = dog.id
        dog.innerHTML = `
        <td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td>
        `
        const table = document.querySelector('#table-body')
        table.appendChild(dogRow)

    }
}

const formHandler = () => {
    const dogForm = document.querySelector('#dog-form')
    dogForm.addEventListener('submit', e => {
        e.preventDefault()
        const name = e.target.name.value
        const breed = e.target.breed.value
        const sex = e.target.sex.value

        const dogInfo = {
        name: name,
        breed: breed,
        sex: sex
        }
        editDog(dogInfo)
    })
}

const editDog = dogInfo => {
    let baseUrl = 'http://localhost:3000/dogs/:${id}'

    options = {
        method: PATCH,
        headers: {
            'content-type': 'application/json',
            'body': 'application/json',
        },
        body: JSON.stringify(dogInfo)
    }

    fetch(baseUrl, options)
    .then(resp => resp.json())
    .then(data => editSingleDog(data))
}

const editSingleDog = (dogInfo) => {

}


const clickHandler = () => {
    document.addEventListener('click', e => {
        if (e.target.matches('edit')) {
            // grab dog info from the table row
            // populate info into form by setting the info equal to value
        }
    })
}
    
    
    fetchBase()
    dogsRow()
    clickHandler()
})
