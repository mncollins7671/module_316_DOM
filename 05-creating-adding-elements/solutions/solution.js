// Exercise 05: Solutions
// ======================

// ===== Part 1: Basic Element Creation =====

// 1. Create a paragraph with text
const para = document.createElement('p');
para.textContent = 'Hello, DOM!';
document.getElementById('basic-output').appendChild(para);

// 2. Create a div with class "card"
const cardDiv = document.createElement('div');
cardDiv.classList.add('card');
cardDiv.textContent = 'This is a card element';
document.getElementById('basic-output').appendChild(cardDiv);

// 3. Create an h3, style it, and prepend
const heading = document.createElement('h3');
heading.textContent = 'I am at the top!';
heading.style.color = 'red';
document.getElementById('basic-output').prepend(heading);

// 4. Create a link
const link = document.createElement('a');
link.href = 'https://example.com';
link.textContent = 'Visit Example';
link.target = '_blank';
document.getElementById('basic-output').appendChild(link);


// ===== Part 2: List Building =====

const fruitList = document.getElementById('fruit-list');

// 5. Add "Cherry" to the end
const cherry = document.createElement('li');
cherry.textContent = 'Cherry';
fruitList.appendChild(cherry);

// 6. Add "Grape" to the beginning
const grape = document.createElement('li');
grape.textContent = 'Grape';
fruitList.prepend(grape);

// 7. Add "Mango" before "Cherry"
const mango = document.createElement('li');
mango.textContent = 'Mango';
fruitList.insertBefore(mango, cherry);

// 8. Function to add a new fruit
function addFruit(fruitName) {
    const li = document.createElement('li');
    li.textContent = fruitName;
    fruitList.appendChild(li);
}
addFruit('Strawberry');


// ===== Part 3: Creating Cards =====

// 9. Create card function
function createCard(title, description, imageUrl = null) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    // 11. Add image if provided
    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = title;
        img.style.maxWidth = '100%';
        card.appendChild(img);
    }
    
    const h3 = document.createElement('h3');
    h3.textContent = title;
    card.appendChild(h3);
    
    const p = document.createElement('p');
    p.textContent = description;
    card.appendChild(p);
    
    return card;
}

// 10. Add 3 cards
const cardsContainer = document.getElementById('cards-container');
cardsContainer.appendChild(createCard('Card 1', 'This is the first card'));
cardsContainer.appendChild(createCard('Card 2', 'This is the second card'));
cardsContainer.appendChild(createCard('Card 3', 'This is the third card'));


// ===== Part 4: Todo List =====

// 12 & 14. Create todo item with delete functionality
function createTodoItem(text) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const span = document.createElement('span');
    span.textContent = text;
    span.style.marginLeft = '10px';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        todoItem.remove();
    });
    
    todoItem.appendChild(checkbox);
    todoItem.appendChild(span);
    todoItem.appendChild(deleteBtn);
    
    return todoItem;
}

// 13. Create 3 todo items
const todoList = document.getElementById('todo-list');
todoList.appendChild(createTodoItem('Learn JavaScript'));
todoList.appendChild(createTodoItem('Practice DOM manipulation'));
todoList.appendChild(createTodoItem('Build a project'));


// ===== Part 5: Navigation =====

// 15. Create navigation from array
const navItems = [
    { text: 'Home', href: '#home' },
    { text: 'About', href: '#about' },
    { text: 'Services', href: '#services' },
    { text: 'Contact', href: '#contact' }
];

const mainNav = document.getElementById('main-nav');
navItems.forEach(item => {
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.text;
    a.classList.add('nav-item');
    mainNav.appendChild(a);
});


// ===== Part 6: Button Factory =====

// 16. Create button function
function createButton(text, color, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('btn');
    button.style.backgroundColor = color;
    button.addEventListener('click', onClick);
    return button;
}

// 17. Create 3 buttons
const buttonContainer = document.getElementById('button-container');
const buttonOutput = document.getElementById('button-output');

buttonContainer.appendChild(
    createButton('Red Button', 'red', () => alert('Red clicked!'))
);
buttonContainer.appendChild(
    createButton('Green Button', 'green', () => console.log('Green clicked!'))
);
buttonContainer.appendChild(
    createButton('Blue Button', 'blue', () => {
        buttonOutput.style.backgroundColor = 'blue';
        buttonOutput.style.height = '50px';
    })
);


// ===== BONUS Challenges =====

// 18. Create a table
const tableData = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Jane', age: 25, city: 'Los Angeles' },
    { name: 'Bob', age: 35, city: 'Chicago' }
];

const table = document.createElement('table');
table.style.borderCollapse = 'collapse';
table.style.marginTop = '20px';

// Create header
const thead = document.createElement('thead');
const headerRow = document.createElement('tr');
['Name', 'Age', 'City'].forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    th.style.border = '1px solid #ddd';
    th.style.padding = '8px';
    th.style.backgroundColor = '#f4f4f4';
    headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);

// Create body
const tbody = document.createElement('tbody');
tableData.forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach(cellValue => {
        const td = document.createElement('td');
        td.textContent = cellValue;
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
        tr.appendChild(td);
    });
    tbody.appendChild(tr);
});
table.appendChild(tbody);
document.getElementById('basic-output').appendChild(table);


// 19. HTML to Element function
function htmlToElement(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
}

const myElement = htmlToElement('<div class="test"><span>Hello</span></div>');
console.log('19. HTML to Element:', myElement);


// 20. Modal component
function createModal(title, content) {
    // Overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    // Modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 8px;
        min-width: 300px;
        max-width: 500px;
    `;
    
    // Title
    const titleEl = document.createElement('h2');
    titleEl.textContent = title;
    modal.appendChild(titleEl);
    
    // Content
    const contentEl = document.createElement('p');
    contentEl.textContent = content;
    modal.appendChild(contentEl);
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.classList.add('btn');
    closeBtn.addEventListener('click', () => overlay.remove());
    modal.appendChild(closeBtn);
    
    overlay.appendChild(modal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
    
    return overlay;
}

console.log('20. Modal function created');
// To show: document.body.appendChild(createModal('My Modal', 'This is the content'));
