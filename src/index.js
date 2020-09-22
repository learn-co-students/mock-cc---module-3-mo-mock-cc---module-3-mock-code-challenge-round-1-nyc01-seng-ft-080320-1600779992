document.addEventListener('DOMContentLoaded', () => {

function fetchDogs(){
     fetch("http://localhost:3000/dogs")
     .then(resp => resp.json())
     .then(dogs => {
          renderDogs(dogs)   
     })
}

function renderDogs(dogs){


}






fetchDogs()
})