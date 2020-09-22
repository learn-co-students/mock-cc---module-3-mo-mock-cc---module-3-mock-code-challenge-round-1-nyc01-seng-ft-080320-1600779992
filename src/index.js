document.addEventListener('DOMContentLoaded', () => {

    const dogsUrl = 'http://localhost:3000/dogs'
    
    const table = document.querySelector('#table-body')
    
        fetch(dogsUrl)
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(dog => renderDogs(dog)))
    
        const renderDogs = (dog) => {
            const dogTR = document.createElement('tr')
            dogTR.dataset.num = dog.id
            id = dog.id
            dogTR.innerHTML = `
            <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td>
            `
            table.appendChild(dogTR)
        }
    
        // const clickHandler = () => {
        //     document.addEventListener("click", e => {
        //         if (e.target.tagName === "button")
        //         id = parseInt(e.target.parentNode.dataset.num)
        //         editDog(id)
        //     })
        // }
    
        // const editDog = (id) => {
        //     fetch(dogsUrl + `/${id}`)
        //         .then(resp => resp.json())
        //         .then(dog => postDogOnForm(dog))
            
        //     const postDogOnForm = dog => {
        //     const dogForm = document.querySelector("#dog-form")
        //         dogForm.dataset.num = dog.id
        //         dogForm.name.value = dog.name
        //         dogForm.breed.value = dog.breed
        //         dogForm.sex.value = dog.sex
        //     }
        // }
    
        // const submitHandling = () => {
        //     document.addEventListener("submit", e => {
        //         e.preventDefault()
    
        //         const dogForm = document.querySelector("#dog-form")
                
        //         let dog = {
        //             "name":dogForm.name.value,
        //             "breed":dogForm.breed.value,
        //             "sex":dogForm.sex.value
        //         }
                
        //         dogForm.dataset.num = dog.id
        //         updateDog(dog.id)
        //         dogForm.reset()
        //     })
        // }
    
        // const updateDog = (id) => {
           
        // }
    
    })