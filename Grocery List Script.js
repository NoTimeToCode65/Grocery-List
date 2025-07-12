function addItem() {
  const input = document.getElementById('itemInput');
  const itemText = input.value.trim();

  if (itemText !== "") {
    const list = document.getElementById('groceryList');

    const li = document.createElement('li');
    li.textContent = itemText;
    li.classList.add('list-item');

    li.addEventListener('click', function () {
      li.classList.toggle('crossed');
    });

    list.appendChild(li);
    input.value = "";

    sortListAlphabetically();
  }
}

function sortListAlphabetically() {
  const list = document.getElementById('groceryList');
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

