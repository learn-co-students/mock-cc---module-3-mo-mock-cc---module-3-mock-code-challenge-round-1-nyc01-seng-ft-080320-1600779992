document.addEventListener('DOMContentLoaded', () => {
    const url = "http://localhost:3000/dogs/"

    // sends a fetch request for all dog info from DB and renders it to the DOM

    const getDogsFromDbAndDisplay = () => {
        fetch(url)
        .then(response => response.json())
        .then(dogs => {
            renderDogs(dogs)
        })
    }
    // creates table rows for all dogs using the renderDog function

    const renderDogs = dogs => {
        for(const dog of dogs){
            renderDog(dog)
        }
    }

    // renders a single dog and creates a row element for it with individual info

    const renderDog = dog => {
        const tableBody = document.querySelector('#table-body')
        const dogRow = document.createElement('tr')
        dogRow.dataset.dogId = dog.id
        dogRow.innerHTML = `
            <td class="dog-name">${dog.name}</td>
            <td class="dog-breed">${dog.breed}</td>
            <td class="dog-sex">${dog.sex}</td>
            <td>   
                <button class="edit-button">Edit</button>
            </td>
        `
        tableBody.append(dogRow)
    }

    // click handler for edit button

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if(e.target.matches('.edit-button')){
                updateFormWithDogInfo(e.target)
            }
        })
    }

    // prepopulates form with dog info when edit button is clicked

    const updateFormWithDogInfo = el => {
        
        const dogRow = el.closest('tr')
        const dogId = dogRow.dataset.dogId
    
        const dogName = dogRow.querySelector('.dog-name').textContent
        const dogBreed = dogRow.querySelector('.dog-breed').textContent
        const dogSex = dogRow.querySelector('.dog-sex').textContent

        const form = document.querySelector('#dog-form')
        form.dataset.currentDogId = dogId
        
        const nameField = form.name
        const breedField = form.breed
        const sexField = form.sex

        nameField.value = dogName
        breedField.value = dogBreed
        sexField.value = dogSex
    }

    // submit handler for form

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            if(e.target.matches('#dog-form')){
                e.preventDefault()
                getAndUpdateDogInfo(e.target)
            }
        })
    }

    // gets dog info from form fields, updates in DB then re-renders dogs to DOM so updated info shows

    const getAndUpdateDogInfo = el => {
        const form = el
        const currentDogId = form.dataset.currentDogId
        const updatedDogObj = {
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value,
        }
        if(currentDogId){
            fetch(url + currentDogId, patchRequestOptions(updatedDogObj))
            .then(response => response.json())
            .then(dog => {
                const form = el
                form.removeAttribute('data-current-dog-id')
                const tableBody = document.querySelector('#table-body')
                tableBody.innerHTML = ''
                getDogsFromDbAndDisplay()

                // following works as well. updates only the single TR for dog edited


                // const dogRow = document.querySelector(`tr[data-dog-id="${dog.id}"]`)
                // const dogNameTd = dogRow.querySelector('.dog-name')
                // const dogBreedTd = dogRow.querySelector('.dog-breed')
                // const dogSexTd = dogRow.querySelector('.dog-sex')

                // dogNameTd.textContent = dog.name
                // dogBreedTd.textContent = dog.breed
                // dogSexTd.textContent = dog.sex
                // const form = el 
                // form.removeAttribute('data-current-dog-id')

            })
        }
        form.reset()
    }

    const patchRequestOptions = dogObj => {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(dogObj)
        }
        return options
    }

    clickHandler()
    submitHandler()
    getDogsFromDbAndDisplay()
})