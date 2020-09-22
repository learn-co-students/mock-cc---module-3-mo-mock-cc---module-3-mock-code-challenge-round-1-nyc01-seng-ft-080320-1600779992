document.addEventListener('DOMContentLoaded', () => {

    const baseUrl = "http://localhost:3000/dogs/"
    
    const removeDogs = () => {
        const dogTable = document.querySelector("#table-body");
        dogTable.innerHTML = ""
    }
    
    const fetchDogs = () => {
        removeDogs();

        fetch(baseUrl)
        .then(response => response.json())
        .then(dogData => {
            for(dog of dogData) {
                renderDog(dog);
            };
        })
    }

    const renderDog = dogObject => {
        const dogRow = document.createElement('tr');
        dogRow.dataset.dogId = dogObject.id;
        dogRow.innerHTML = `
        <td name="name">${dogObject.name}</td> 
        <td name="breed">${dogObject.breed}</td> 
        <td name="sex">${dogObject.sex}</td> 
        <td><button data-id="edit-button">Edit Dog</button></td>
        `;
        const dogTable = document.querySelector("#table-body");
        dogTable.append(dogRow);
    }

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if (e.target.matches(`[data-id="edit-button"]`)) {
                buildDogObjectForForm(e.target);
                
            }
        })
    }

    
                
                
    const submitHandler = () => {
        document.addEventListener("submit", e => {
            e.preventDefault();
            patchUpdate(e.target);
        })
    }
  

    const patchUpdate = (dogForm) => {
        const form = dogForm;
        const dogId = form.dataset.id;
        const name = form.name.value;
        const breed = form.breed.value;
        const sex = form.sex.value;

        const dog = {
            name: name,
            breed: breed,
            sex: sex
        };

        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(dog)
        };
  
        fetch(baseUrl+dogId, options)
        .then(response => response.json())
        .then(dogObject => {
            fetchDogs();
            form.reset();
        })
    
    }


    const buildDogObjectForForm = dog => {
        const buttonTd = dog.parentElement;
        const dogTr = buttonTd.parentElement;
        const dogId = dogTr.dataset.dogId
        const dogTds = dogTr.querySelectorAll('td');
        const dogName = dogTds[0].textContent;
        const dogBreed = dogTds[1].textContent;
        const dogSex = dogTds[2].textContent;
        
        const form = document.querySelector("#dog-form")
        form.name.value = dogName;
        form.breed.value = dogBreed;
        form.sex.value = dogSex;

        form.dataset.id = dogId;
    }


    fetchDogs();
    clickHandler();
    submitHandler();
})