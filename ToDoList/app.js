const todoListEl = document.getElementById("todoList");
const todoInputEl = document.getElementById("todoInput");

class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.completed = false;
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
    this.lastId = 0;
  }

  addTask(text) {
    this.lastId += 1;
    let task = new Task(this.lastId, text);
    this.tasks.push(task);
  }

  removeTask(id) {
    const remove = this.tasks.find((task) => task.id === id);

    if (!remove) {
      console.log("Задача не найдена");
      return;
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  toggleTask(id) {
    const toggle = this.tasks.find((task) => task.id === id);

    if (!toggle) {
      console.log("Задача не найдена");
      return;
    }

    toggle.completed = !toggle.completed;
  }

  getTasks() {
    return this.tasks;
  }

  getCompletedTasks() {
    return this.tasks.filter((task) => task.completed === true);
  }

  removeCompletedTasks() {
    this.tasks = this.tasks.filter((task) => task.completed === false);
  }

  getStats() {
    let completedCount = 0;
    this.tasks.forEach((task) => {
      if (task.completed === true) {
        completedCount++;
      }
    });

    return {
      total: this.tasks.length,
      completed: completedCount,
      active: this.tasks.length - completedCount,
    };
  }

  editTask(id, newText) {
    const toggle = this.tasks.find((task) => task.id === id);
    if (!toggle) {
      console.log("Задача не найдена");
      return;
    }
    toggle.text = newText;
  }
}

const todo = new TodoList();

const todoFilterEl = document.querySelector(".todo-filters");

const clearCompletedBtnEl = document.getElementById('clearCompletedBtn')

clearCompletedBtnEl.addEventListener('click', e =>{
  todo.removeCompletedTasks()
  renderTasks()
})

todoFilterEl.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const allButtons = todoFilterEl.querySelectorAll("button");

  allButtons.forEach((bnt) => {
    bnt.classList.remove("active");
  });

  button.classList.add("active");

  currentFilter = button.dataset.filter;

  renderTasks();
});

todoFilterEl.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  currentFilter = button.dataset.filter;
  renderTasks(); 
});

let currentFilter = "all";

function renderTasks() {
  todoListEl.innerHTML = ``;

  let tasks;

  if (currentFilter === "all") {
    tasks = todo.getTasks();
  }

  if (currentFilter === "active") {
    tasks = todo.getTasks().filter((t) => !t.completed);
  }

  if (currentFilter === "completed") {
    tasks = todo.getTasks().filter((t) => t.completed);
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
    <input type="checkbox" ${task.completed ? "checked" : ""}>
    <span class="li_text">${task.text}</span>
    <button class="delete_btn">Удалить</button>
  `;

    todoListEl.appendChild(li);

  });

  const getStats = todo.getStats();

  const taskCounter = document.getElementById("taskCounter");

  let counterText = "3 задачи";
  if (getStats.total === 1) {
    counterText = "1 задача";
  } else if (getStats.total >= 2 && getStats.total <= 4) {
    counterText = `${getStats.total} задачи`;
  } else {
    counterText = `${getStats.total} задач`;
  }
  taskCounter.textContent = counterText;
}

const addTaskBtnEl = document.getElementById("addTaskBtn");

function addTaskFromInput() {
  const text = todoInputEl.value;

  if (text === "") {
    console.log("Значение не найдено");
    return;
  }

  todo.addTask(text);
  renderTasks();

  todoInputEl.value = "";
  todoInputEl.focus();
}

addTaskBtnEl.addEventListener("click", addTaskFromInput);

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTaskFromInput();
  }
});


todoListEl.addEventListener("click", (event) => {
  const checkbox = event.target.closest('input[type ="checkbox"]');
  if (!checkbox) return;

  const li = checkbox.closest("li");
  const id = Number(li.dataset.id);

  todo.toggleTask(id);
  renderTasks();
});

todoListEl.addEventListener("click", (event) => {
  const btn = event.target.closest(".delete_btn");
  if (!btn) return;

  const li = btn.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  todo.removeTask(id);
  renderTasks();
});
