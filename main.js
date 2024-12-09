let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];


const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const itemList = document.getElementById('itemList');

// Function to display the shopping list
function displayList() {
    itemList.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.text;
        li.className = item.bought ? 'bought' : '';
        
        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editItem(index);
        
        // Mark bought button
        const markButton = document.createElement('button');
        markButton.textContent = item.bought ? 'Unmark' : 'Mark Bought';
        markButton.onclick = () => markBought(index);
        
        li.appendChild(markButton);
        li.appendChild(editButton);
        itemList.appendChild(li);
    });
}

// Function to add a new item
function addItem() {
    const itemText = itemInput.value.trim();
    if (itemText) {
        shoppingList.push({ text: itemText, bought: false });
        itemInput.value = '';
        saveToLocalStorage();
        displayList();
    }
}

// Function to mark an item as bought
function markBought(index) {
    shoppingList[index].bought = !shoppingList[index].bought;
    saveToLocalStorage();
    displayList();
}

// Function to edit an existing item
function editItem(index) {
    const newText = prompt("Edit item:", shoppingList[index].text);
    if (newText !== null) {
        shoppingList[index].text = newText.trim();
        saveToLocalStorage();
        displayList();
    }
}

// Function to clear item that matches input text
function clearItemByText() {
    const itemText = itemInput.value.trim(); 
    if (itemText) {
        // Filter out the item that matches the input text
        shoppingList = shoppingList.filter(item => item.text !== itemText);
        displayList(); 
        itemInput.value = ''; 
    } else {
        alert("Please enter an item to remove.");
    }
}


// Function to save the list to local storage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Event listeners
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearItemByText);

// Initial display
displayList();