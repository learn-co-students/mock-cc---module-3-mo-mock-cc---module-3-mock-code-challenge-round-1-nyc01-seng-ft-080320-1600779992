document.addEventListener('DOMContentLoaded', () => {
const baseUrl = 'http://localhost:3000/dogs/'

const fetchDogs = () => {
    
    fetch(baseUrl)
    .then(resp => resp.json())
    .then(dogs => renderDogs(dogs))
}

const renderDogs = dogs => {
    for(let dog of dogs){
        renderDog(dog)
    }
}

const addHiddenFieldToEditForm = () => {
    const form = document.querySelector('form')
    const hiddenInput = document.createElement('input')
    hiddenInput.value = ''
    hiddenInput.type = "hidden"
    hiddenInput.name = "hidden"
    form.appendChild(hiddenInput)
}

const renderDog = dog => {
   const tableBody = document.querySelector('#table-body')
   const tableRow = document.createElement('tr')

   tableRow.innerHTML = `
    <td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button class="edit-button" data-id=${dog.id}>Edit</button></td>
   `
   tableBody.appendChild(tableRow)
}

const clickHandler = () => {
    document.addEventListener('click', e => {
        if (e.target.matches('.edit-button')){
            getDogInfo(e.target)

        }
    })
}

const getDogInfo = e => {
    const form = document.querySelector('#dog-form')
    const dogId = e.dataset.id
    fetchSoloDog(dogId)  
}

const fetchSoloDog = d => {
    fetch(baseUrl + d)
    .then(resp => resp.json())
    .then(dog => populateForm(dog))
}

const populateForm = dog => {
    const form = document.querySelector('#dog-form')
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
    form.hidden.value = dog.id
}

const submitHandler = () => {
    document.addEventListener('submit', e => {
        e.preventDefault();
        const form = e.target
        if (form.name.value != "" && form.sex.value != "" & form.breed.value != ""){
             patchThatDog(form)
        }
    })

}

const patchThatDog = form => {
    
    const dogObj = {
        name: form.name.value,
        breed: form.breed.value,
        sex: form.sex.value
    }

    const dogId = form.hidden.value

    const options = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Accepts": "application/json"
        },
        body: JSON.stringify(dogObj)
    }

    fetch(baseUrl + dogId, options)
    .then(resp => resp.json())
    .then(data => renderDog(data))
    }

    const renderWithUpdates = data => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

// just needed to rerender that data...
submitHandler();
fetchDogs();
clickHandler();
addHiddenFieldToEditForm();

})