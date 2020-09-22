document.addEventListener('DOMContentLoaded', () => {
    BASEURL = 'http://localhost:3000/dogs/'


    // - Make a dog editable. Clicking on the edit button click handler
    // next to a dog should populate the top form with that put info in form
    // dog's current information.


    const clickHandler = () => {
        document.addEventListener('click', e => {
            if(e.target.matches('button')){
                renderDogEditForm(e.target)
            }
        })
    }

    const renderDogEditForm = target => {
        const id = target.dataset.id
        const form = document.querySelector('form')
        const tableD = target.parentElement
        const tableRow = tableD.parentElement
        const dogInfo = tableRow.querySelectorAll('td')
        
        const formName = form.name
        formName.value = dogInfo[0].textContent
        const formBreed = form.breed
        formBreed.value = dogInfo[1].textContent
        const formSex = form.sex
        formSex.value = dogInfo[2].textContent
    
        submitHandler(id)
      
    }

    const submitHandler = (id) => {
        
        document.addEventListener('submit', e=> {
            e.preventDefault()
            
            

        })
    }

    const fetchDogs = (url) => {
        
        fetch(BASEURL)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
    }


    const renderDogs = dogs => {
        
        dogs.forEach(dog => createDogInTable(dog))
    }
    

    const createDogInTable = dog => {
        const tBody = document.querySelector('#table-body')
        const tableRow = document.createElement('tr')
        tableRow.dataset.id = dog.id
        
        tableRow.innerHTML = `
            <td>${dog.name}</td> 
            <td>${dog.breed}</td> 
            <td>${dog.sex}</td> 
            <td><button data-id = ${dog.id}>Edit</button></td>
        `
        tBody.append(tableRow)
    }

    fetchDogs(BASEURL)
    clickHandler()
})

