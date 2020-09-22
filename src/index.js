document.addEventListener('DOMContentLoaded', () => {
    BASEURL = 'http://localhost:3000/dogs/'

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if(e.target.matches('.edit')){
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
        
        let formName = form.name
        formName.value = dogInfo[0].textContent
        let formBreed = form.breed
        formBreed.value = dogInfo[1].textContent
        let formSex = form.sex
        formSex.value = dogInfo[2].textContent
    
        submitHandler(id)
        
     
    }

    const submitHandler = (id) => {
        // debugger
        document.addEventListener('submit', e=> {
            e.preventDefault()
            const form = e.target
            const name = form.name.value
            const breed = form.breed.value
            const sex = form.sex.value

           newDogInfo = {
               name: name,
               breed: breed,
               sex: sex
           }
           
           updateDog(newDogInfo, id)
           
        })
    }

    const updateDog = (dogInfo, id) => {
        
        options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(dogInfo)
        }
        
        fetch(BASEURL+id, options)
        .then(response => response.json())
        // .then(newDog => renderAllNew(newDog))
        .then(newDog => fetchDogs(BASEURL))
        // .then(newDog => renderAllDogs(newDog))
    }

    // const renderAllNew = updatedDog => {
    //     fetch(BASEURL)
    //     .then(response => response.json())
    //     .then(dogs => renderDogs(dogs))

    //     const tableBody = document.querySelector('tbody') 
        
    //     if(tableBody.firstElementChild){
    //         const tableRowArray = tableBody.querySelectorAll('tr')
    //         tableRowArray.forEach(tr => {
    //             tr.remove()
    //         })
    //     }

    //     console.log(updatedDog)
    // }

    const fetchDogs = (url) => {
        
        fetch(BASEURL)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
    }


    const renderDogs = dogs => {
        const tableBody = document.querySelector('tbody') 
        
        if(tableBody.firstElementChild){
            const tableRowArray = tableBody.querySelectorAll('tr')
            tableRowArray.forEach(tr => {
                tr.remove()
            })
        }

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
            <td><button data-id= ${dog.id} class="edit">Edit</button></td>
        `
        tBody.append(tableRow)
    }

    fetchDogs(BASEURL)
    clickHandler()
})

