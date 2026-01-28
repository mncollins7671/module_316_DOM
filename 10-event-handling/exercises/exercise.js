// Exercise 10: Event Handling
// ============================

// ===== Part 1: Click Events =====

// 1. Add a click event to #click-counter-btn that counts clicks
// Update the button text to show "Clicks: N"
// Your code here:


// 2. Add a click event to #toggle-btn that toggles between ON/OFF
// Also toggle the 'active' class
// Your code here:


// 3. Add a double-click event to #double-click-btn
// Change the text to "Double Clicked!" and change background to green
// Your code here:



// ===== Part 2: Mouse Events =====

const mouseBox = document.getElementById('mouse-box');

// 4. Add mouseover event to change the box color to green
// Your code here:


// 5. Add mouseout event to change the box color back to blue
// Your code here:


// 6. Add mousemove event to #mouse-tracker that displays the mouse coordinates
// Update #mouse-pos with the current position
// Your code here:


// 7. Add mousedown and mouseup events to the box
// - mousedown: scale the box to 0.9
// - mouseup: scale back to 1
// Your code here:



// ===== Part 3: Keyboard Events =====

// 8. Add keydown event to #keyboard-input
// Display the pressed key in #key-display
// Show the key, keyCode, and whether Shift/Ctrl/Alt was held
// Your code here:


// 9. Add keyup event that clears the display after 1 second
// Your code here:



// ===== Part 4: Form Events =====

// 10. Add submit event to #demo-form
// Prevent the default submission
// Display the form data in #form-output
// Your code here:


// 11. Add input event to #username
// Show live character count
// Your code here:


// 12. Add focus and blur events to #email
// Add/remove a 'focused' class (style it if you want)
// Your code here:



// ===== Part 5: Event Delegation =====

let itemCounter = 3;

// 13. Add click event to #add-item-btn to add new items to the list
// Your code here:


// 14. Use event delegation on #todo-list to handle:
// - Delete button clicks (remove the item)
// - Checkbox changes (toggle 'completed' class)
// Your code here:



// ===== Part 6: Event Propagation =====

let stopPropagation = false;

// 15. Add click events to all three propagation divs
// Log which element was clicked to #propagation-log
// Your code here:


// 16. Implement the toggle button to enable/disable stopPropagation
// Your code here:



// ===== Part 7: Prevent Default =====

// 17. Prevent the link from navigating and log a message instead
// Your code here:


// 18. Prevent the form from submitting and log a message instead
// Your code here:



// ===== Part 8: Counter with Multiple Events =====

let count = 0;
const counterDisplay = document.getElementById('counter-display');

function updateCounter() {
    counterDisplay.textContent = count;
}

// 19. Add click events to increment, decrement, and reset buttons
// Your code here:


// 20. Add keydown event to document
// Arrow Up increases, Arrow Down decreases
// Hold Shift to change by 10 instead of 1
// Your code here:



// ===== BONUS Challenges =====

// 21. Create a long-press detection (button held for 1+ seconds)
// Your code here:


// 22. Create a drag-and-drop functionality for an element
// Your code here:


// 23. Add a 'once' event that only fires once
// Your code here:

