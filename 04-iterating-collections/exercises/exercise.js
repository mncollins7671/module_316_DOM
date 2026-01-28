// Exercise 04: Iterating Over Collections
// ========================================
// Practice iterating over DOM collections using different methods.

// Helper function to display results
function displayResult(label, value) {
    const output = document.getElementById('output');
    output.innerHTML += `<p><strong>${label}:</strong> ${value}</p>`;
}

// ===== Part 1: Basic Iteration =====

// 1. Use a for loop to log all product names to the console
// Your code here:


// 2. Use a for...of loop to add the class "processed" to each product
// Your code here:


// 3. Use forEach to log each task's text content
// Your code here:



// ===== Part 2: forEach with Index =====

// 4. Use forEach to number each nav link (add "1. ", "2. ", etc. before the text)
// Your code here:


// 5. Add a data-index attribute to each task showing its position
// Your code here:



// ===== Part 3: Converting and Using Array Methods =====

// 6. Get all products, convert to array, and use map() to get an array of prices
// Display the result using displayResult()
// Your code here:


// 7. Use filter() to get only products that are on sale
// Log the count of on-sale products
// Your code here:


// 8. Use filter() to get only completed tasks
// Your code here:


// 9. Use find() to get the first priority task
// Your code here:


// 10. Use reduce() to calculate the total price of all products
// Your code here:



// ===== Part 4: Combining Methods =====

// 11. Get all products in the "electronics" category and calculate their total price
// Hint: filter then reduce
// Your code here:


// 12. Get the names of all on-sale products as an array of strings
// Hint: filter then map
// Your code here:


// 13. Find the most expensive product and log its name
// Hint: Use reduce to compare prices
// Your code here:



// ===== Part 5: Practical Applications =====

// 14. Add click event listeners to all nav links that log their data-page attribute
// Your code here:


// 15. Hide all completed tasks (add the "hidden" class)
// Your code here:


// 16. Make all priority tasks have red text
// Your code here:


// 17. Add a sale badge (text "[SALE]") to the beginning of on-sale product names
// Your code here:



// ===== Part 6: HTMLCollection vs NodeList =====

// 18. Get products using getElementsByClassName and try to use forEach
// This will fail! Fix it by converting to an array first.
// Your code here:


// 19. Demonstrate the "live" nature of HTMLCollection
// Get the products count, add a new product, check the count again
// Your code here:



// ===== BONUS Challenges =====

// 20. Group products by category and display the count for each
// Expected output: { electronics: 3, clothing: 1, accessories: 1 }
// Your code here:


// 21. Create a function that toggles the "completed" class on all tasks
// Your code here:


// 22. Sort tasks: priority first, then incomplete, then completed
// This is tricky! You'll need to use sort with a custom compare function
// Your code here:

