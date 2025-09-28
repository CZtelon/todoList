# My Learning Journey: Building a Fullstack To-Do List App

## Introduction
For this project, I built a dynamic To-Do List web app that allows users to manage tasks with features like marking tasks as complete, categorizing by project or tag, filtering, and toggling between light and dark themes. The app also personalizes the experience by asking the user for their name on first visit and storing it locally.

The purpose of this project was not just to create a functional app but to explore DOM manipulation, local storage, event handling, and clean UI/UX design with HTML, CSS, and JavaScript.

---

## Initial Approach
My first plan was straightforward: 

1. Create HTML elements for tasks and a simple input line to add tasks.
2. Use basic JavaScript to append new tasks to the DOM.
3. Implement a “complete” button that toggled a class to visually mark tasks done.

I thought this would be enough to create a functional to-do list. I reasoned that toggling a class could handle all the visual changes like strike-through text and background color change.

Example of my early JS logic:
```javascript
task.querySelector(".completeBtn").addEventListener("click", () => {
  task.classList.toggle("completed");
});
```

## Challenges Encountered
While building the app, I encountered several issues:

- **Button Alignment** – The complete button did not sit neatly next to the trash button. `space-between` pushed the first and last elements to the edges, leaving the complete button floating awkwardly.
- **Dynamic Element Creation** – Since tasks were created dynamically with JS, I had to ensure event listeners attached correctly to each newly created button. Forgetting this caused some buttons not to respond.
- **Visual Overflows** – My initial "Task Completed" overlay was too large and spilled into neighboring tasks.
- **Strikethrough Conflict** – The strike-through text clashed with the new design I wanted, which was a simpler “DONE” indicator.
- **Keyboard Interaction** – At first, tasks could only be created by clicking the "Create Task" button.
- **Browser Rendering Differences** – Opening `index.html` locally sometimes showed a blank page due to security restrictions or incorrect file paths.
- **First-Time User Experience** – I realized I needed a way to store the user's name locally and skip the prompt on revisits.
- **Scalability & Maintainability** – My initial approach relied heavily on order and margins, which became messy as I added features like task metadata (date, project, tags).

---

## Research and Questions
To address these challenges, I asked:

- How does flexbox handle multiple elements and ordering?
- What is the best practice for grouping buttons together in a dynamic list?
- How can I attach event listeners to elements created after page load?
- How can I append a “DONE” stamp that stays within the task boundaries without overflowing?
- How can I remove the strike-through while keeping the background color change?
- What is the best way to make the Enter key trigger task creation in both the inline input and modal?
- How does local storage work for persisting the user’s name between sessions?
- Are there common issues with opening JS apps locally vs. hosted environments (like GitHub Pages)?

I explored solutions like:

- Using `order` in flexbox to reposition buttons.
- Wrapping buttons in a dedicated container (`<div class="taskButtons">`) to control layout.
- Using `querySelector` and `addEventListener` for dynamically created elements.
- CSS pseudo-elements, keydown event listeners, and conditional class toggling.

---

## Chosen Solution

### Task Button Layout
I wrapped the action buttons (complete and delete) in a small flex container. This allowed buttons to stay together on the right side while keeping task text aligned to the left.

```html
task.innerHTML = `
  <span><strong>${title}</strong> ${project ? `[${project}]` : ""} ${tag ? `#${tag}` : ""}</span>
  <span>${date}</span>
  <div class="taskButtons">
    <button class="completeBtn">✅</button>
    <button class="deleteBtn">🗑️</button>
  </div>
`;
```
Code Enhancements and Key Takeaways

This document outlines several technical improvements made to the application's structure, styling, and user experience, along with key lessons learned during development.

1. CSS for the Button Container

To manage the action buttons within each task, Flexbox was applied to a container class.

CSS Code

CSS

.taskButtons {
  display: flex;
  gap: 0.5rem;
}

Benefits

    Buttons are aligned neatly side by side.

    It's easier to maintain and add new buttons in the future.

2. Completed Task Stamp

A visual fix was implemented for completed tasks using a CSS pseudo-element to add a "DONE" stamp without affecting the task's main text or causing visual overflow/strike-through issues.

CSS Code

CSS

.task.completed {
  background: #cce6e6;
  position: relative;
}
.task.completed::after {
  content: "DONE";
  color: green;
  font-weight: bold;
  font-size: 1rem;
  margin-left: 10px;
}

Purpose

A green "DONE" label is added to the task line, restricted to the task element via the .task.completed::after pseudo-element.

3. Enter Key Submission

To improve user workflow, keydown listeners were added to the input fields, allowing users to submit a new task by pressing the Enter key.

JavaScript Code

JavaScript

[taskTitle, taskDate].forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      createTaskBtn.click();
    }
  });
});

4. Local Storage for User Name

The user's name is stored in Local Storage to provide a persistent, personalized experience and skip the initial modal on subsequent visits.

JavaScript Code

JavaScript

localStorage.setItem("userName", name);

5. Folder Structure and Paths

The application structure was validated to ensure all files were correctly linked, which is crucial for deployment across different environments.

HTML Links

HTML

<link rel="stylesheet" href="todoCSS.css">
<script src="todoJS.js"></script>

Outcome

This structure solved visual overflows, improved usability, and ensured the app worked correctly both locally (with Live Server) and on GitHub Pages.

Key Takeaways

    DOM Structure Matters – Properly structuring elements in HTML/JS affects layout more than CSS alone.

    Flexbox Is Powerful but Tricky – justify-content: space-between doesn't guarantee element proximity; group elements in containers when necessary.

    Dynamic Elements Require Careful Event Handling – Always attach event listeners after the dynamic elements have been created and added to the DOM.

    Incremental Problem Solving – Tackling one challenge at a time prevents overwhelming complexity and ensures better focus.

    CSS Pseudo-elements Are Handy – They are extremely useful for adding inline stamps like "DONE" without needing to modify the HTML structure.

    Keyboard UX Matters – Handling the Enter key significantly improves accessibility and user experience.

    Local Storage Simplifies Persistence – It offers a lightweight solution for storing session data without the need for a backend.

    Reflective Iteration Strengthens Understanding – Documenting the steps and solutions helps with knowledge retention and provides a clear record of why specific approaches worked.
