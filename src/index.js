//example dogo
// 0:
// breed: "Scottish Deerhound"
// id: 1
// name: "Baby"
// sex: "male"

//globoz
const baseURL = 'http://localhost:3000/'

//fnnies
function DogHasher(name, breed, sex) {
    this.name = name;
    this.breed = breed;
    this.sex = sex;
}
const updateDogTable = (updatedDog) => {
    const dogRow = document.querySelector(`tr[data-dog-id = '${updatedDog.id}']`)
    //console.log(dogRow);
    const dogTds = dogRow.querySelectorAll('td');
    dogTds[0].textContent = updatedDog.name;
    dogTds[1].textContent = updatedDog.breed;
    dogTds[2].textContent = updatedDog.sex;
}

const submitBoi = () => {

    document.addEventListener('submit', e => {
        e.preventDefault();
        const dogForm = document.getElementById('dog-form');
        const dogId = dogForm.lastElementChild.dataset.dogId;
        const dogHash = new DogHasher(dogForm.name.value, dogForm.breed.value, dogForm.sex.value);
        console.log(dogHash);
        const config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
            },
            body: JSON.stringify(dogHash)
        }

        fetch(baseURL + 'dogs' + `/${dogId}`, config).then(resp => resp.json()).then(updatedDog => {
            //console.log(updatedDog);
            dogForm.reset();
            updateDogTable(updatedDog);
        })

    });
}

const fillFormFromEdit = (button) => {
    const dogId =  button.dataset.dogId;
    const dogRow = document.querySelector(`[data-dog-id='${dogId}']`);
    const rowCollection = dogRow.querySelectorAll('td');
    const dogForm = document.getElementById('dog-form');
    const submitBtn = dogForm.lastElementChild;
    //map doesnt work :(
    let rowArray = [];

    rowCollection.forEach((td, index) => {
        rowArray.push(td.textContent);
    });

    dogForm.name.value = rowArray[0];
    dogForm.breed.value = rowArray[1];
    dogForm.sex.value = rowArray[2];
    submitBtn.setAttribute('data-dog-id', `${dogId}`);
}


const clickBoi = () => {
    document.addEventListener('click', e => {
        if (e.target.matches('.edit-btn')) {
            fillFormFromEdit(e.target);

        }
    });
}

const createDogTableRow = (dogObj) => {
    let dogRow = document.createElement('tr');
    dogRow.dataset.dogId = `${dogObj.id}`;
    dogRow.innerHTML = `<td>${dogObj.name}</td> <td>${dogObj.breed}</td> <td>${dogObj.sex}</td> <td><button class="edit-btn" data-dog-id ='${dogObj.id}'>Edit</button></td>`;
    return dogRow;
}
const renderDogEl = (dogDomEl) => {
    //console.log(dogDomEl);
    const tableNode = document.querySelector('#table-body')
    tableNode.appendChild(dogDomEl);
}

const renderDogs = (dogsCollection) => {
    for (let dog of dogsCollection) {
        let dogRow = createDogTableRow(dog);
        renderDogEl(dogRow);
    }
};

const initDogs = () => {
    fetch(baseURL + 'dogs').then(resp => resp.json()).then(dogs =>{
        renderDogs(dogs);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initDogs();
    clickBoi();
    submitBoi();
})