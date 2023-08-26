const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

// Event Listeners

itemForm.addEventListener("submit", addItem)


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