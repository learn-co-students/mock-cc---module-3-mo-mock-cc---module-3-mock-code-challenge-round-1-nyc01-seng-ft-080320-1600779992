document.addEventListener('DOMContentLoaded', () => {
    const dogUrl = `http://localhost:3000/dogs/`
    
    const getDogs = () => {
        fetch(dogUrl)
        .then(res => res.json())
        .then(dogs => {
            renderDogs(dogs)
        })
    }

    const renderDogs = (dogs) => {
        const body = document.querySelector(`#table-body`)
        body.innerHTML = ``
        for (let dog of dogs) {
            renderDog(dog, body)
        }
    }
    
    const renderDog = (dog, body) => {
        const dogTr = document.createElement(`tr`)
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
        //???where does this dog data come from? ANSWER: The DOM; specifically here from the rows in the table. 
        document.addEventListener('click', event => {
        if (event.target.textContent === "Edit") {
            const dogForm = document.querySelector(`#dog-form`)
            const dogRow = event.target.closest("tr") //=>> works as an opposite to .querySelector. .qS listens down the tree, closest listens UP the tree for events 
            const dogId = dogRow.dataset.dogId

            const cells = dogRow.children //gives back an HTMLCollection
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
            document.addEventListener(`submit`, event => {
                event.preventDefault()

                const dogForm = event.target

                let dogId = dogForm.dataset.dogId
                let name = dogForm.name.value
                let breed = dogForm.breed.value
                let sex = dogForm.sex.value

                const dog = {
                    name: name,
                    breed: breed,
                    sex: sex
                }

                let options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(dog)
                }
                // PATCH requests are to updates a database
                //all of the dogs information is being loaded into JSON.stringify through the variable `dog`. The WHOLE `dog` object is passed with all of its attributes (some changed, and some not). 
                //what needs to be passed to body: is an object with all attributes || the attributes in particular that need to be updated 

                fetch(dogUrl + dogId, options)
                .then (response => response.json())
                .then(dog => {
                    getDogs()
                })
            })
        }

    submitHandler()
    clickHandler()
    getDogs()
})






//my code 

    // // - On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.

    // fetch(`http://localhost:3000/dogs`)
    // .then(response => response.json())
    // .then(dogsJson => dogList(dogsJson)) //

   
    // const dogList = (dogsJson) => {
    //     for (dog of dogsJson) {
    //         const dogName = dog.name
    //         const dogBreed = dog.breed
    //         const dogSex = dog.sex
    //         const dogId = dog.id
    //         const dogRow = document.createElement("tr")
    //         dogRow.innerHTML = `
    //             <td>${dogName}</td> 
    //             <td>${dogBreed}</td> 
    //             <td>${dogSex}</td> 
    //             <td><button id=${dogId}>Edit</button></td>
    //         `
    //         const tableBody = document.querySelector("#table-body")
    //         tableBody.appendChild(dogRow)
    //     }

    // const editDogButton = () => {
    //     document.addEventListener('click', event => {
            
    //     })
    // }

    // }