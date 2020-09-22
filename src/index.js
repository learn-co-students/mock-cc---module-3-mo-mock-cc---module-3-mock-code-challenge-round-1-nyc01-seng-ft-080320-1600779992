document.addEventListener('DOMContentLoaded', () => {

 // do a get request to the the dog url and render it doing  iteration
 // get a query selector for the table,create the table and append it
 // to the dom.
 const tBody = document.querySelector('#table-body')
 const form = document.querySelector('#dog-form')
 const Url = "http://localhost:3000/dogs"
 const getDogs = () => {
  fetch(Url)
   .then(res => res.json())
   .then(dogs => renderDogs(dogs))
 }
 // iterate throught the dog array
 const renderDogs = dogs => {
  dogs.forEach(dog => renderDog(dog))
 }
 //create a dog table
 const renderDog = dog => {
  const row = document.createElement('tr')
  row.innerHTML = `<tr><td>${dog.name}</td> 
  <td>${dog.breed}</td>
   <td>${dog.sex}</td> 
   <td><button data-dog-id = ${dog.id} >Edit</button></td></tr>`
  //console.log(row)
  tBody.append(row)
 }
 // to make a dog editable
 //1. add an event listener to the button edit
 //2. get the information of the dog( name, breed and sex)
 //3. populate it to the the form by getting the form and equaling its value to the table info of the dog
 const clickHandler = () => {

  document.addEventListener('click', e => {
   //console.log('clicking')
   if (e.target.textContent === 'Edit') {
    //console.log('button clicking')
    const table = e.target
    const individualRow = table.closest('tr')
    //console.log(individualRow.children[0].textContent)
    const dogName = individualRow.children[0].textContent
    const dogBreed = individualRow.children[1].textContent
    const dogSex = individualRow.children[2].textContent
    //consolelog(dogName, dogBreed, dogSex)
    //const form = document.querySelector('#dog-form')
    //console.log(form)
    // get the form attribute value and equal it to the attribute in the table accordanly
    form.name.value = dogName
    form.breed.value = dogBreed
    form.sex.value = dogSex

   }





  })
 }

 const submitHandler = () => {
  form.addEventListener('submit', e => {
   e.preventDefault()
   const formNode = e.target
   //console.log(formNode)
   const name = form.name.value
   const breed = form.breed.value
   const sex = form.sex.value
   //console.log(name, breed, sex)

   const options = {
    method: "POST",
    headers: {
     "content-type": "application/json",
     "accept": "application/json"
    },
    body: JSON.stringify({ name: name, breed: breed, sex: sex })

   }
   fetch(Url + id, options)
    .then(res => res.json())
    .then(dog => getDogs())


  })
 }










 getDogs()
 clickHandler()
 submitHandler()


})