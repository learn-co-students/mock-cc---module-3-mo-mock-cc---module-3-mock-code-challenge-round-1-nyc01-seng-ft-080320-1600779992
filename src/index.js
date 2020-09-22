document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = "http://localhost:3000/dogs/"
    const DOG_URL = "http://localhost:3000/dogs/:id"

    // Fetch request for all dogs
    const getDogs = () => {
        fetch(BASE_URL)
        .then(response => response.json())
        .then(dogArray => renderDogs(dogArray))        
    }

    // Seperating the array into single dogs
    const renderDogs = (dogArray) => {
        dogArray.forEach(dog => {
            renderDog(dog);
        });
    }

    // Rendering the dogs Function
    const renderDog = (dog) => {
        let dogTable = document.querySelector('#table-body')
        let dogTr = document.createElement('tr')
        dogTr.dataset.id = dog.id
        dogTr.innerHTML = `
        <tr>
        <td>${dog.name}</td> 
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>
        </tr>
        `
        dogTable.append(dogTr)
    }

    // Click Listener for Edit Button
    document.addEventListener('click', e => {
        if (e.target.innerText === "Edit") {
            const dogForm = document.querySelector('#dog-form')
            const dogObj = e.target.parentNode.parentNode.cells
            
            dogForm[0].value = dogObj[0].innerText
            dogForm[1].value = dogObj[1].innerText
            dogForm[2].value = dogObj[2].innerText
       
        }
    })

    // Submit Handler to update dogs on the DB and DOM
    let form  = document.querySelector('#dog-form')
    form.addEventListener('submit', e => {
        e.preventDefault();

        options = {
            method: 'PATCH'
            body: JSON.stringify({
            name = dogName
                }
            )
        }

        fetch(BASE_URL + id, options)
        .then(response => response.json())
        .then(jsonData => console.log(jsonData))


        dogName = form.children.name.value
        dogBreed = form.children.breed.value
        dogSex = form.children.sex.value
        
        
    })





    getDogs()
})


// √ On load render a list of dogs onto the table
// √ from   http://localhost:3000/dogs 

// √Dog Object will be a table row:
// √<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>

//  √Make a dog editable. Add click listener on the eddt button
//  √Clicing the edit button will populate the form at the top 
//  √with the dogs information

// Listen for a submit event on the form.  on submit, prevent default
//  and make a patch request to http://localhost:3000/dogs/:id tu update

// make sure that the page is rendering the most up to date  data
//  Invoke the getDogs function after the patch request has been made