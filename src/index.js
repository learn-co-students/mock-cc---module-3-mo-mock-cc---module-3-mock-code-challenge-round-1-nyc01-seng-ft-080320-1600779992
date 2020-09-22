document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded")
    const tableBody = document.getElementById('table-body')
    let form = document.getElementById('dog-form')
    DOGS_URL = " http://localhost:3000/dogs"


    function renderDog(dog) {
        newTr = document.createElement('tr')
        newTr.className = dog.name
        newTr.dataset.id = dog.id
        newTr.innerHTML = `
        <td id="name">${dog.name}</td>
        <td id="breed">${dog.breed}</td>
        <td id="sex">${dog.sex}</td>
        <button class="edit-btn">Edit Dog</button>
        `
        tableBody.append(newTr)
    }

    function getDogs() {
        tableBody.innerHTML = ''
        fetch(DOGS_URL)
        .then(resp => resp.json())
        .then(dogs => { 
            dogs.forEach(dog => {
                renderDog(dog)
            })
        })
    };

    function renderForm(dog) {
        let name = dog.querySelector('#name')
        let breed = dog.querySelector('#breed')
        let sex = dog.querySelector('#sex')
        let id = dog.getAttribute('data-id')
        form.setAttribute('data-id', id)
        form.name.value = name.textContent
        form.breed.value = breed.textContent
        form.sex.value = sex.textContent
    }

    function editDog(dog) {
        console.log(dog) 
        let dogId = dog.getAttribute('data-id')

        fetch(DOGS_URL + '/' + dogId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "name": form.name.value,
            "breed": form.breed.value,
            "sex": form.sex.value
        })
        })
        .then(resp => resp.json())
        .then(setInterval(getDogs(), 2000))
}

    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('.edit-btn')) {
                renderForm(e.target.parentNode)
            }
        })
    }

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault();
            editDog(e.target);
            form.reset();
        })
    }
    submitHandler();
    clickHandler();
    getDogs();
})