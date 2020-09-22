const BASE_URL = "http://localhost:3000/dogs/"

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    clickHandler();
    submitHandler()
})

function fetchDogs(){
    fetch(BASE_URL)
    .then(response => response.json())
    .then(dogs => {
        const table = document.getElementById("table-body")
        table.innerHTML = ""
        for (const dog of dogs){
            renderDog(dog)
        }
    })
}

function renderDog(dog){
    const table = document.getElementById("table-body")
    
    let newRow = document.createElement("tr")
    let dogRow = `<td class="name" data-dog-name="${dog.name}" >${dog.name}</td> <td class="breed">${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit" data-dog-id=${dog.id} data-dog-name=${dog.name} data-dog-breed="${dog.breed}" data-dog-sex=${dog.sex} name="submit">Edit Dog</button></td>`
    newRow.innerHTML = dogRow
    table.append(newRow)
    // <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
}

function clickHandler(){
    document.addEventListener('click', e =>{
        if (e.target.classList.contains("edit")){
            fillForm(e.target)
        }
    }
    )
}

function submitHandler(){
    document.addEventListener("submit", e=>{
        e.preventDefault();
        
        const name = (e.target.name.value)
        const breed = (e.target.breed.value)
        const sex = (e.target.sex.value)
        const dogId = (e.submitter.className)
        let formInfo = {name: name, breed: breed, sex: sex}
        // console.log(formInfo)
        if (dogId !== ""){
            updateDog(dogId, formInfo)}
        e.target.reset();
        e.submitter.className = ""
        fetchDogs()
    })
}

function fillForm(button){
    
    const form = document.getElementById("dog-form")
    const submit = form.querySelector(`[type="submit"]`)
    form.name.value = button.dataset.dogName
    form.breed.value = button.dataset.dogBreed
    form.sex.value = button.dataset.dogSex
    submit.classList = button.dataset.dogId
}

function updateDog(id, info){
    
    const configObj = {
        method: "PATCH",
        headers: {"content-type" :"application/json",
        "accepts": "application/json"
    }, body: JSON.stringify(info)
}
    fetch(BASE_URL + id, configObj)
    .then(response => response.json())
    .then(dog => {
        console.log(dog);
        fetchDogs()})
    .catch(error=> console.error("NOOOO"))

}