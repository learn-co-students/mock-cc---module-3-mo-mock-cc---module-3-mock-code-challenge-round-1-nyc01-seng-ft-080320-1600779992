document.addEventListener('DOMContentLoaded', () => {

    const baseUrl = "http://localhost:3000/dogs/"
    //render a list of registerd dogs
    //fetch request to url and get dogs
    //function to take json info and input into table

    const fetchDogs = url => {
        
        fetch(url)
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
                const dogObj = buildDogObjectForForm(e.target);
                putDogObjectInForm(dogObj);
                patchUpdate(baseUrl, e.target)}

                //add a function that will send a patch request
                //function to populate values into the form
             
            // else if (e.target.matches(`[type="submit"]`))
            //     e.preventDefault()
            //     console.log("I work!")
        })
    }

    
            //create a patch request for the input items
            //function to find the dog to update the correct information
                
    

    const formValues = () => {
        const form = document.querySelector("#dog-form");
        
        const dogObj = {
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value
        }
        return dogObj
    }

    const patchUpdate = (url,dog) => {
    
        const submitHandler = () => {
        document.addEventListener("submit", e => {
    

        const dogTd = dog.parentElement;
        const dogTr = dogTd.parentElement;
        const dogId = dogTr.dataset.dogId;

        const values = formValues()

        
        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(values)
        };

        fetch(url + dogId, options)
        .then(response => response.json())
        .then(dogObject => console.log(dogObject))
        })
    }
    submitHandler()
}

    const buildDogObjectForForm = dog => {
        const buttonTd = dog.parentElement;
        const dogTr = buttonTd.parentElement;
        const dogTds = dogTr.querySelectorAll('td');
        const dogName = dogTds[0].textContent;
        const dogBreed = dogTds[1].textContent;
        const dogSex = dogTds[2].textContent;
        
        const dogObj = {
            name: dogName,
            breed: dogBreed,
            sex: dogSex
        }
        
        return dogObj;

    }

    const putDogObjectInForm = dogObj => {
        const form = document.querySelector("#dog-form")
        form.name.value = dogObj.name;
        form.breed.value = dogObj.breed;
        form.sex.value = dogObj.sex;
        console.log(form)
    }


    fetchDogs(baseUrl);
    clickHandler();
    //submitHandler();
})