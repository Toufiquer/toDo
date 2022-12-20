const dqs = (id) => document.querySelector(id);

const getItem = (keyName) => {
  let item;
  const storedItem = localStorage.getItem(keyName);
  console.log(storedItem, " => Line No: 6");
  if (storedItem) {
    item = JSON.parse(storedItem);
  } else {
    if (keyName === "toDoItem") {
      const toDoItem = [];
      item = { toDoItem };
    } else if (keyName === "doneItem") {
      const doneItem = [];
      item = { doneItem };
    }
  }
  return item;
};

const saveItem = (item, keyName) => {
  localStorage.setItem(keyName, JSON.stringify(item));
};

const removeItem = (value, divName) => {
  const storedItem = getItem(divName);
  console.log(value, divName, storedItem, " => Line No: **");
  let newItem;
  if (divName === "toDoItem") {
    newItem = storedItem?.toDoItem?.filter((item) => item !== value);
    storedItem[divName] = newItem;
    saveItem(storedItem, divName);
    showItem();
  } else if (divName === "doneItem") {
    newItem = storedItem?.doneItem?.filter((item) => item !== value);
    storedItem[divName] = newItem;
    saveItem(storedItem, divName);
    showItem();
    console.log(divName, " => Line No: 37");
  }
};
const doneItem = (value) => {
  console.log("done", value, " => Line No: 43");
  removeItem(value, "toDoItem");
  const storedItem = getItem("doneItem");
  storedItem?.doneItem?.indexOf(value) === -1 && storedItem?.doneItem?.push(value);
  saveItem(storedItem, "doneItem");
  showItem();
};

dqs("#search-btn").addEventListener("click", () => {
  const value = dqs("#search").value;
  if (value) {
    const storedItem = getItem("toDoItem");
    console.log(storedItem, " => Line No: 54");
    storedItem?.toDoItem?.indexOf(value) === -1 && storedItem?.toDoItem?.push(value);
    saveItem(storedItem, "toDoItem");
  }
  showItem();
});
const showSingle = (item, divName) => {
  // const divNameStr = divName.split("#")[1];
  let div = document.createElement("div");
  div.classList.add("container");
  div.classList.add("my-1");
  div.innerHTML = `
                    <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
              </svg>
            </div>

            <input type="search" readonly class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="${item}" required />
            <button onclick = "removeItem('${item}')" id="itemDelete" type="submit" class="text-white absolute right-20 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Delete</button>
            <button onclick = "doneItem('${item}')" type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Done</button>
          </div>`;
  dqs(divName).appendChild(div);
};

dqs("#itemDelete")?.addEventListener("click", () => {
  console.log("id", " => Line No: 20");
});
const showItem = () => {
  dqs("#toDoItem").innerHTML = "";
  dqs("#doneItem").innerHTML = "";
  const getToDoItem = getItem("toDoItem");
  const getDoneItem = getItem("doneItem");
  console.log(getToDoItem, getDoneItem, " => Line No: 94");
  if (getToDoItem?.toDoItem?.length > 0) {
    getToDoItem?.toDoItem?.map((item) => {
      showSingle(item, "#toDoItem");
    });
  }
  if (getDoneItem?.doneItem?.length > 0) {
    getDoneItem?.doneItem?.map((item) => {
      showSingle(item, "#doneItem");
    });
  }
};

showItem();
