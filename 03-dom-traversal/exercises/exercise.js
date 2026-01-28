// Exercise 03: DOM Traversal
// ===========================
// Use DOM traversal methods to navigate between elements.
// Avoid using getElementById or querySelector for these exercises
// (except for the initial element selection where specified).

// Get a starting element to work from
const activeNavItem = document.querySelector('.nav-item.active');
const secondCard = document.getElementById('card-2');
const firstActionBtn = document.querySelector('.action-btn');

// ===== Part 1: Parent Navigation =====

// 1. Starting from activeNavItem, get its parent element (the <ul>)
// Your code here:


// 2. From the activeNavItem, navigate up to find the <nav> element
// Hint: Use parentElement twice, or use closest()
// Your code here:


// 3. From firstActionBtn, find the closest .card ancestor
// Your code here:


// 4. From secondCard, navigate to its parent (main#content)
// Your code here:



// ===== Part 2: Child Navigation =====

// 5. Get the nav-list element and find all its child elements
// Your code here:
const navList = document.getElementById('nav-list');


// 6. Get the first child element of the navList
// Your code here:


// 7. Get the last child element of the navList
// Your code here:


// 8. Get all children of secondCard
// Your code here:


// 9. Get the first element child of secondCard (the h2)
// Your code here:



// ===== Part 3: Sibling Navigation =====

// 10. From activeNavItem ("About"), get the previous sibling ("Home")
// Your code here:


// 11. From activeNavItem ("About"), get the next sibling ("Services")
// Your code here:


// 12. From secondCard, get the previous sibling card (card-1)
// Your code here:


// 13. From secondCard, get the next sibling card (card-3)
// Your code here:



// ===== Part 4: Combined Navigation =====

// 14. Starting from firstActionBtn, navigate to find the h2 of its card
// Hint: Go up to the card, then down to the first child
// Your code here:


// 15. Starting from secondCard, get the last nav item
// Hint: Navigate up, find header, then nav, then ul, then last child
// Your code here:


// 16. Get all siblings of secondCard
// Hint: Start from parent's first child, then loop through nextElementSibling
// Your code here:



// ===== Part 5: Counting and Checking =====

// 17. Count how many child elements the main#content has
// Your code here:


// 18. Check if secondCard has any children
// Hint: Check if children.length > 0 or use hasChildNodes()
// Your code here:


// 19. Check if activeNavItem has a previous sibling
// Your code here:



// ===== BONUS Challenges =====

// 20. Write a function that takes an element and returns all its ancestors as an array
// Your code here:


// 21. Write a function that finds the index of an element among its siblings
// Your code here:


// 22. Starting from any button, navigate to find the sidebar
// Your code here:

