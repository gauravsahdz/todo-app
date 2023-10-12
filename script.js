const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const clearAll = document.getElementById("clear-all-btn");

// give me function when click on add button or press enter, add task to list and local storage along with a X button
function addToLocalStorage(task) {
  let tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const task = input.value;
  if (task) {
    const li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `<span class="task-name">${task}</span>
                <button class="delete-btn">X</button>`;
    taskList.appendChild(li);
    addToLocalStorage(task);
    input.value = "";
  }
}

// show tasks from local storage
function showTasks() {
  let tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `<span class="task-name">${task}</span>
                <button class="delete-btn">X</button>`;
    taskList.appendChild(li);
  });
}

showTasks();

// delete task from list and local storage
taskList.addEventListener("click", deleteTask);

function deleteTask(e) {
  if (e.target.classList.contains("delete-btn")) {
    let task = e.target.parentElement;
    taskList.removeChild(task);
    deleteFromLocalStorage(task);
  }
}

function deleteFromLocalStorage(task) {
  let tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  let taskName = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskName), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear all tasks from list and local storage
clearAll.addEventListener("click", clearTasks);

function clearTasks() {
  //check if there is tasks in the list, if yes, clear them , if no, alert the user
  if (taskList.children.length > 0) {
    //ask for confirmation
    if (confirm("Are you sure you want to clear all tasks?")) {
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
      localStorage.clear();
    }
  } else {
    alert("There is no tasks to clear");
  }
}

// add task when user presses enter key
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
