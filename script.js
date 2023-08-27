const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear")
const filterItem = document.getElementById("filter");

// Event Listeners

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearAll)
filterItem.addEventListener("input", filter);


// Functions
 
function addItem (e) {
  e.preventDefault();
  
  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  
  const li = document.createElement("li");
  const liText = document.createTextNode(`${newItem}`)

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(liText);
  li.appendChild(button);
  itemList.append(li);
  resetUI();

  itemInput.value = "";
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

function removeItem(e) {
  // Mine: 
  // if (e.target.className === ("fa-solid fa-xmark"))

  if (e.target.parentElement.classList.contains("remove-item")) {
    if(confirm("Are you sure you want to delete this item?")) {

      e.target.parentElement.parentElement.remove();
    }
  }

  resetUI();
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
  // Mine:
  // const items = itemList.querySelectorAll("li");
  // items.forEach((item) => item.remove());

  //alternative:
  if(confirm("Are you sure you want to clear the list?")) {
    
    while(itemList.firstChild) {

      itemList.removeChild(itemList.firstChild);
    }
  }

  resetUI();
}

function resetUI() {
  if (!itemList.firstElementChild) {
    filterItem.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterItem.style.display = "block";
    clearBtn.style.display = "block";
  }
}

resetUI();