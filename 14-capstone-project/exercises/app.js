// Task Manager - Capstone Project
// ================================
// Implement the functions below to complete the Task Manager application.

// ===== State Management =====
let tasks = [];
let currentFilter = 'all';

// ===== DOM Elements =====
// TODO: Get references to DOM elements using getElementById and querySelector
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskTemplate = document.getElementById('task-template');
const emptyMessage = document.getElementById('empty-message');
const taskCount = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const descriptionInput = document.getElementById('task-description');
const descCountSpan = document.getElementById('desc-count');
const clearCompletedBtn = document.getElementById('clear-completed');


// ===== Initialization =====
function init() {
    // TODO: Load tasks from localStorage
    // TODO: Render all tasks
    // TODO: Setup event listeners
    // TODO: Setup form validation
    // TODO: Set minimum date for due date input
}


// ===== Event Listeners Setup =====
function setupEventListeners() {
    // TODO: Add submit event listener to form
    
    // TODO: Add click event listener to task list (for delete/edit buttons)
    // Use event delegation!
    
    // TODO: Add change event listener to task list (for checkboxes)
    // Use event delegation!
    
    // TODO: Add click event listeners to filter buttons
    
    // TODO: Add click event listener to clear completed button
    
    // TODO: Add input event listener to description for character counter
}


// ===== Form Validation =====
function setupFormValidation() {
    // TODO: Add blur event listeners to form inputs
    // TODO: Add input event listeners for real-time feedback
}

function validateForm() {
    // TODO: Check if form is valid
    // TODO: Show error messages for invalid fields
    // TODO: Return true if valid, false if not
}

function showFieldError(input, message) {
    // TODO: Add error class to form-group
    // TODO: Set error message text
}

function clearFieldError(input) {
    // TODO: Remove error class from form-group
    // TODO: Clear error message text
}


// ===== Task CRUD Operations =====

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function createTask(taskData) {
    // TODO: Create a task object with:
    // - id (use generateId())
    // - title
    // - description
    // - priority
    // - dueDate
    // - completed (default: false)
    // - createdAt (Date.now())
}

function renderTask(task) {
    // TODO: Clone the task template
    // TODO: Fill in task data using textContent
    // TODO: Set data-id attribute
    // TODO: Add priority class to badge
    // TODO: Set checkbox checked state
    // TODO: Add completed class if task is completed
    // TODO: Format and display due date
    // TODO: Return the task element
}

function renderAllTasks() {
    // TODO: Clear the task list
    // TODO: Filter tasks based on currentFilter
    // TODO: Use DocumentFragment for better performance
    // TODO: Render each task and append to fragment
    // TODO: Append fragment to task list
    // TODO: Show/hide empty message
    // TODO: Update task count
}

function deleteTask(id) {
    // TODO: Remove task from tasks array
    // TODO: Save to localStorage
    // TODO: Re-render tasks
}

function toggleComplete(id) {
    // TODO: Find task by id
    // TODO: Toggle completed status
    // TODO: Save to localStorage
    // TODO: Re-render tasks
}

function editTask(id) {
    // TODO: Find task by id
    // TODO: Populate form with task data
    // TODO: Change button text to "Update Task"
    // TODO: Store editing ID somewhere
    // Bonus: Implement inline editing instead
}


// ===== Filtering =====
function filterTasks(filter) {
    // TODO: Set currentFilter
    // TODO: Update active class on filter buttons
    // TODO: Re-render tasks
}

function getFilteredTasks() {
    // TODO: Return filtered array based on currentFilter
    // - 'all': return all tasks
    // - 'active': return tasks where completed is false
    // - 'completed': return tasks where completed is true
}


// ===== Statistics =====
function updateTaskCount() {
    // TODO: Count tasks based on current filter
    // TODO: Update task count display
    // Example: "3 tasks" or "1 task"
}


// ===== Clear Completed =====
function clearCompleted() {
    // TODO: Filter out completed tasks
    // TODO: Save to localStorage
    // TODO: Re-render tasks
}


// ===== LocalStorage =====
function saveTasks() {
    // TODO: Save tasks array to localStorage as JSON
}

function loadTasks() {
    // TODO: Load tasks from localStorage
    // TODO: Parse JSON or default to empty array
}


// ===== Event Handlers =====
function handleSubmit(e) {
    // TODO: Prevent default form submission
    // TODO: Validate form
    // TODO: Get form data
    // TODO: Create task
    // TODO: Add to tasks array
    // TODO: Save and re-render
    // TODO: Reset form
}

function handleTaskClick(e) {
    // TODO: Get the closest task-item element
    // TODO: Get task ID from data attribute
    // TODO: Check if delete button was clicked
    // TODO: Check if edit button was clicked
}

function handleTaskChange(e) {
    // TODO: Check if checkbox was changed
    // TODO: Get task ID and toggle complete
}

function handleFilterClick(e) {
    // TODO: Get filter value from data attribute
    // TODO: Call filterTasks()
}

function handleDescriptionInput() {
    // TODO: Update character count
    // TODO: Add warning/danger classes as needed
}


// ===== Utility Functions =====
function formatDate(dateString) {
    // TODO: Format date for display
    // Example: "Dec 31, 2024"
}

function isOverdue(dateString) {
    // TODO: Check if date is in the past
}


// ===== Start the Application =====
document.addEventListener('DOMContentLoaded', init);
