document.addEventListener('DOMContentLoaded', () => {
   const baseUrl = "http://localhost:3000/dogs/"
    
   const fetchDogs = () => {
    fetch(baseUrl)
    .then(res => res.json())
    .then(data => renderDogs(data))
   };

   const renderDogs = (dogs) => {
    const tableBody = document.querySelector('#table-body')
    tableBody.innerHTML = ''     
    for (let dog of dogs) {
           renderDog(dog, tableBody)
       }
   };

   const renderDog = (dog, body) => { 
    const dogTr = document.createElement('tr')
    dogTr.dataset.dogId = dog.id

    dogTr.innerHTML = `
    <td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button>Edit</button></td>
    `
    body.append(dogTr)
   };
//clicking edit puts dsingle dog info to form
//so get data from table
//populate form with that data

    const clickHandler = () => {
        document.addEventListener("click", (e) =>{
            if (e.target.textContent === "Edit") {

                const dogForm = document.querySelector("#dog-form")
                const dogRow = e.target.closest('tr')
                const dogId = dogRow.dataset.dogId

                const cells = dogRow.children

                const name = cells[0].textContent
                const breed = cells[1].textContent
                const sex = cells[2].textContent

                dogForm.dataset.dogId = dogId
                dogForm.name.value = name
                dogForm.breed.value = breed
                dogForm.sex.value = sex
            };
        });
    };

    const submitHandler = () =>{
       document.addEventListener("submit", e => {
        e.preventDefault()
            const dogForm = e.target
            let dogId = dogForm.dataset.dogId 
            let name = dogForm.name.value 
            let breed = dogForm.breed.value 
            let sex = dogForm.sex.value 
            
            const dog = {
                name: name,
                breed: breed,
                sex: sex,
            }
        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(dog)
        }
        fetch(baseUrl + dogId, options)
        .then(res => res.json())
        .then(dog => fetchDogs())
       }); 
    }
submitHandler();
clickHandler();    
fetchDogs()

});

    

