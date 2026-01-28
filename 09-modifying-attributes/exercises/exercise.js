// Exercise 09: Modifying Attributes
// ==================================

// ===== Part 1: Basic getAttribute/setAttribute =====

const testLink = document.getElementById('test-link');
const linkInfo = document.getElementById('link-info');

// 1. When "Show Attributes" is clicked, display the href, target, and title 
// of #test-link in #link-info
// Your code here:


// 2. When "Change URL" is clicked, change the href to "https://google.com"
// and update the title attribute too
// Your code here:


// 3. When "Toggle Target" is clicked, toggle the target attribute
// If it's "_blank", change to "_self" (and vice versa)
// If the attribute doesn't exist, add target="_blank"
// Your code here:



// ===== Part 2: Image Attributes =====

const mainImage = document.getElementById('main-image');
const imageInfo = document.getElementById('image-info');
let imageIndex = 1;

// 4. When "Change Image" is clicked, change the image src to a new random image
// Also update the alt attribute
// Hint: Use https://picsum.photos/300/200?random=N where N is a number
// Your code here:


// 5. When "Show Image Info" is clicked, display the src, alt, and loading 
// attributes in #image-info
// Your code here:



// ===== Part 3: Form Attributes =====

const agreeCheckbox = document.getElementById('agree-checkbox');
const submitBtn = document.getElementById('submit-btn');
const nameInput = document.getElementById('name-input');

// 6. When the checkbox is checked, enable the submit button (remove disabled)
// When unchecked, disable the button (add disabled)
// Your code here:


// 7. Log the input's placeholder and maxlength attributes when the page loads
// Your code here:


// 8. Change the input's placeholder when it receives focus
// and change it back when it loses focus
// Your code here:



// ===== Part 4: Data Attributes =====

const cart = [];
const cartDisplay = document.getElementById('cart-display');

// 9. Add click handlers to the "Add to Cart" buttons
// When clicked, get the product's data-id, data-price, and data-category
// Add the product to the cart array and update the cart display
// Your code here:


// 10. Toggle the "selected" class on product cards when clicked
// Also update the data-selected attribute to "true" or "false"
// Your code here:


// 11. Filter products by category - log all products in the "electronics" category
// Your code here:



// ===== Part 5: Tab Interface =====

// 12. Implement the tab functionality using data attributes:
// - When a tab is clicked, get its data-tab value
// - Hide all tab content (remove 'active' class)
// - Show the matching content (where data-content matches data-tab)
// - Update tab active states
// Your code here:



// ===== Part 6: Links Management =====

// 13. Add target="_blank" to all external links (those starting with http)
// Your code here:


// 14. When "Open External in New Tab" is clicked, add target="_blank" and 
// rel="noopener noreferrer" to all external links
// Your code here:


// 15. Add a download attribute to a specific link
// Your code here:



// ===== BONUS Challenges =====

// 16. Create a function that copies all data attributes from one element to another
// function copyDataAttributes(source, target) { ... }
// Your code here:


// 17. Create a tooltip system using data-tooltip attribute
// When hovering over elements with data-tooltip, show the tooltip text
// Your code here:


// 18. Create a function that logs all attributes of an element
// function logAllAttributes(element) { ... }
// Your code here:

