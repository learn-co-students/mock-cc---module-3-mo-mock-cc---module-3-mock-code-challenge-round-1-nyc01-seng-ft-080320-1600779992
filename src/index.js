document.addEventListener('DOMContentLoaded', () => {
    baseUrl = 'http://localhost:3000/dogs/'

    const fetchDogs = () => {
        fetch(baseUrl)
        .then(res => res.json())
        .then(dogs => renderDogs(dogs))
    }

    const renderDogs = dogs => {
        for (let dog of dogs) {
            // console.log(dog)
            renderDog(dog)
        }
    }

    const renderDog = dog => {
        const dogTable = document.querySelector('#table-body')
        const dogRows = document.createElement('tr')
        dogRows.dataset.id = dog.id
        dogRows.innerHTML = `
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td>
            <button>Edit</button>
        </td>
        `
        dogTable.append(dogRows)
    }

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.textContent === 'Edit') {
                const dogForm = document.querySelector('#dog-form')
                const dogRow = e.target.closest('tr')
                const dogId = dogRow.dataset.id
                const cells = dogRow.children
                
                const name = cells[0].textContent
                const breed = cells[1].textContent
                const sex = cells[2].textContent

                dogForm.dataset.id = dogId
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
            const dogId = dogForm.dataset.id
            let dogName = dogForm.name.value
            let dogBreed = dogForm.breed.value
            let dogSex = dogForm.sex.value
            
            const dog = {
                name: dogName,
                breed: dogBreed,
                sex: dogSex
            }

            let options = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(dog)
            }

            // console.log(baseUrl + ":" + dogId)
            // console.log(options)
            fetch(baseUrl + dogId, options)
            fetchDogs()
        })
    
    }


    fetchDogs()
    clickHandler()
    submitHandler()
})