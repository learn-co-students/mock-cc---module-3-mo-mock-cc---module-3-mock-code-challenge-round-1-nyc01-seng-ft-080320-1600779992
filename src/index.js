document.addEventListener('DOMContentLoaded', e => {

    const qs = (selector) => document.querySelector(selector)
    const ce = (element) => document.createElement(element)

    const URL = 'http://localhost:3000/dogs/'

    fetch(URL)
        .then(resp => resp.json())
        .then(json => renderDogs(json))

    const renderDogs = (dogs) => {
        for (dog of dogs) {
            const newDog = ce('tr')
    
            const newName = ce('td')
            newName.textContent = dog.name
            newDog.append(newName)
    
            const newBreed = ce('td')
            newBreed.textContent = dog.breed
            newDog.append(newBreed)

            const newSex = ce('td')
            newSex.textContent = dog.sex
            newDog.append(newSex)
    
            const newButtonTd = ce('td')
            newDog.append(newButtonTd)
    
            const newButton = ce('button')
            newButton.textContent = "Edit"
            newButton.dataset.id = dog.id
            newButton.className = 'edit-btn'
            newButtonTd.append(newButton)
    
            document.getElementById('table-body').append(newDog)
        }
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('.edit-btn')) {
                console.log(e.target)
                let button = e.target
                let dogId = button.dataset.id
                fetchDog(dogId)
            }
        })
    }

    const fetchDog = (dogId) => {
        fetch(URL + dogId) 
            .then(resp => resp.json())
            .then(editDog)
        }

    const editDog = (dog) =>{
        const form = qs('#dog-form')
        form.name.value = `${dog.name}`
        form.breed.value = `${dog.breed}`
        form.sex.value = `${dog.sex}`
        submitHandler(dogId)
    }
    
    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            if (e.target.matches('#dog-form')) {
                const dogForm = e.target
                patchDogs(dogForm)
            } 
        })}

    const patchDogs = (form, reset = false) => {
        let id = form.id.value // cant seem to find a way to get the id from the button dataset into this
        
        const newDog = {
            "name": form.name.value,
            "breed": form.breed.value,
            "sex": form.sex.value
        }
        
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDog)
        }
        
        fetch(URL + id, options)
            .then(resp => resp.json())
            .then(renderDogs)
    }

clickHandler()
})//dom content loaded