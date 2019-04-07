let container = document.getElementsBySelector('#excluded-repeat-container') [0];
let nameWrapper = document.createElement('div');
nameWrapper.setAttribute('name', 'excludedDates');
let singleDataContainer = document.createElement('input');
singleDataContainer.setAttribute('name', '_.jsonData');
singleDataContainer.setAttribute('value', JSON.stringify({ name: 10 }));

nameWrapper.appendChild(singleDataContainer);
container.appendChild(nameWrapper);
