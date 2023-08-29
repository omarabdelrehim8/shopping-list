const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear")
const filterItem = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;


// Functions:

// 1. displayItems(): calls getItemsFromStorage() and displays the fetched items on the page after it loads 

// 2. addItemOnSubmit(e): calls two functions, addItemToDom(item) & addItemToStorage(item), when user submits the form

// 3. addItemToDom(item): takes an item and adds it to the dom by inserting the input text into a created list and appending it to the <ul>

// 4. addItemToStorage(item): takes an item and adds it to local storage

// 5. getItemsFromStorage(): fetches items from local storage

// 6. removeItem(e): removes list item when clicking the x button

// 7. createButton(classes): creates a button that has the given classes

// 8. createIcon(classes): creates an icon that has the given classes

// 9. filter(e): used to filter items

// 10. clearAll(): clears all items from <ul>

// 11. resetUI(): hides the filter input and the clear button when there are no list items

// 12. init(): function that is called immediately, only used to make the code look cleaner and not have the event listeners in the global scope

// 13. onClickItem(e): runs a specific function based on which part of the item is clicked

function init() {
  
  //Event listeners

  itemForm.addEventListener("submit", addItemOnSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearAll)
  filterItem.addEventListener("input", filter);
  document.addEventListener("DOMContentLoaded", displayItems);
  
  resetUI();
}


function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  resetUI();
}


function addItemOnSubmit(e) {
  e.preventDefault();
  
  const item = itemInput.value;
  
  // Validate Input
  if (item === "") {
    alert("Please add an item");
    return;
  }
  
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(item)) {
      alert('That item already exists!');
      return;
    }
  }
  addItemToDom(item);
  addItemToStorage(item);
  resetUI();
}


function addItemToDom(item) {
  
  const li = document.createElement("li");
  const liText = document.createTextNode(`${item}`)
  
  const button = createButton("remove-item btn-link text-red");
  
  li.appendChild(liText);
  li.appendChild(button);
  itemList.append(li);
}


function addItemToStorage(item) {
  
  const itemsFromStorage = getItemsFromStorage();
  
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage))
}


function getItemsFromStorage() {
  let itemsFromStorage;
  
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"))
  }

  return itemsFromStorage;
}


function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItemFromDom(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}


function removeItemFromDom(item) {
  
  if(confirm("Are you sure you want to delete this item?")) {
      
    item.remove();
  }

  removeItemFromStorage(item.textContent);
  resetUI();
}


function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function setItemToEdit(item) {
  isEditMode = true;

  
  itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));


  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  
  return button;
}


function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  
  return icon; 
}


function filter(e) {
  
  const inputText = e.target.value.toLowerCase();
  
  const items = itemList.querySelectorAll("li");
  
  items.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();
    
    if (itemText.indexOf(inputText) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  })
  
}


function clearAll() {

  if(confirm("Are you sure you want to clear the list?")) {
    
    while(itemList.firstChild) {
      
      itemList.removeChild(itemList.firstChild);
    }
  }

  localStorage.removeItem('items');

  resetUI();
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}


function resetUI() {
  itemInput.value = '';

  if (!itemList.firstElementChild) {
    filterItem.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterItem.style.display = "block";
    clearBtn.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}


init();

