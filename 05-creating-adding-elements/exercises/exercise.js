// Exercise 05: Creating and Adding Elements
// ==========================================

// ===== Part 1: Basic Element Creation =====

// 1. Create a paragraph element, set its text to "Hello, DOM!", and add it to #basic-output
// Your code here:


// 2. Create a div with the class "card", add some text, and append it to #basic-output
// Your code here:


// 3. Create an h3 element, set its text and color (red), and prepend it to #basic-output
// Your code here:


// 4. Create a link (anchor) that goes to "https://example.com", has text "Visit Example",
//    opens in a new tab, and append it to #basic-output
// Your code here:



// ===== Part 2: List Building =====

// 5. Add "Cherry" to the end of #fruit-list
// Your code here:


// 6. Add "Grape" to the beginning of #fruit-list
// Your code here:


// 7. Add "Mango" before "Cherry" in the list
// Hint: You'll need to find Cherry first, then use insertBefore
// Your code here:


// 8. Create a function that adds a new fruit to the list
// The function should take the fruit name as a parameter
// Your code here:



// ===== Part 3: Creating Cards =====

// 9. Create a function called createCard that takes title and description parameters
// It should return a div with class "card", containing an h3 for title and p for description
// Your code here:


// 10. Use your createCard function to add 3 cards to #cards-container
// Your code here:


// 11. Modify your createCard function to also accept an optional imageUrl parameter
// If provided, add an img element at the top of the card
// Your code here:



// ===== Part 4: Todo List =====

// 12. Create a function createTodoItem(text) that creates a todo item
// Each todo item should have:
// - A checkbox input
// - A span with the text
// - A delete button with class "delete-btn" and text "Delete"
// The whole thing should be wrapped in a div with class "todo-item"
// Your code here:


// 13. Create 3 todo items and add them to #todo-list
// Your code here:


// 14. Make the delete button actually remove the todo item when clicked
// Hint: Use event delegation or add event listener when creating
// Your code here:



// ===== Part 5: Navigation =====

const navItems = [
    { text: 'Home', href: '#home' },
    { text: 'About', href: '#about' },
    { text: 'Services', href: '#services' },
    { text: 'Contact', href: '#contact' }
];

// 15. Loop through navItems and create navigation links
// Each should be an anchor with class "nav-item"
// Add them all to #main-nav
// Your code here:



// ===== Part 6: Button Factory =====

// 16. Create a function createButton(text, color, onClick) that:
// - Creates a button with the given text
// - Sets the background color to the color parameter
// - Attaches the onClick function as a click event handler
// - Returns the button element
// Your code here:


// 17. Use createButton to create 3 buttons:
// - "Red Button" (red) - shows alert "Red clicked!"
// - "Green Button" (green) - logs "Green clicked!" to console
// - "Blue Button" (blue) - changes the background of #button-output to blue
// Add all buttons to #button-container
// Your code here:



// ===== BONUS Challenges =====

// 18. Create a table from this data:
const tableData = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Jane', age: 25, city: 'Los Angeles' },
    { name: 'Bob', age: 35, city: 'Chicago' }
];
// Create a table with headers and rows, append to #basic-output
// Your code here:


// 19. Create a function that takes HTML string and returns a DOM element
// function htmlToElement(htmlString) { ... }
// Your code here:


// 20. Create a modal dialog component
// It should have a title, content, close button, and overlay background
// Your code here:

