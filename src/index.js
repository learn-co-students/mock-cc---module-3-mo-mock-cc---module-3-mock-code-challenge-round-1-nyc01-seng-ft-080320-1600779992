document.addEventListener('DOMContentLoaded', () => {
    const dogsUrl = 'http://localhost:3000/dogs/'

    const getDogs = () => {
        fetch(dogsUrl)
        .then(response => response.json())
        .then(dogs => renderDogs(dogs))
    }

    const renderDogs = (dogs) => {
        const body = document.querySelector('#table-body')
        body.innerHTML = ''
        for(let dog of dogs){
            renderDog(dog, body)
        }
    }
    
    const renderDog = (dog, body) => {
        const dogTr = document.createElement('tr')
        dogTr.dataset.dogId = dog.id
        dogTr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td> 
        <td><button>Edit</button></td>
        `
        body.append(dogTr)

    }
        
    const clickHandler = () => {
        document.addEventListener('click', e => {
            if(e.target.textContent === 'Edit'){
                const dogForm = document.querySelector('#dog-form')
                const dogRow = e.target.closest('tr') // looks for the 'tag' close to the edit button.
                const dogId = dogRow.dataset.dogId

                const cells = dogRow.children
                
                const name = cells[0].textContent
                const breed = cells[1].textContent
                const sex = cells[2].textContent
                console.log(name, breed, sex)

                dogForm.dataset.dogId = dogId
                dogForm.name.value = name
                dogForm.breed.value = breed
                dogForm.sex.value = sex

            }
        })
    }

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()

            const dogForm = e.target
            // console.log(dogForm)

            let dogId = dogForm.dataset.dogId 
            let name = dogForm.name.value 
            let  breed = dogForm.breed.value 
            let  sex = dogForm.sex.value 

            const dog = {
                name: name,
                breed: breed, 
                sex: sex
            }


            let options = { //necessary for PATCH method(updating a data)
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                },
                body: JSON.stringify(dog)
             }

             fetch(dogsUrl + dogId, options)
             .then(response => response.json())
             .then(dog => {
                 getDogs()
             })

        })
    }

    submitHandler()
    clickHandler()
    getDogs()
})