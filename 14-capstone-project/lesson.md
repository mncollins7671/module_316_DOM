# Lesson 14: Capstone Project - Task Manager Application

## Learning Objectives

This capstone project integrates ALL the DOM skills you've learned throughout this course:

- ✅ Selecting elements (getElementById, querySelector, querySelectorAll)
- ✅ DOM traversal (parent, children, siblings)
- ✅ Iterating over element collections
- ✅ Creating and adding elements (createElement, appendChild, prepend)
- ✅ Using DocumentFragment and cloneNode
- ✅ Modifying content (innerHTML, innerText, textContent)
- ✅ Styling elements (style, classList)
- ✅ Modifying attributes (setAttribute, getAttribute, dataset)
- ✅ Event handling (addEventListener, event delegation)
- ✅ Using BOM properties (localStorage, timers)
- ✅ HTML form validation (required, pattern, min/max)
- ✅ DOM event-based validation

---

## Project Overview

You will build a **Task Manager Application** with the following features:

1. Add new tasks with title, description, priority, and due date
2. Display tasks in a list with different styles based on priority
3. Mark tasks as complete
4. Edit existing tasks
5. Delete tasks
6. Filter tasks by status (all, active, completed)
7. Save tasks to localStorage
8. Form validation for task input

---

## Project Structure

```
14-capstone-project/
├── index.html      # Main HTML structure
├── styles.css      # Styling
├── app.js          # Your application code
└── solution.js     # Complete solution (for reference)
```

---

## Step 1: HTML Structure

Start with this basic HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Task Manager</h1>
            <p class="subtitle">Organize your work efficiently</p>
        </header>

        <!-- Task Form -->
        <section class="task-form-section">
            <h2>Add New Task</h2>
            <form id="task-form" novalidate>
                <div class="form-group">
                    <label for="task-title">Title *</label>
                    <input type="text" id="task-title" name="title" 
                           required minlength="3" maxlength="50">
                    <span class="error-message"></span>
                </div>

                <div class="form-group">
                    <label for="task-description">Description</label>
                    <textarea id="task-description" name="description" 
                              rows="2" maxlength="200"></textarea>
                    <div class="char-count"><span id="desc-count">0</span>/200</div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="task-priority">Priority</label>
                        <select id="task-priority" name="priority">
                            <option value="low">Low</option>
                            <option value="medium" selected>Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="task-due">Due Date</label>
                        <input type="date" id="task-due" name="dueDate">
                    </div>
                </div>

                <button type="submit" id="add-task-btn">Add Task</button>
            </form>
        </section>

        <!-- Filter Controls -->
        <section class="filter-section">
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="active">Active</button>
                <button class="filter-btn" data-filter="completed">Completed</button>
            </div>
            <div class="task-stats">
                <span id="task-count">0 tasks</span>
            </div>
        </section>

        <!-- Task List -->
        <section class="task-list-section">
            <ul id="task-list"></ul>
            <p id="empty-message" class="empty-message">
                No tasks yet. Add one above!
            </p>
        </section>

        <!-- Clear Completed Button -->
        <footer class="footer-actions">
            <button id="clear-completed" class="btn-secondary">
                Clear Completed Tasks
            </button>
        </footer>
    </div>

    <!-- Task Template (hidden) -->
    <template id="task-template">
        <li class="task-item" data-id="">
            <div class="task-checkbox">
                <input type="checkbox" class="complete-checkbox">
            </div>
            <div class="task-content">
                <h3 class="task-title"></h3>
                <p class="task-description"></p>
                <div class="task-meta">
                    <span class="task-priority-badge"></span>
                    <span class="task-due-date"></span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-edit" title="Edit">✏️</button>
                <button class="btn-delete" title="Delete">🗑️</button>
            </div>
        </li>
    </template>

    <script src="app.js"></script>
</body>
</html>
```

---

## Step 2: Requirements Breakdown

### Requirement 1: Task Data Structure
Each task should have:
```javascript
{
    id: 'unique-id',
    title: 'Task title',
    description: 'Task description',
    priority: 'low' | 'medium' | 'high',
    dueDate: '2024-12-31',
    completed: false,
    createdAt: Date.now()
}
```

### Requirement 2: Core Functions to Implement

```javascript
// Task Management
function createTask(taskData) { }      // Create new task
function renderTask(task) { }          // Display single task
function renderAllTasks() { }          // Display all tasks
function updateTask(id, updates) { }   // Update existing task
function deleteTask(id) { }            // Delete a task
function toggleComplete(id) { }        // Toggle completed status

// Filtering
function filterTasks(filter) { }       // Filter by status

// Storage
function saveTasks() { }               // Save to localStorage
function loadTasks() { }               // Load from localStorage

