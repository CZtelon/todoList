/* ===============================
   USER NAME HANDLING (LOCAL STORAGE)
================================= */
document.addEventListener("DOMContentLoaded", () => {
    const nameModal = document.getElementById("nameModal");
    const pageTitle = document.getElementById("pageTitle");
    const userNameInput = document.getElementById("userNameInput");
    const saveNameBtn = document.getElementById("saveNameBtn");

    const storedName = localStorage.getItem("userName");
    if (storedName) {
        pageTitle.textContent = `${storedName}'s To Do List`;
    } else {
        nameModal.style.display = "flex";
    }

    saveNameBtn.addEventListener("click", () => {
        const name = userNameInput.value.trim();
        if (name) {
            localStorage.setItem("userName", name);
            pageTitle.textContent = `${name}'s To Do List`;
            nameModal.style.display = "none";
        }
    });
});

/* ===============================
   THEME TOGGLE
================================= */
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

/* ===============================
   TASK CREATION
================================= */
const taskList = document.getElementById("taskList");
const taskTitle = document.getElementById("taskTitle");
const taskDate = document.getElementById("taskDate");
const createTaskBtn = document.getElementById("createTaskBtn");

const taskModal = document.getElementById("taskModal");
const expandOptions = document.getElementById("expandOptions");
const closeTaskModal = document.getElementById("closeTaskModal");
const modalTaskTitle = document.getElementById("modalTaskTitle");
const modalTaskDate = document.getElementById("modalTaskDate");
const modalTaskProject = document.getElementById("modalTaskProject");
const modalTaskTag = document.getElementById("modalTaskTag");
const modalCreateTaskBtn = document.getElementById("modalCreateTaskBtn");

/* ===============================
   ENABLE ENTER KEY TO CREATE TASK
================================= */

// Inline task inputs: Enter => inline Create Task button
[taskTitle, taskDate].forEach(el => {
    if (!el) return;
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            createTaskBtn.click(); // triggers inline create task behavior
        }
    });
});

// Modal task inputs: Enter => modal Create Task button
[modalTaskTitle, modalTaskDate, modalTaskProject, modalTaskTag].forEach(el => {
    if (!el) return;
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            modalCreateTaskBtn.click(); // triggers modal create task behavior
        }
    });
});


expandOptions.addEventListener("click", () => {
    taskModal.style.display = "flex";
});

closeTaskModal.addEventListener("click", () => {
    taskModal.style.display = "none";
});

function createTask(title, date, project = "", tag = "") {
    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
    <span><strong>${title}</strong> ${project ? `[${project}]` : ""} ${tag ? `#${tag}` : ""}</span>
    <span>${date}</span>
    <div class="taskButtons">
        <button class="completeBtn">✅</button>
        <button class="deleteBtn">🗑️</button>
  </div>
  `;

    // Mark as completed
    task.querySelector(".completeBtn").addEventListener("click", () => {
        task.classList.toggle("completed");
    });

    // Delete task
    task.querySelector(".deleteBtn").addEventListener("click", () => {
        task.remove();
    });

    taskList.appendChild(task);
}

// Create task from inline input
createTaskBtn.addEventListener("click", () => {
    if (taskTitle.value.trim()) {
        createTask(taskTitle.value, taskDate.value);
        taskTitle.value = "";
        taskDate.value = "";
    }
});

// Create task from modal input
modalCreateTaskBtn.addEventListener("click", () => {
    if (modalTaskTitle.value.trim()) {
        createTask(
            modalTaskTitle.value,
            modalTaskDate.value,
            modalTaskProject.value,
            modalTaskTag.value
        );
        modalTaskTitle.value = "";
        modalTaskDate.value = "";
        modalTaskProject.value = "";
        modalTaskTag.value = "";
        taskModal.style.display = "none";
    }
});
