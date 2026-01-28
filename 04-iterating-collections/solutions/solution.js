// Exercise 04: Solutions
// ======================

// Helper function to display results
function displayResult(label, value) {
    const output = document.getElementById('output');
    output.innerHTML += `<p><strong>${label}:</strong> ${value}</p>`;
}

// ===== Part 1: Basic Iteration =====

// 1. Use a for loop to log all product names to the console
const products = document.querySelectorAll('.product');
for (let i = 0; i < products.length; i++) {
    console.log('1.', products[i].querySelector('h3').textContent);
}

// 2. Use a for...of loop to add the class "processed" to each product
for (const product of products) {
    product.classList.add('processed');
}
console.log('2. Added "processed" class to all products');

// 3. Use forEach to log each task's text content
const tasks = document.querySelectorAll('.task');
tasks.forEach(task => {
    console.log('3.', task.textContent);
});


// ===== Part 2: forEach with Index =====

// 4. Use forEach to number each nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link, index) => {
    link.textContent = `${index + 1}. ${link.textContent}`;
});
console.log('4. Numbered all nav links');

// 5. Add a data-index attribute to each task
tasks.forEach((task, index) => {
    task.dataset.index = index;
});
console.log('5. Added data-index to all tasks');


// ===== Part 3: Converting and Using Array Methods =====

// 6. Get an array of prices
const prices = Array.from(products).map(product => 
    parseFloat(product.dataset.price)
);
displayResult('6. Prices', prices.join(', '));

// 7. Filter products that are on sale
const onSaleProducts = [...products].filter(product => 
    product.classList.contains('on-sale')
);
displayResult('7. On sale count', onSaleProducts.length);

// 8. Get only completed tasks
const completedTasks = [...tasks].filter(task => 
    task.classList.contains('completed')
);
displayResult('8. Completed tasks', completedTasks.length);

// 9. Find the first priority task
const firstPriority = [...tasks].find(task => 
    task.classList.contains('priority')
);
displayResult('9. First priority task', firstPriority?.textContent);

// 10. Calculate total price
const totalPrice = [...products].reduce((sum, product) => {
    return sum + parseFloat(product.dataset.price);
}, 0);
displayResult('10. Total price', `$${totalPrice.toFixed(2)}`);


// ===== Part 4: Combining Methods =====

// 11. Total price of electronics
const electronicsTotal = [...products]
    .filter(p => p.dataset.category === 'electronics')
    .reduce((sum, p) => sum + parseFloat(p.dataset.price), 0);
displayResult('11. Electronics total', `$${electronicsTotal.toFixed(2)}`);

// 12. Names of on-sale products
const saleNames = [...products]
    .filter(p => p.classList.contains('on-sale'))
    .map(p => p.querySelector('h3').textContent);
displayResult('12. On sale products', saleNames.join(', '));

// 13. Most expensive product
const mostExpensive = [...products].reduce((max, product) => {
    const price = parseFloat(product.dataset.price);
    const maxPrice = parseFloat(max.dataset.price);
    return price > maxPrice ? product : max;
});
displayResult('13. Most expensive', mostExpensive.querySelector('h3').textContent);


// ===== Part 5: Practical Applications =====

// 14. Add click event listeners to nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('14. Clicked page:', link.dataset.page);
    });
});

// 15. Hide completed tasks
completedTasks.forEach(task => {
    task.classList.add('hidden');
});
console.log('15. Hidden completed tasks');

// 16. Make priority tasks have red text
document.querySelectorAll('.task.priority').forEach(task => {
    task.style.color = 'red';
});
console.log('16. Made priority tasks red');

// 17. Add sale badge to on-sale products
onSaleProducts.forEach(product => {
    const h3 = product.querySelector('h3');
    h3.textContent = '[SALE] ' + h3.textContent;
});
console.log('17. Added sale badges');


// ===== Part 6: HTMLCollection vs NodeList =====

// 18. HTMLCollection forEach fix
const productsCollection = document.getElementsByClassName('product');
// This would fail: productsCollection.forEach(...)
// Fix by converting:
Array.from(productsCollection).forEach(product => {
    console.log('18.', product.querySelector('h3').textContent);
});

// 19. Live collection demo
const liveCollection = document.getElementsByClassName('product');
console.log('19. Before adding:', liveCollection.length);
// Note: We're not actually adding to avoid messing up the page
// But the collection would update automatically if we did


// ===== BONUS Challenges =====

// 20. Group products by category
const categories = [...products].reduce((groups, product) => {
    const category = product.dataset.category;
    groups[category] = (groups[category] || 0) + 1;
    return groups;
}, {});
displayResult('20. Categories', JSON.stringify(categories));

// 21. Toggle completed function
function toggleAllCompleted() {
    document.querySelectorAll('.task').forEach(task => {
        task.classList.toggle('completed');
    });
}
console.log('21. toggleAllCompleted function created');

// 22. Sort tasks by priority
function sortTasks() {
    const tasksContainer = document.getElementById('tasks-section');
    const taskElements = [...document.querySelectorAll('.task')];
    
    taskElements.sort((a, b) => {
        const aScore = a.classList.contains('priority') ? 0 : 
                       a.classList.contains('completed') ? 2 : 1;
        const bScore = b.classList.contains('priority') ? 0 : 
                       b.classList.contains('completed') ? 2 : 1;
        return aScore - bScore;
    });
    
    // We'd need to re-append them to apply the sort
    // taskElements.forEach(task => tasksContainer.appendChild(task));
}
console.log('22. sortTasks function created');