// Validation
function validateForm() { }            // Validate the input form
```

---

## Step 3: Implementation Checklist

Use this checklist to track your progress:

### DOM Selection (SBA: 5% + 5%)
- [ ] Use `getElementById()` to select form and task list
- [ ] Use `querySelector()` to select individual elements
- [ ] Use `querySelectorAll()` for filter buttons

### DOM Traversal (SBA: 5%)
- [ ] Navigate parent/child relationships when finding task elements
- [ ] Use `closest()` to find parent task item from buttons

### Iterating Collections (SBA: 10%)
- [ ] Loop through tasks array to render
- [ ] Loop through filter buttons to add listeners
- [ ] Loop through form inputs for validation

### Creating Elements (SBA: 5%)
- [ ] Use `createElement()` for dynamic elements
- [ ] Clone template nodes for task creation

### Appending Elements (SBA: 5%)
- [ ] Use `appendChild()` to add tasks to list
- [ ] Use `prepend()` to add new tasks at top

### Templating (SBA: 2%)
- [ ] Use `<template>` and `cloneNode()` for task items
- [ ] Use DocumentFragment for batch operations

### Modifying Content (SBA: 10%)
- [ ] Use `textContent` to update task details
- [ ] Use `innerHTML` for rendering task list

### Styles and Classes (SBA: 5%)
- [ ] Use `classList.add/remove/toggle` for states
- [ ] Apply priority-based styling

### Attributes (SBA: 3%)
- [ ] Use `data-*` attributes for task IDs
- [ ] Use `setAttribute()` for dynamic attributes

### Event Handling (SBA: 10%)
- [ ] Form submit event for adding tasks
- [ ] Click events for buttons
- [ ] Change events for checkboxes
- [ ] Event delegation for task list

### BOM (SBA: 3%)
- [ ] Use `localStorage` to persist tasks
- [ ] Use `Date` for timestamps

### HTML Validation (SBA: 5%)
- [ ] Add `required` attribute
- [ ] Add `minlength/maxlength` constraints
- [ ] Add `min` attribute for date (future dates)

### DOM Validation (SBA: 5%)
- [ ] Custom validation on submit
- [ ] Real-time character counter
- [ ] Show custom error messages

---

## Step 4: Getting Started

Here's a skeleton to start your implementation:

```javascript
// app.js

// ===== State Management =====
let tasks = [];
let currentFilter = 'all';

// ===== DOM Elements =====
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskTemplate = document.getElementById('task-template');
const emptyMessage = document.getElementById('empty-message');
const taskCount = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');

// ===== Initialization =====
function init() {
    loadTasks();
    renderAllTasks();
    setupEventListeners();
    setupFormValidation();
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Form submission
    taskForm.addEventListener('submit', handleSubmit);
    
    // Task list (event delegation)
    taskList.addEventListener('click', handleTaskClick);
    taskList.addEventListener('change', handleTaskChange);
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Clear completed
    document.getElementById('clear-completed')
        .addEventListener('click', clearCompleted);
}

// ===== Form Handling =====
function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const formData = new FormData(taskForm);
    const task = createTask({
        title: formData.get('title'),
        description: formData.get('description'),
        priority: formData.get('priority'),
        dueDate: formData.get('dueDate')
    });
    
    tasks.unshift(task);
    saveTasks();
    renderAllTasks();
    taskForm.reset();
}

// ===== Your implementations go here =====

// TODO: Implement createTask()
// TODO: Implement renderTask()
// TODO: Implement renderAllTasks()
// TODO: Implement handleTaskClick()
// TODO: Implement handleTaskChange()
// TODO: Implement handleFilterClick()
// TODO: Implement filterTasks()
// TODO: Implement updateTaskCount()
// TODO: Implement clearCompleted()
// TODO: Implement saveTasks()
// TODO: Implement loadTasks()
// TODO: Implement validateForm()
// TODO: Implement setupFormValidation()

// Start the application
document.addEventListener('DOMContentLoaded', init);
```

---

## Step 5: Tips and Hints

### Generating Unique IDs
```javascript
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
```

### Using the Template
```javascript
function renderTask(task) {
    const clone = taskTemplate.content.cloneNode(true);
    const li = clone.querySelector('.task-item');
    
    li.dataset.id = task.id;
    li.querySelector('.task-title').textContent = task.title;
    // ... fill in other fields
    
    return li;
}
```

### Event Delegation Pattern
```javascript
taskList.addEventListener('click', (e) => {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;
    
    const taskId = taskItem.dataset.id;
    
    if (e.target.classList.contains('btn-delete')) {
        deleteTask(taskId);
    } else if (e.target.classList.contains('btn-edit')) {
        editTask(taskId);
    }
});
```

### LocalStorage Pattern
```javascript
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    tasks = saved ? JSON.parse(saved) : [];
}
```

---

## Grading Criteria

Your project will be evaluated based on:

| Criteria | Points |
|----------|--------|
| Uses getElementById and querySelector correctly | 10% |
| Navigates DOM with parent/child/sibling | 5% |
| Iterates over collections with loops | 10% |
| Creates elements with createElement | 5% |
| Appends elements with appendChild/prepend | 5% |
| Uses DocumentFragment or cloneNode | 2% |
| Modifies content with innerHTML/textContent | 10% |
| Uses style or classList for styling | 5% |
| Modifies element attributes | 3% |
| Registers event listeners properly | 10% |
| Uses at least 2 BOM features | 3% |
| Includes HTML attribute validation | 5% |
| Includes DOM event-based validation | 5% |
| Code is well-organized and readable | 10% |
| App works correctly without errors | 12% |

---

## Bonus Challenges

If you finish early, try adding:

1. **Edit in place** - Click task title to edit inline
2. **Drag and drop** - Reorder tasks by dragging
3. **Categories/Tags** - Add tags to tasks
4. **Search** - Filter tasks by title text
5. **Due date alerts** - Highlight overdue tasks
6. **Dark mode** - Toggle theme with persistence
7. **Export/Import** - Download tasks as JSON

---

## Conclusion

Congratulations on completing this DOM curriculum! You now have all the skills needed to:

- Manipulate the DOM with confidence
- Create interactive web applications
- Build forms with proper validation
- Persist data in the browser
- Handle user events effectively

Good luck on your SBA! 🎉
