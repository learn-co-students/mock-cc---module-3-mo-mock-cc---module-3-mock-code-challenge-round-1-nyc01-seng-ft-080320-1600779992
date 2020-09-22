document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000/dogs/'
    const tableBody = document.querySelector('#table-body')


    const getDogs = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
    }


    const renderDogs = (dogs) => {
        for(const dog of dogs){
            renderDog(dog)
        }
    }

    const renderDog = (dog) => {
        const row = document.createElement('tr')
        row.dataset.id = dog.id
        
        row.innerHTML = `
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button>Edit</button></td>
        `
        tableBody.append(row)
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if(e.target.textContent === 'Edit'){
                const dogForm = document.querySelector('#dog-form')

                const button = e.target
                const row = button.closest('tr')
                const cell = row.children
                
                name = cell[0].innerText
                breed = cell[1].innerText
                sex = cell[2].innerText

                dogForm.name.value = name
                dogForm.breed.value = breed
                dogForm.sex.value = sex
    
                dogForm.dataset.id = row.dataset.id

            }
        })
    }

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            const form = document.querySelector('#dog-form')
            const button = e.target
            const id = form.dataset.id
            
            const updateDog = {
                name: form.name.value,
                breed: form.breed.value,
                sex: form.sex.value
            }
            tableBody.innerText = ' '

            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify(updateDog)
            }
            fetch(baseUrl + id, options)
            .then(response => response.json())
            .then(updatedDog => getDogs(updatedDog))
        })
    }
           


    submitHandler() 
    clickHandler()
    getDogs()
})












// 1). On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
// The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`

// √ - Get dog data  
// √ - Put dogs on table in the form of a row 


// 2). Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.

    // √ - Listen for click event
    // √ - Populate form with current dog information


// 3). On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
// Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.

    // √ - Listen for submit event 
    // √ - PATCH to http://localhost:3000/dogs/:id endpoint
    // √ - Get updated dog and rerender to table