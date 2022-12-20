const dqs = (id) => document.querySelector(id);

const getItem = (keyName) => {
  let item;
  const storedItem = localStorage.getItem(keyName);
  if (storedItem) {
    item = JSON.parse(storedItem);
  } else {
    const toDoItem = [];
    item = { toDoItem };
  }
  return item;
};

const saveItem = (item, keyName) => {
  localStorage.setItem(keyName, JSON.stringify(item));
};

dqs("#search-btn").addEventListener("click", () => {
  const value = dqs("#search").value;
  if (value) {
    const storedItem = getItem("toDoItem");
    storedItem?.toDoItem.indexOf(value) === -1 && storedItem?.toDoItem?.push(value);
    saveItem(storedItem, "toDoItem");
  }
});
