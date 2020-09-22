document.addEventListener('DOMContentLoaded', () => {

const tableBody = document.querySelector('#table-body')
const dogForm = document.querySelector("#dog-form")



function fetchDogs(){
     fetch("http://localhost:3000/dogs")
     .then(resp => resp.json())
     .then(dogs => {
          renderDogs(dogs)   
     })
}

function fetchSingleDog(id){
     fetch("http://localhost:3000/dogs" + `/${id}`)
     .then(resp => resp.json())
     .then(dog =>{
          renderForm(dog)

     })

}

function renderDogs(dogs){
     for(let dog of dogs){
          const tableRow = document.createElement("tr")
          tableRow.dataset.id = dog.id 
          tableRow.innerHTML = 
          `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td></tr>`
          tableRow.addEventListener('click', editClick)
          tableBody.append(tableRow)
     }

}

function editClick(e){
     renderForm(e.target.dataset.id)
     fetchSingleDog(e.target.dataset.id)

}

// function renderForm(dog){
//      const dogFormName = document.querySelector("#dog-form").firstElementChild
//      // dogFormName.dataset.id = dog.id 
//      dogFormName.textContent = dog.name
//      dogForm.append(dogFormName)
//      }

function renderForm(dog){
     const dogFormName = document.querySelector("#dog-form").firstElementChild
     dogFormName.textContent = dog.dataset.id.name
     dogForm.append(dogFormName)
   
}


fetchSingleDog()
fetchDogs()
})