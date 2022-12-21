const dqs = (id) => document.querySelector(id);

const getItem = (keyName) => {
  let item;
  const storedItem = localStorage.getItem(keyName);
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
    // console.log(storedItem, " => Line No: 54");
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
            <button onclick = "deleteItem('${item}')" id="itemDelete" type="submit" class="text-white absolute right-20 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Delete</button>
            <button onclick = "doneItem('${item}')" type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Done</button>
          </div>`;
  dqs(divName).appendChild(div);
};

const deleteItem = (item) => {
  let getToDoItem = getItem("toDoItem");
  const getDoneItem = getItem("doneItem");
  if (getToDoItem?.toDoItem?.indexOf(item) >= 0) {
    const newToDoItem = getToDoItem?.toDoItem?.filter((single) => single !== item);
    if (newToDoItem.length === 0) {
      localStorage.removeItem("toDoItem");
    } else {
      const storedItem = getItem("toDoItem");
      storedItem.toDoItem = newToDoItem;
      saveItem(storedItem, "toDoItem");
    }
  }
  if (getDoneItem?.doneItem?.indexOf(item) >= 0) {
    const newDoneItem = getDoneItem?.doneItem?.filter((single) => single !== item);
    if (newDoneItem.length === 0) {
      localStorage.removeItem("doneItem");
    } else {
      const storedItem = getItem("doneItem");
      storedItem.doneItem = newDoneItem;
      saveItem(storedItem, "doneItem");
    }
  }
  showItem();
  console.log("ok", " => Line No: 106");
  // console.log(getToDoItem, item, getDoneItem, " => Line No: 89");
};

const showItem = () => {
  dqs("#toDoItem").innerHTML = "";
  dqs("#doneItem").innerHTML = "";
  const getToDoItem = getItem("toDoItem");
  const getDoneItem = getItem("doneItem");
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
  // Update
  let totalData = [];
  let completeData = [];
  const doneItem = getItem("doneItem");
  const toDoItem = getItem("toDoItem");
  doneItem.doneItem.map((item) => {
    totalData.push(item);
  });
  toDoItem.toDoItem.map((item) => {
    totalData.push(item);
  });
  doneItem.doneItem.map((item) => {
    completeData.push(item);
  });
  let completePercent = (completeData.length * 100) / totalData.length;
  console.log(Math.round(completePercent), " => Line No: 143");
  let percentData;
  if (isNaN(Math.round(completePercent))) {
    percentData = 0;
    console.log("NaN", " => Line No: 146");
  } else {
    percentData = Math.round(completePercent);
    console.log("not NaN", " => Line No: 149");
  }
  dqs("#percent-width").innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `<div  class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style="width: ${percentData}%">${percentData}%</div>`;
  dqs("#percent-width").appendChild(div);
};

showItem();
