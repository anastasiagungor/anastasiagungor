const itemInput = document.querySelector('.item-input');
const filter = document.querySelector('.filter-input');
const addButton = document.querySelector('.add-button');
const clearButton = document.getElementById('clear');
const listItems = document.querySelector('.list');
const itemForm = document.getElementById('form');
let isEditMode = false;

function displayItems () {

    const itemsFromStorage = getItemsFromLocalStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
};

function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;

    if(newItem === '') {
        alert('Please enter an item');
        return;
    }

    //Check if editMode
    if (isEditMode) {
        const itemToEdit = listItems.querySelector('.edit-mode');

        removeItemFromLocalStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            alert ('That item already exists!');
            return;
        }
    }

    //Create DOM item
    addItemToDOM(newItem);

    //add item to local storage
    addItemToLocalStorage(newItem);

    checkUI();

    itemInput.value = '';
    
};

//Create button and icon functions
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('images/Shopping List/Vector.svg');
    button.appendChild(icon);
    return button;
}

function createIcon (source) {
    const icon = document.createElement('img');
    icon.src = source;
    return icon;
}

function addItemToDOM (item) {
     //Create new Item
     const li = document.createElement('li');
     li.appendChild(document.createTextNode(item));
 
     const button = createButton('delete');
 
     li.appendChild(button);
     listItems.appendChild(li);
}

function addItemToLocalStorage (item) {
    const itemsFromStorage = getItemsFromLocalStorage();

    //Add new item to array
    itemsFromStorage.push(item);

    //Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromLocalStorage () {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function onClickItem (e) {
    if (e.target.parentElement.classList.contains('delete')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }

}

function checkIfItemExists (item) {
    const itemsFromStorage = getItemsFromLocalStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit (item) {
    isEditMode = true;

    listItems.querySelectorAll('li').forEach((item) => item.classList.remove('edit-mode'));

    item.classList.add('edit-mode');

    addButton.innerHTML = 'Edit Item <img src="images/Shopping List/Edit.svg" alt="Edit icon" class="s-icon">';
    addButton.style.backgroundColor = '#B2EFC8';
    addButton.style.borderColor = '#B2EFC8';
    addButton.addEventListener('mouseover', () => addButton.style.backgroundColor = '#DAF3E3');
    addButton.addEventListener('mouseout', () => addButton.style.backgroundColor = '#B2EFC8');

    itemInput.value = item.textContent;
}

function removeItem (item) {
    if (confirm ('Are you sure?')){
        //Remove item from DOM
        item.remove();

        //Remove item from Local Storage
        removeItemFromLocalStorage(item.textContent);
    }

    checkUI();
    
}

function removeItemFromLocalStorage (item) {
    let itemsFromStorage = getItemsFromLocalStorage();

    //Filter out items to be removed
    itemsFromStorage = itemsFromStorage.filter((i)=> i !== item);

    //Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeAll (e) {
    while (listItems.firstChild) {
        listItems.removeChild(listItems.firstChild);
    }

    //Remove from local storage
    localStorage.removeItem('items');

    checkUI();
}

function filterItems (e) {
    const text = e.target.value.toLowerCase();
    const items = listItems.querySelectorAll('li');

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        };
    });

    
}


function checkUI () {
    itemInput.value = '';

    const items = listItems.querySelectorAll('li');
    if (items.length === 0) {
        filter.style.display = 'none';
        clearButton.style.display = 'none';
    } else {
        filter.style.display = 'block';
        clearButton.style.display = 'block';
    }

    addButton.innerHTML = 'Add Item <img src="images/Shopping List/add.svg" alt="add button icon" class="s-icon">';
    addButton.style.backgroundColor = '#E2BD7C';
    addButton.style.borderColor = '#E2BD7C';
    addButton.addEventListener('mouseover', () => addButton.style.backgroundColor = 'rgba(226, 189, 124, 0.4)');
    addButton.addEventListener('mouseout', () => addButton.style.backgroundColor = '#E2BD7C');

    isEditMode=false;
}

//Initialize app
function init() {
    //Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    listItems.addEventListener('click', onClickItem);
    clearButton.addEventListener('click', removeAll);
    filter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();

