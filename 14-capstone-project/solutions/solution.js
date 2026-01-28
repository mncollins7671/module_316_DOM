// Task Manager - Complete Solution
// =================================

// ===== State Management =====
let tasks = [];
let currentFilter = 'all';
let editingId = null;

// ===== DOM Elements =====
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskTemplate = document.getElementById('task-template');
const emptyMessage = document.getElementById('empty-message');
const taskCount = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const titleInput = document.getElementById('task-title');
const descriptionInput = document.getElementById('task-description');
const prioritySelect = document.getElementById('task-priority');
const dueDateInput = document.getElementById('task-due');
const descCountSpan = document.getElementById('desc-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const addTaskBtn = document.getElementById('add-task-btn');


// ===== Initialization =====
function init() {
    loadTasks();
    renderAllTasks();
    setupEventListeners();
    setupFormValidation();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dueDateInput.setAttribute('min', today);
}


// ===== Event Listeners Setup =====
function setupEventListeners() {
    // Form submission
    taskForm.addEventListener('submit', handleSubmit);
    
    // Task list - event delegation for clicks
    taskList.addEventListener('click', handleTaskClick);
    
    // Task list - event delegation for checkbox changes
    taskList.addEventListener('change', handleTaskChange);
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Clear completed
    clearCompletedBtn.addEventListener('click', clearCompleted);
    
    // Description character counter
    descriptionInput.addEventListener('input', handleDescriptionInput);
}


// ===== Form Validation =====
function setupFormValidation() {
    // Validate on blur
    titleInput.addEventListener('blur', () => {
        validateField(titleInput);
    });
    
    // Real-time validation when there's an error
    titleInput.addEventListener('input', () => {
        if (titleInput.closest('.form-group').classList.contains('error')) {
            validateField(titleInput);
        }
    });
}

function validateField(input) {
    if (input.validity.valid) {
        clearFieldError(input);
        return true;
    } else {
        const message = getValidationMessage(input);
        showFieldError(input, message);
        return false;
    }
}

function getValidationMessage(input) {
    if (input.validity.valueMissing) {
        return 'This field is required';
    }
    if (input.validity.tooShort) {
        return `Must be at least ${input.minLength} characters`;
    }
    if (input.validity.tooLong) {
        return `Must be no more than ${input.maxLength} characters`;
    }
    return 'Invalid value';
}

function validateForm() {
    let isValid = true;
    
    if (!validateField(titleInput)) {
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    if (errorSpan) errorSpan.textContent = message;
}

function clearFieldError(input) {
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    if (errorSpan) errorSpan.textContent = '';
}


// ===== Task CRUD Operations =====

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function createTask(taskData) {
    return {
        id: generateId(),
        title: taskData.title.trim(),
        description: taskData.description.trim(),
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        completed: false,
        createdAt: Date.now()
    };
}

function renderTask(task) {
    // Clone the template
    const clone = taskTemplate.content.cloneNode(true);
    const li = clone.querySelector('.task-item');
    
    // Set data attribute
    li.dataset.id = task.id;
    
    // Fill in content using textContent
    li.querySelector('.task-title').textContent = task.title;
    li.querySelector('.task-description').textContent = task.description;
    
    // Priority badge
    const priorityBadge = li.querySelector('.task-priority-badge');
    priorityBadge.textContent = task.priority;
    priorityBadge.classList.add(task.priority);
    
    // Due date
    const dueDateSpan = li.querySelector('.task-due-date');
    if (task.dueDate) {
        dueDateSpan.textContent = formatDate(task.dueDate);
        if (isOverdue(task.dueDate) && !task.completed) {
            dueDateSpan.classList.add('overdue');
        }
    }
    
    // Completed state
    const checkbox = li.querySelector('.complete-checkbox');
    checkbox.checked = task.completed;
    if (task.completed) {
        li.classList.add('completed');
    }
    
    return li;
}

function renderAllTasks() {
    // Clear the list
    taskList.innerHTML = '';
    
    // Get filtered tasks
    const filteredTasks = getFilteredTasks();
    
    // Use DocumentFragment for performance
    const fragment = document.createDocumentFragment();
    
    // Render each task
    filteredTasks.forEach(task => {
        const taskElement = renderTask(task);
        fragment.appendChild(taskElement);
    });
    
    // Append all at once
    taskList.appendChild(fragment);
    
    // Show/hide empty message
    if (filteredTasks.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
    }
    
    // Update count
    updateTaskCount();
}

function deleteTask(id) {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    // Remove from array
    tasks = tasks.filter(task => task.id !== id);
    
    // Save and re-render
    saveTasks();
    renderAllTasks();
}

function toggleComplete(id) {
    // Find task
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderAllTasks();
    }
}

function updateTask(id, updates) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        saveTasks();
        renderAllTasks();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    // Populate form
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    prioritySelect.value = task.priority;
    dueDateInput.value = task.dueDate;
    
    // Update character count
    descCountSpan.textContent = task.description.length;
    
    // Change button text
    addTaskBtn.textContent = '✏️ Update Task';
    
    // Store editing ID
    editingId = id;
    
    // Scroll to form
    taskForm.scrollIntoView({ behavior: 'smooth' });
}


