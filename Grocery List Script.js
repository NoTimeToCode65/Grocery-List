const categoryMap = {
  dairy: ['milk', 'cheese', 'butter', 'yogurt', 'cream', 'eggs'],
  meats: ['steak', 'chicken', 'beef', 'pork', 'bacon', 'turkey', 'ham'],
  produce: ['apple', 'banana', 'lettuce', 'carrot', 'tomato', 'onion', 'spinach'],
  bakery: ['bread', 'bagel', 'bun', 'croissant'],
  frozen: ['pizza', 'ice cream', 'frozen', 'waffles'],
  drinks: ['water', 'soda', 'juice', 'tea', 'coffee'],
  other: []
};

let groceryData = {};

function detectCategory(itemText) {
  const lowerItem = itemText.toLowerCase();
  for (const category in categoryMap) {
    if (categoryMap[category].some(keyword => lowerItem.includes(keyword))) {
      return category;
    }
  }
  return 'other';
}

function addItem(itemText, category, isCrossed = false) {
  if (!itemText) return;

  if (!groceryData[category]) {
    groceryData[category] = [];
  }

  groceryData[category].push({ text: itemText, crossed: isCrossed });
  renderList();
  saveToLocalStorage();
}

function renderList() {
  const container = document.getElementById('groceryContainer');
  container.innerHTML = '';

  for (const category in groceryData) {
    if (groceryData[category].length === 0) continue;

    const heading = document.createElement('h2');
    heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    heading.classList.add('category-heading');

    const list = document.createElement('ul');
    list.id = `${category}-list`;

    const sortedItems = groceryData[category].sort((a, b) => a.text.localeCompare(b.text));

    sortedItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.text;
      if (item.crossed) li.classList.add('crossed');

      li.addEventListener('click', () => {
        item.crossed = !item.crossed;
        li.classList.toggle('crossed');
        saveToLocalStorage();
      });

      list.appendChild(li);
    });

    container.appendChild(heading);
    container.appendChild(list);
  }
}

function saveToLocalStorage() {
  localStorage.setItem('groceryList', JSON.stringify(groceryData));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem('groceryList');
  if (stored) {
    groceryData = JSON.parse(stored);
    renderList();
  }
}

function clearList() {
  if (confirm("Are you sure you want to clear the entire grocery list?")) {
    groceryData = {};
    localStorage.removeItem('groceryList');
    renderList();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  loadFromLocalStorage();

  document.getElementById('addButton').addEventListener('click', () => {
    const input = document.getElementById('itemInput');
    const itemText = input.value.trim();
    const category = detectCategory(itemText);
    addItem(itemText, category);
    input.value = '';
  });

  document.getElementById('itemInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const itemText = event.target.value.trim();
      const category = detectCategory(itemText);
      addItem(itemText, category);
      event.target.value = '';
    }
  });

  document.getElementById('clearButton').addEventListener('click', clearList);
});
