document.addEventListener('DOMContentLoaded', () => {

  function fetchDogs() {
    fetch('http://localhost:3000/dogs')
      .then(resp => resp.json())
      .then(data => {
        for (const dogObj of data) {
          displayDog(dogObj)
        }
      })
  }

  function displayDog(dogObj) {
    const newTr = document.createElement('tr')
    newTr.id = `dog-${dogObj.id}`
    newTr.innerHTML = `
      <td>${dogObj.name}</td>
      <td>${dogObj.breed}</td>
      <td>${dogObj.sex}</td>
      <td><button id='edit-btn' data-id=${dogObj.id}>Edit</button></td>
      `
    document.querySelector('#table-body').append(newTr)
  }

  function getDogInfo(dogId) {
    fetch(`http://localhost:3000/dogs/${dogId}`)
      .then(resp => resp.json())
      .then(data => populateForm(data))
  }

  function populateForm(dogObj) {
    const dogForm = document.querySelector('#dog-form')
    dogForm.name.value = dogObj.name
    dogForm.breed.value = dogObj.breed
    dogForm.sex.value = dogObj.sex
    dogForm.submit.dataset.id = dogObj.id
  }

  function updateDog(dogId, dogInfo) {
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(dogInfo)
    }
    fetch(`http://localhost:3000/dogs/${dogId}`, options)
      .then(resp => resp.json())
      .then(data => findAndUpdateDog(data))
  }

  function findAndUpdateDog(dogObj) {
    const dogTr = document.querySelector(`#dog-${dogObj.id}`)
    dogTr.innerHTML = `
      <td>${dogObj.name}</td>
      <td>${dogObj.breed}</td>
      <td>${dogObj.sex}</td>
      <td><button id='edit-btn' data-id=${dogObj.id}>Edit</button></td>
      `
  }

  document.addEventListener('click', e => {
    if(e.target.id == 'edit-btn'){
      getDogInfo(e.target.dataset.id)
    }    
  })

  document.addEventListener('submit', e => {
    e.preventDefault()
    const options = {
      name: e.target.name.value,
      breed: e.target.breed.value,
      sex: e.target.sex.value
    }
    e.target.reset()
    updateDog(e.target.submit.dataset.id, options)
  })

  fetchDogs()
})