// ===== Filtering =====
function filterTasks(filter) {
    currentFilter = filter;
    
    // Update active button
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderAllTasks();
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}


// ===== Statistics =====
function updateTaskCount() {
    const filtered = getFilteredTasks();
    const count = filtered.length;
    taskCount.textContent = `${count} task${count !== 1 ? 's' : ''}`;
}


// ===== Clear Completed =====
function clearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        alert('No completed tasks to clear.');
        return;
    }
    
    if (confirm(`Clear ${completedCount} completed task${completedCount !== 1 ? 's' : ''}?`)) {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderAllTasks();
    }
}


// ===== LocalStorage =====
function saveTasks() {
    localStorage.setItem('taskManager_tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('taskManager_tasks');
    tasks = saved ? JSON.parse(saved) : [];
}


// ===== Event Handlers =====
function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        titleInput.focus();
        return;
    }
    
    const formData = new FormData(taskForm);
    const taskData = {
        title: formData.get('title'),
        description: formData.get('description'),
        priority: formData.get('priority'),
        dueDate: formData.get('dueDate')
    };
    
    if (editingId) {
        // Update existing task
        updateTask(editingId, taskData);
        editingId = null;
        addTaskBtn.textContent = '➕ Add Task';
    } else {
        // Create new task
        const task = createTask(taskData);
        tasks.unshift(task); // Add to beginning
        saveTasks();
        renderAllTasks();
    }
    
    // Reset form
    taskForm.reset();
    descCountSpan.textContent = '0';
    titleInput.closest('.form-group').classList.remove('success', 'error');
}

function handleTaskClick(e) {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;
    
    const taskId = taskItem.dataset.id;
    
    if (e.target.classList.contains('btn-delete')) {
        deleteTask(taskId);
    } else if (e.target.classList.contains('btn-edit')) {
        editTask(taskId);
    }
}

function handleTaskChange(e) {
    if (e.target.classList.contains('complete-checkbox')) {
        const taskItem = e.target.closest('.task-item');
        if (taskItem) {
            toggleComplete(taskItem.dataset.id);
        }
    }
}

function handleFilterClick(e) {
    const filter = e.target.dataset.filter;
    filterTasks(filter);
}

function handleDescriptionInput() {
    const length = descriptionInput.value.length;
    const max = parseInt(descriptionInput.maxLength);
    
    descCountSpan.textContent = length;
    
    const charCount = descCountSpan.parentElement;
    charCount.classList.remove('warning', 'danger');
    
    if (length >= max) {
        charCount.classList.add('danger');
    } else if (length >= max * 0.8) {
        charCount.classList.add('warning');
    }
}


// ===== Utility Functions =====
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString + 'T00:00:00');
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function isOverdue(dateString) {
    if (!dateString) return false;
    
    const dueDate = new Date(dateString + 'T23:59:59');
    const today = new Date();
    return dueDate < today;
}


// ===== Start the Application =====
document.addEventListener('DOMContentLoaded', init);

console.log('Task Manager loaded successfully!');
