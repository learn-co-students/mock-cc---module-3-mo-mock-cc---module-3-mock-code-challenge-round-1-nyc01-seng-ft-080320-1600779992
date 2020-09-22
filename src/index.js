const renderDogs = (dogs) => {
  const tableBody = document.querySelector('#table-body');
  for (dog of dogs) {
    const newRow = document.createElement('tr');
    
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
      console.log('button clicked')
    }
  });

  document.addEventListener('submit', e => {
    e.preventDefault();
    console.log('submitted')
  });
};

document.addEventListener('DOMContentLoaded', () => {

  // keeping this fetch request inline for now -- might try to figure out how 
  // to make it its own function later, but it's complicated to get working
  fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(json => renderDogs(json));

  clickHandler();
});