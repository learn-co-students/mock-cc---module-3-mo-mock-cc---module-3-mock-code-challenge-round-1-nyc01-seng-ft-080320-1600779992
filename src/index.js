document.addEventListener('DOMContentLoaded', () => {

    baseUrl = `http://localhost:3000/`

    const getDogs = () => { 
        fetch(baseUrl+`dogs`)
        .then(resp => resp.json())
        .then(dogs => 
            dogs.forEach(dog => {
                renderDog(dog)
        })
    )}

    const patchDogs = (dog) => {

        fetch(baseUrl+`dogs/${dog.id}`, {
            method: 'PATCH',
            headers: {"content-type": "application/json",
                     "accept": "application/json"},
            body: JSON.stringify(dog)
        })
        .then(resp => resp.json)
        .then(dog => dog)

    }


    const renderDog = (dogObj) => {

        const tableBody = document.getElementById("table-body")
        const dogRow = document.createElement("tr")
        const nameData = document.createElement("td")
        const breedData = document.createElement("td")
        const sexData = document.createElement("td")
        const editButton = document.createElement("button")

        dogRow.id = dogObj.id
        nameData.id = "name"
        breedData.id = "breed"
        sexData.id = "sex"
        editButton.id = "edit-button"
    
        nameData.textContent = `${dogObj.name}`
        nameData.setAttribute("value", `${dogObj.name}`)
        breedData.textContent = `${dogObj.breed}`
        breedData.setAttribute("value", `${dogObj.breed}`)
        sexData.textContent = `${dogObj.sex}`
        sexData.setAttribute("value", `${dogObj.sex}`)
        editButton.textContent = `Edit Dog`

        tableBody.append(dogRow)
        dogRow.append(nameData)
        dogRow.append(breedData)
        dogRow.append(sexData)
        dogRow.append(editButton)

    }

    const dogForm = () => {



    
    }

    const dogInfo = (dog) => {
        const doggo = document.getElementById("dog-form")  
        doggo.name.value = dog.name
        doggo.breed.value = dog.breed
        doggo.sex.value = dog.sex
    }

    document.addEventListener("click", (e) => {
        e.preventDefault();
        if(e.target.id === "edit-button")
        {
            newdog = {}
            doggo = e.target.parentElement.children
            name = doggo.name.innerText
            breed = doggo.breed.innerText
            sex = doggo.sex.innerText
            newdog.id = e.target.parentElement.id
            newdog.name = name
            newdog.breed = breed
            newdog.sex = sex
            console.log(newdog)
            dogInfo(newdog)

        }

    })

   const submitHandler = (e) => {
        e.preventDefault();
   }


      

    //functions
    getDogs();
})


{/* <form action="#" method="get" onsubmit="genarate('hiddenField')">
   <input type="hidden" id="hiddenField" name="hidden" value=""/>
   <input type="submit" name="submit"/>
</form>
<script>
function genarate(hiddenField){
  var field = document.getElementById(hiddenField);
  field.value = "new Value";
}
</script> */}


// <div class="margin flex">
// <h4 class='center'>Registered Dogs</h4>
// <table class='margin' border="1">
//   <thead class='blue'>
//     <tr class='padding'>
//       <th class='padding center'>Name</th>
//       <th class='padding center'>Breed</th>
//       <th class='padding center'>Sex</th>
//       <th class='padding center'>Edit Dog</th>
//     </tr>
//   </thead>
//   <tbody id="table-body">
//   </tbody>
// </table>
// </div>
// </div>
// </body>
// </html>