document.addEventListener('DOMContentLoaded', () => {

    // - On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.

    fetch(`http://localhost:3000/dogs`)
    .then(response => response.json())
    .then(dogsJson => registeredDogs(dogsJson))

   
    const registeredDogs = (dogsJson) => {
        const list = document.getElementsByClassName("padding center")
        list.innerHTML="hello"
        const listName = list[0]
        const listBreed = list[1]
        const listSex = list[2]
        const listEdit = list[3]

     
        const tableHeaders = document.querySelector("thead.blue")
            for (dog in dogsJson) {
                const dogObj = dogsJson[dog]
                const dogName = dogObj.name
                const dogBreed = dogObj.breed
                const dogRow = document.createElement("tr")
                const dogThread = document.createElement("td")
                dogThread.innerText = `${dogName}`
                dogRow.appendChild(dogThread)
                tableHeaders.appendChild(dogRow)                
            }
    }


})