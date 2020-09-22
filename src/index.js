const BASE_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded')
    const tableBody = document.getElementById("table-body")
    const dogForm = document.getElementById('dog-form')

    // fetch data from API
    const fetchDogs = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => renderDogs(data))
    }



    // render data from API
    const renderDogs = (dogsArray) => {
        for (let i = 0; i < dogsArray.length; i++) {
            const dog = dogsArray[i];
            let newDog = document.createElement('tr')
            newDog.innerHTML = `
            <td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class = 'edit-btn' data-dog-id = ${dog.id}>Edit</button></td>
            `
            tableBody.append(newDog)
        }
    }

    // Hand Click Events
    const clickHandler = () => {
        
        // populates info into form
        const populateInfo = (dogId) => {
            fetch(BASE_URL+'/'+dogId)
            .then(response => response.json())
            .then((data) =>{ 
                dogForm.childNodes[1].value = data.name
                dogForm.childNodes[3].value = data.breed
                dogForm.childNodes[5].value = data.sex
            })
        }

        tableBody.addEventListener('click', ()=>{
            switch (event.target.className) {
                case 'edit-btn':
                    // console.log(event.target)
                    populateInfo(event.target.dataset.dogId)
                    break;
            }
        })

        dogForm.addEventListener('click', ()=>{
            console.log('working')
        })
    }

    fetchDogs(BASE_URL)
    clickHandler()
})