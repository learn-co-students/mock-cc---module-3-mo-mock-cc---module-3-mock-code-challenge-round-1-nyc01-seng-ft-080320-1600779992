document.addEventListener('DOMContentLoaded', () => {

    const baseUrl = " http://localhost:3000/dogs"
    
    function fetchDogs(baseUrl) {
        fetch (baseUrl)
        .then (resp => resp.json())
        .then (data => renderDogs(data))
    }

    function renderDogs(dogsArray) {
        for (const dog of dogsArray) {
            renderSingleDog(dog); 
            }
    }

    function renderSingleDog(dogObj) {
        const dogTable = document.querySelector('table')
        const dogRow = document.createElement('tr')
        dogRow.classList.add('dog-row')
        dogRow.dataset.dogId = dogObj.id
        
        dogRow.innerHTML = `
            <td>${dogObj.name}</td>
            <td>${dogObj.breed}</td>
            <td>${dogObj.sex}</td>
            <td><button class="edit">Edit Dog</button</td>
            <button
        `
        dogTable.appendChild(dogRow)
        
    };

    function clickHandler() {

        document.addEventListener('click', e => {
            if (e.target.matches("edit")) {
                const editButton = e.target
                const editForm = document.querySelector("#dog-form")
                const dogId = editButton.dataset.dogId

            };

        });

    };

    function editExistingDogs(dogObj) {
        const dogForm = document.querySelector("#dog-form")
        
    };

    function dogUpdate() {
        const options = {
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({dogObj})

        }
        fetch(baseUrl + dogId, options)
        .then(response => response.json())
        .then (data => console.log(data))

    };

    clickHandler();
    fetchDogs(baseUrl);
});

