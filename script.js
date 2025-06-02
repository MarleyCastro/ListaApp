const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const list = document.getElementById("shopping-list");

let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

// Recarrega os itens ao abrir o site
items.forEach(renderItem);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const itemText = input.value.trim();
  if (itemText === "") return;

  const item = {
    id: Date.now(),
    name: itemText,
    done: false,
  };

  items.push(item);
  saveAndRender();
  input.value = "";
});

function renderItem(item) {
  const li = document.createElement("li");
  li.textContent = item.name;
  li.className = item.done ? "done" : "";
  li.addEventListener("click", () => toggleDone(item.id));

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "🗑️";
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeItem(item.id);
  });

  li.appendChild(removeBtn);
  list.appendChild(li);
}

function saveAndRender() {
  localStorage.setItem("shoppingList", JSON.stringify(items));
  list.innerHTML = "";
  items.forEach(renderItem);
}

function toggleDone(id) {
  items = items.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item
  );
  saveAndRender();
}

function removeItem(id) {
  items = items.filter((item) => item.id !== id);
  saveAndRender();
}
