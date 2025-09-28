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

/* ===============================
   TAB FILTERING FUNCTIONALITY
================================= */

// Get all tab buttons
const tabs = document.querySelectorAll('.tab');
const taskListContainer = document.getElementById('taskList');

// Add event listeners to all tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get the filter type from data-filter attribute
        const filter = tab.getAttribute('data-filter');
        filterTasks(filter);
    });
});

// Function to filter and display tasks
function filterTasks(filter) {
    const allTasks = document.querySelectorAll('.task');
    
    allTasks.forEach(task => {
        task.style.display = 'flex'; // Reset display
        
        switch(filter) {
            case 'all':
                // Show all tasks
                task.style.display = 'flex';
                break;
                
            case 'todo':
                // Show only incomplete tasks
                if (task.classList.contains('completed')) {
                    task.style.display = 'none';
                }
                break;
                
            case 'completed':
                // Show only completed tasks
                if (!task.classList.contains('completed')) {
                    task.style.display = 'none';
                }
                break;
                
            case 'date':
                // Sort by date (show all but reorder)
                sortTasksByDate();
                break;
                
            case 'project':
                // Sort by project (show all but reorder)
                sortTasksByProject();
                break;
                
            case 'tag':
                // Sort by tag (show all but reorder)
                sortTasksByTag();
                break;
        }
    });
}

// Function to sort tasks by date
function sortTasksByDate() {
    const tasks = Array.from(document.querySelectorAll('.task'));
    
    tasks.sort((a, b) => {
        const dateA = a.querySelector('span:nth-child(2)').textContent;
        const dateB = b.querySelector('span:nth-child(2)').textContent;
        
        // Handle empty dates by putting them at the end
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        
        return new Date(dateA) - new Date(dateB);
    });
    
    // Clear and re-append sorted tasks
    taskListContainer.innerHTML = '';
    tasks.forEach(task => taskListContainer.appendChild(task));
}

// Function to sort tasks by project
function sortTasksByProject() {
    const tasks = Array.from(document.querySelectorAll('.task'));
    
    tasks.sort((a, b) => {
        const taskTextA = a.querySelector('span:first-child').textContent;
        const taskTextB = b.querySelector('span:first-child').textContent;
        
        // Extract project from [project] format
        const projectA = taskTextA.match(/\[([^\]]+)\]/)?.[1] || '';
        const projectB = taskTextB.match(/\[([^\]]+)\]/)?.[1] || '';
        
        // Sort alphabetically, empty projects go to end
        if (!projectA && !projectB) return 0;
        if (!projectA) return 1;
        if (!projectB) return -1;
        
        return projectA.localeCompare(projectB);
    });
    
    // Clear and re-append sorted tasks
    taskListContainer.innerHTML = '';
    tasks.forEach(task => taskListContainer.appendChild(task));
}

// Function to sort tasks by tag
function sortTasksByTag() {
    const tasks = Array.from(document.querySelectorAll('.task'));
    
    tasks.sort((a, b) => {
        const taskTextA = a.querySelector('span:first-child').textContent;
        const taskTextB = b.querySelector('span:first-child').textContent;
        
        // Extract tag from #tag format
        const tagA = taskTextA.match(/#(\w+)/)?.[1] || '';
        const tagB = taskTextB.match(/#(\w+)/)?.[1] || '';
        
        // Sort alphabetically, empty tags go to end
        if (!tagA && !tagB) return 0;
        if (!tagA) return 1;
        if (!tagB) return -1;
        
        return tagA.localeCompare(tagB);
    });
    
    // Clear and re-append sorted tasks
    taskListContainer.innerHTML = '';
    tasks.forEach(task => taskListContainer.appendChild(task));
}
