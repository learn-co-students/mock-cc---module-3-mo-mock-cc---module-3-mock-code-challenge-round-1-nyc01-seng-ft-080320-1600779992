document.addEventListener('DOMContentLoaded', () => {

//Render dogs
    const renderDogs = (dogsList) =>{
        dogsList.forEach(dog =>
            renderDog(dog))
    }
    
    const renderDog = (dogObj) =>{
        const dogTable = document.querySelector('table')
        const dogInfo = document.createElement('tr')
        dogInfo.dataset.id = dogObj.id
        dogInfo.innerHTML = `
        <td class="dogObj-name">${dogObj.name}</td> 
        <td class="dogObj-breed">${dogObj.breed}</td> 
        <td class="dogObj-sex">${dogObj.sex}</td> 
        <td><button>Edit</button></td>
        `
        dogTable.append(dogInfo)
    }

    const getDogs = () =>{
        fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => renderDogs(dogs));
    }

//Edit Dog    

    const clickHandler = () =>{
        document.addEventListener('click', function(e){
            if (e.target.matches('button')){
                updateEditForm(e.target)
                const dogId = e.target.parentElement.parentElement.dataset.id
                updateDog(dogId)
            }
        })
    }

    const updateDog = (dogObjId) =>{
        const id = dogObjId
        const dogForm = document.querySelector('#dog-form')
        document.addEventListener('submit', function(e){
            e.preventDefault()
            const newDogName = dogForm.querySelector('[name ="name"]').value
            const newDogBreed = dogForm.querySelector('[name ="breed"]').value
            const newDogSex = dogForm.querySelector('[name ="sex"]').value
            
            fetch('http://localhost:3000/dogs/' + id,{
                method: 'PATCH',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: newDogName, breed: newDogBreed, sex: newDogSex})
            })
            .then(response => response.json())
            .then(dog => 
                // renderDog(dog),
                getDogs());
        })
    }

    const updateEditForm = (e) =>{
        const dogCard = e.parentElement.parentElement
        const dogName = dogCard.querySelector('.dogObj-name').textContent
        const dogBreed = dogCard.querySelector('.dogObj-breed').textContent
        const dogSex = dogCard.querySelector('.dogObj-sex').textContent
        const dogForm = document.querySelector('#dog-form')
        const dogFormName = dogForm.querySelector('[name ="name"]')
        dogFormName.placeholder = dogName
        const dogFormBreed = dogForm.querySelector('[name ="breed"]')
        dogFormBreed.placeholder = dogBreed
        const dogFormSex = dogForm.querySelector('[name ="sex"]')
        dogFormSex.placeholder = dogSex
    }


//Function Calls
clickHandler()
getDogs()
// updateDog()

})

// body: JSON.stringify({ name: newDogName, breed: newDogBreed, sex: newDogSex}),
// 'http://localhost:3000/dogs/' + id