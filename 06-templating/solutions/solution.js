// Exercise 06: Solutions
// ======================

// ===== Part 1: DocumentFragment Basics =====

// 1. Create a DocumentFragment with 10 list items
const numbersList = document.getElementById('numbers-list');
const fragment1 = document.createDocumentFragment();

for (let i = 1; i <= 10; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    fragment1.appendChild(li);
}
numbersList.appendChild(fragment1);

// 2. Function to add items using DocumentFragment
function addItemsToList(items, listId) {
    const list = document.getElementById(listId);
    const fragment = document.createDocumentFragment();
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        fragment.appendChild(li);
    });
    
    list.appendChild(fragment);
}
// Test: addItemsToList(['Apple', 'Banana', 'Cherry'], 'numbers-list');


// ===== Part 2: Using cloneNode =====

// 3 & 4. Clone template and create cards
const simpleTemplate = document.getElementById('simple-card-template');

function createCardFromClone(title, description) {
    const clone = simpleTemplate.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelector('.title').textContent = title;
    clone.querySelector('.description').textContent = description;
    return clone;
}

const cardsContainer = document.getElementById('cards-container');
cardsContainer.appendChild(createCardFromClone('Card 1', 'This is the first card'));
cardsContainer.appendChild(createCardFromClone('Card 2', 'This is the second card'));
cardsContainer.appendChild(createCardFromClone('Card 3', 'This is the third card'));


// ===== Part 3: HTML Template Element =====

// Product data
const products = [
    { name: 'Wireless Headphones', description: 'Premium sound quality', price: 99.99, image: 'https://picsum.photos/200/120?random=1' },
    { name: 'Smart Watch', description: 'Track your fitness', price: 199.99, image: 'https://picsum.photos/200/120?random=2' },
    { name: 'Bluetooth Speaker', description: 'Portable audio bliss', price: 49.99, image: 'https://picsum.photos/200/120?random=3' }
];

// 5 & 6. Use product template
const productTemplate = document.getElementById('product-template');
const productsContainer = document.getElementById('products-container');
const productFragment = document.createDocumentFragment();

products.forEach(product => {
    const clone = productTemplate.content.cloneNode(true);
    
    clone.querySelector('.product-image').src = product.image;
    clone.querySelector('.product-image').alt = product.name;
    clone.querySelector('.product-name').textContent = product.name;
    clone.querySelector('.product-description').textContent = product.description;
    clone.querySelector('.price').textContent = `$${product.price.toFixed(2)}`;
    
    // Add event listener for Add to Cart button
    clone.querySelector('.add-to-cart').addEventListener('click', () => {
        console.log(`Added ${product.name} to cart!`);
    });
    
    productFragment.appendChild(clone);
});

productsContainer.appendChild(productFragment);


// ===== Part 4: Users List =====

const users = [
    { name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/40?img=1' },
    { name: 'Bob Smith', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/40?img=2' },
    { name: 'Carol White', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/40?img=3' },
    { name: 'David Brown', email: 'david@example.com', avatar: 'https://i.pravatar.cc/40?img=4' }
];

// 7. Display users
const userTemplate = document.getElementById('user-template');
const usersContainer = document.getElementById('users-container');
const userFragment = document.createDocumentFragment();

users.forEach(user => {
    const clone = userTemplate.content.cloneNode(true);
    clone.querySelector('.avatar').src = user.avatar;
    clone.querySelector('.avatar').alt = user.name;
    clone.querySelector('.name').textContent = user.name;
    clone.querySelector('.email').textContent = user.email;
    userFragment.appendChild(clone);
});

usersContainer.appendChild(userFragment);


// ===== Part 5: Chat Messages =====

const messages = [
    { text: 'Hey! How are you?', time: '10:30 AM', sent: false },
    { text: 'I\'m good, thanks! You?', time: '10:31 AM', sent: true },
    { text: 'Great! Want to grab coffee?', time: '10:32 AM', sent: false },
    { text: 'Sure, sounds good!', time: '10:33 AM', sent: true },
    { text: 'Meet at 3pm?', time: '10:34 AM', sent: false }
];

// 8. Display chat messages
const messageTemplate = document.getElementById('message-template');
const chatContainer = document.getElementById('chat-container');
const messageFragment = document.createDocumentFragment();

messages.forEach(message => {
    const clone = messageTemplate.content.cloneNode(true);
    const messageDiv = clone.querySelector('.message');
    
    messageDiv.classList.add(message.sent ? 'sent' : 'received');
    clone.querySelector('.text').textContent = message.text;
    clone.querySelector('.time').textContent = ` - ${message.time}`;
    
    messageFragment.appendChild(clone);
});

chatContainer.appendChild(messageFragment);


// ===== Part 6: Performance Test =====

// 9. Performance comparison
const perfList = document.getElementById('performance-list');
const perfResult = document.getElementById('performance-result');

document.getElementById('test-slow').addEventListener('click', () => {
    perfList.innerHTML = '';
    const start = performance.now();
    
    for (let i = 0; i < 1000; i++) {
        const li = document.createElement('li');
        li.textContent = `Direct item ${i}`;
        perfList.appendChild(li);
    }
    
    const end = performance.now();
    perfResult.textContent = `Direct append: ${(end - start).toFixed(2)}ms`;
});

document.getElementById('test-fast').addEventListener('click', () => {
    perfList.innerHTML = '';
    const start = performance.now();
    
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 1000; i++) {
        const li = document.createElement('li');
        li.textContent = `Fragment item ${i}`;
        fragment.appendChild(li);
    }
    perfList.appendChild(fragment);
    
    const end = performance.now();
    perfResult.textContent = `Fragment append: ${(end - start).toFixed(2)}ms`;
});


// ===== BONUS Challenges =====

// 10. Template factory function
function createTemplateFactory(templateId) {
    const template = document.getElementById(templateId);
    
    return function(fillFunction) {
        const clone = template.content.cloneNode(true);
        fillFunction(clone);
        return clone;
    };
}

// Example usage:
const createProduct = createTemplateFactory('product-template');
// const newProduct = createProduct(clone => {
//     clone.querySelector('.product-name').textContent = 'New Product';
// });


// 11. Refresh list function
function refreshList(containerId, templateId, data, fillFunction) {
    const container = document.getElementById(containerId);
    const template = document.getElementById(templateId);
    const fragment = document.createDocumentFragment();
    
    container.innerHTML = '';
    
    data.forEach(item => {
        const clone = template.content.cloneNode(true);
        fillFunction(clone, item);
        fragment.appendChild(clone);
    });
    
    container.appendChild(fragment);
}

// Example usage:
// refreshList('users-container', 'user-template', users, (clone, user) => {
//     clone.querySelector('.name').textContent = user.name;
//     clone.querySelector('.email').textContent = user.email;
// });


// 12. Nested template (conceptual example)
function createNestedComponent(parentData, childrenData) {
    const parentTemplate = document.createElement('div');
    parentTemplate.classList.add('parent-component');
    
    const header = document.createElement('h3');
    header.textContent = parentData.title;
    parentTemplate.appendChild(header);
    
    const childContainer = document.createElement('div');
    childContainer.classList.add('children');
    
    const childFragment = document.createDocumentFragment();
    childrenData.forEach(child => {
        const childEl = document.createElement('div');
        childEl.classList.add('child-item');
        childEl.textContent = child;
        childFragment.appendChild(childEl);
    });
    childContainer.appendChild(childFragment);
    parentTemplate.appendChild(childContainer);
    
    return parentTemplate;
}

console.log('All template exercises completed!');
