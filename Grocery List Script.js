const categoryMap = {
  dairy: ['milk', 'cheese', 'butter', 'yogurt', 'cream', 'eggs'],
  meats: ['steak', 'chicken', 'beef', 'pork', 'bacon', 'turkey', 'ham'],
  produce: ['apple', 'banana', 'lettuce', 'carrot', 'tomato', 'onion', 'spinach'],
  bakery: ['bread', 'bagel', 'bun', 'croissant'],
  frozen: ['pizza', 'ice cream', 'frozen', 'waffles'],
  drinks: ['water', 'soda', 'juice', 'tea', 'coffee'],
  other: [] 
};

function detectCategory(itemText) {
  const lowerItem = itemText.toLowerCase();
  for (const category in categoryMap) {
    if (categoryMap[category].some(keyword => lowerItem.includes(keyword))) {
      return category;
    }
  }
  return 'other';
}

function addItem() {
  const input = document.getElementById('itemInput');
  const itemText = input.value.trim();
  if (itemText === "") return;

  const category = detectCategory(itemText);
  let list = document.getElementById(`${category}-list`);

  if (!list) {
    const container = document.getElementById('groceryContainer');

    const heading = document.createElement('h2');
    heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    heading.classList.add('category-heading');

    list = document.createElement('ul');
    list.id = `${category}-list`;

    container.appendChild(heading);
    container.appendChild(list);
  }

  const li = document.createElement('li');
  li.textContent = itemText;
  li.classList.add('list-item');

  li.addEventListener('click', function () {
    li.classList.toggle('crossed');
  });

  list.appendChild(li);
  sortListAlphabetically(list);

  input.value = "";
}

function sortListAlphabetically(list) {
  const items = Array.from(list.children);
  items.sort((a, b) => a.textContent.localeCompare(b.textContent));
  list.innerHTML = '';
  items.forEach(item => list.appendChild(item));
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('addButton').addEventListener('click', addItem);

  document.getElementById('itemInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      addItem();
    }
  });
});
