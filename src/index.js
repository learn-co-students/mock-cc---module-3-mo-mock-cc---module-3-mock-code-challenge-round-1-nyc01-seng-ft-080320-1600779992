document.addEventListener('DOMContentLoaded', () => {
    
    const appFunctionality = () => {
        baseUrl = 'http://localhost:3000/dogs/'


        const fetchData = () => {
            
            fetch(baseUrl)
            .then(res => res.json())
            .then(data => renderDogs(data))
        }

        const patchData = dogObj => {
            

            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                                  },
                  body: JSON.stringify({
                    "name": dogObj.name,
                    "breed": dogObj.breed,
                    "sex": dogObj.sex
                })
            }

            fetch(baseUrl + parseInt(dogObj.id), options)
            .then(res => res.json())
            .catch(error => console.log(error))
            
        }


        const renderDog = dogObj => {
            const dogRow = document.createElement('tr')
            dogRow.innerHTML = `<td>${dogObj.name}</td> <td>${dogObj.breed}</td> <td>${dogObj.sex}</td> <td><button>Edit</button></td>`
            dogRow.dataset.id = dogObj.id

            const dogTableBody = document.querySelector('#table-body')

            dogTableBody.appendChild(dogRow)
        }

        const renderDogs = dogArr => {
            dogArr.forEach(dogObj => {
                renderDog(dogObj)
            })
        }


        const populateForm = dogId => {
            const dogTr = document.querySelector(`[data-id="${dogId}"]`)

            const dogForm = document.querySelector('#dog-form')

            dogForm.name.value = dogTr.firstChild.textContent
            dogForm.breed.value = dogTr.firstChild.nextSibling.nextSibling.textContent
            dogForm.sex.value = dogTr.lastChild.previousSibling.previousSibling.textContent
            dogForm.name.id = dogId
            
        }

        const createDogFromForm = dogForm => {

            const dog = {
                "id": dogForm.name.id,
                "name": dogForm.name.value,
                "breed": dogForm.breed.value,
                "sex": dogForm.sex.value,
            }
            return dog
        }


        document.addEventListener('click', e => {
            if (e.target.matches('button')) {
                const dogId = e.target.parentNode.parentNode.getAttribute('data-id')

                populateForm(dogId)
                
            }
        })

        document.addEventListener('submit', e => {
            e.preventDefault();
            const dogForm = (e.target)
            
            
            if (dogForm.name.value === "") {
                alert("Please select a valid dog to edit")
            }
            else {
                const dog = createDogFromForm(dogForm)
                patchData(dog)
            }

        })

       


       


        fetchData()

    }

    appFunctionality()
})




