const getDogs = () => {
  fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(json => renderDogs(json));
}

const renderDogs = (dogs) => {
  const tableBody = document.querySelector('#table-body');

  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }

  for (dog of dogs) {
    const newRow = document.createElement('tr');
    newRow.dataset.dogId = dog.id;
    
    const newName = document.createElement('td');
    newName.textContent = dog.name;
    newRow.append(newName);

    const newBreed = document.createElement('td');
    newBreed.textContent = dog.breed;
    newRow.append(newBreed);

    const newSex = document.createElement('td');
    newSex.textContent = dog.sex;
    newRow.append(newSex);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    newRow.append(editButton);

    tableBody.append(newRow);
  }
};

const clickHandler = () => {
  document.addEventListener('click', e => {
    if (e.target.matches('button')) {
      const nameTd = e.target.parentNode.firstChild;
      const dogName = nameTd.textContent;
      const breedTd = nameTd.nextSibling;
      const dogBreed = breedTd.textContent;
      const sexTd = breedTd.nextSibling;
      const dogSex = sexTd.textContent;
      
      const dogForm = document.querySelector('#dog-form');
      dogForm.dataset.dogId = e.target.parentNode.dataset.dogId;
      const inputFields = document.querySelectorAll('input');
      inputFields[0].value = dogName;
      inputFields[1].value = dogBreed;
      inputFields[2].value = dogSex;
    }
  });

  document.addEventListener('submit', e => {
    e.preventDefault();
    const dogForm = document.querySelector('#dog-form');
    const dogId = dogForm.dataset.dogId;
    const inputFields = document.querySelectorAll('input');
    const dogName = inputFields[0].value;
    const dogBreed = inputFields[1].value;
    const dogSex = inputFields[2].value;
    
    for (i = 0; i < 3; i ++) {
      inputFields[i].value = '';
    }
    
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: dogName,
        breed: dogBreed,
        sex: dogSex
      })
    })
      .then(resp => resp.json())
      .then(json => getDogs());
  });
};

document.addEventListener('DOMContentLoaded', () => {

  getDogs();

  clickHandler();
});