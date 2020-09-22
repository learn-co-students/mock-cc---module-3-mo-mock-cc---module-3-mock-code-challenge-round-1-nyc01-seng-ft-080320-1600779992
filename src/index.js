document.addEventListener('DOMContentLoaded', () => {

    getDogs()
    submitHandler()
})
    const baseUrl = "http://localhost:3000/dogs/"
    const getDogs = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(dogs => {
            dogs.forEach(dog => {
                renderDog(dog)
            });
        })
    }
    
    const renderDog = dog => {
       const dogTable = document.querySelector("#table-body")
       const dogRow = document.createElement('tr')
       dogRow.dataset.id = dog.id

       dogRow.innerHTML = `
       <td>${dog.name}</td>
       <td>${dog.breed}</td>
       <td>${dog.sex}</td>
       <td><button>Edit</id=$button></td>
       `
       dogTable.append(dogRow)
       clickHandler(dog)
    }

    const clickHandler = dog => {
        document.addEventListener('click', e => {
            if(e.target.innerText === "Edit") {
                editDog(e.target.closest('tr'))
            }
        })
    }

    const editDog = dog =>{
        const form = document.querySelector("#dog-form")
        form.name.value = dog.cells[0].innerText
        form.breed.value = dog.cells[1].innerText
        form.sex.value = dog.cells[2].innerText
        form.dataset.id = dog.dataset.id
    }

    const submitHandler = () => {
        document.addEventListener('submit',  e => {
            e.preventDefault()
            const newForm = e.target

            patchDog(newForm)
            newForm.reset()
        })
    }

    const patchDog = newForm => {
        const id = newForm.dataset.id
        const name = newForm.name.value
        const breed = newForm.breed.value
        const sex = newForm.sex.value

        const dogObject = {
            name: name,
            breed: breed,
            sex: sex,
        }

        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(dogObject)
        }

        fetch(baseUrl + id, options)
        .then(response => response.json())
        .then(newDog => newDog)

        window.location.reload();
        
    }
