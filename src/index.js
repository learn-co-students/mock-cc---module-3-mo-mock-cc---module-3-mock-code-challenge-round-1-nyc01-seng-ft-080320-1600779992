document.addEventListener('DOMContentLoaded', () => {
    const table  = document.getElementById('table-body');
    // fetch all dogs from DB
    let promisedDogs = dbDogs(getUrl('dogs'),null);
    // Render HTML Table with the Dogs data from DB
    promisedDogs.then(allDogs => renderDogs(table, allDogs));
    console.log(promisedDogs);

    // setup General click event Listener
    setupClickListener();

    // setup Submit event Listener
    setupSubmitListener();
})

function getUrl(endpoint){
    let baseURL = 'http://localhost:3000/';
    if (endpoint){
        baseURL += endpoint;
    }
    return baseURL;
}

function dbDogs(url, options){
    console.log("fetching from:", url, "With options:", options );
    if (options){
        return fetch(url, options).then(resp => resp.json());
    }else{
        return fetch(url).then(resp => resp.json());
    }
}

function renderDogs(container, allDogs){
    for(let dog of allDogs){
        container.appendChild(renderDog(null, dog));
    }
}

function renderDog(container, dog){
    const row = document.createElement('tr');
    row.dataset.dogId = dog.id;
    row.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id='edit-btn' data-dog-id='${dog.id}'>Edit</button></td>
    `
    if(container){
        container.appendChild(row);
    }
    return row;
}

function setupClickListener(){
    document.addEventListener('click', e => {
        if (e.target.matches('#edit-btn')){
            editDog(e.target.dataset.dogId);
        }
    })
}

function editDog(dogId){
    console.log(dogId);
    let dogURL = getUrl('dogs/')+dogId;
    let selectedDog = dbDogs(dogURL, null);
    console.log(selectedDog);
    selectedDog.then(dog => parseDataForm(dog));
}

function parseDataForm(dog){
    const form = document.getElementById('dog-form');
    form.name.value = dog.name;
    form.breed.value = dog.breed;
    form.sex.value = dog.sex;
    form.dataset.dogId = dog.id;
}

function setupSubmitListener(){
    const form = document.getElementById('dog-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const form = e.target;
        const jsonDog = {
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value,
        }
        const options = buildOptions(jsonDog, "PATCH");
        console.log("built options:", options);
        submitChanges(form.dataset.dogId, options);
    })
}

function buildOptions(jsonDog, method){
    let options = {
        method: method,
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(jsonDog)
    }
    return options;
}

function submitChanges(dogId, options){
    let updatedDog = dbDogs(getUrl('dogs/')+dogId, options);
    updatedDog.then(dbDog => updateDOM(dbDog));
}

function updateDOM(dbDog){
    console.log(dbDog);
    const row = getRelevantRow(dbDog.id);
    row.innerHTML = `
        <td>${dbDog.name}</td>
        <td>${dbDog.breed}</td>
        <td>${dbDog.sex}</td>
        <td><button id='edit-btn' data-dog-id='${dbDog.id}'>Edit</button></td>
    `;
}

function getRelevantRow(dogId){
    let row = document.querySelector(`tr[data-dog-id = "${dogId}"]`);
    return row;
}