# Lesson 05: Creating and Adding Elements

## Learning Objectives

By the end of this lesson, you will be able to:
- Create new elements using `createElement()`
- Add content to elements
- Add elements to the DOM using `appendChild()` and `prepend()`
- Understand different methods for inserting elements
- Build dynamic content from JavaScript

---

## Why Create Elements Dynamically?

Static HTML is great, but real applications need to:
- Display data fetched from servers
- Add items to lists based on user input
- Create UI components on demand
- Build content based on conditions

---

## Step 1: Create an Element

Use `document.createElement()` to create a new element.

```javascript
// Create a paragraph element
const paragraph = document.createElement('p');

// Create a div
const div = document.createElement('div');

// Create a button
const button = document.createElement('button');

// Create a list item
const li = document.createElement('li');
```

**Important:** The element exists in memory but is NOT yet visible on the page!

---

## Step 2: Add Content and Attributes

Before adding the element to the DOM, set its content and properties.

```javascript
// Create an element
const card = document.createElement('div');

// Add text content
card.textContent = 'This is a card';

// Add HTML content
card.innerHTML = '<h3>Title</h3><p>Description</p>';

// Add classes
card.classList.add('card', 'featured');

// Add ID
card.id = 'main-card';

// Add attributes
card.setAttribute('data-id', '123');

// Add styles
card.style.backgroundColor = 'lightblue';
card.style.padding = '20px';
```

---

## Step 3: Add to the DOM

### appendChild()
Adds an element as the **last child** of a parent.

```javascript
const list = document.getElementById('my-list');
const newItem = document.createElement('li');
newItem.textContent = 'New Item';

list.appendChild(newItem);
// New item appears at the END of the list
```

### prepend()
Adds an element as the **first child** of a parent.

```javascript
const list = document.getElementById('my-list');
const newItem = document.createElement('li');
newItem.textContent = 'First Item';

list.prepend(newItem);
// New item appears at the BEGINNING of the list
```

### append()
Similar to appendChild but can add multiple elements and text.

```javascript
const container = document.getElementById('container');
const div1 = document.createElement('div');
const div2 = document.createElement('div');

// Add multiple elements at once
container.append(div1, div2, 'Some text');
```

---

## Comparison of Insertion Methods

| Method | Position | Multiple Elements | Text Nodes |
|--------|----------|-------------------|------------|
| `appendChild()` | End | No | No |
| `append()` | End | Yes | Yes |
| `prepend()` | Start | Yes | Yes |
| `insertBefore()` | Before specific child | No | No |
| `after()` | After element | Yes | Yes |
| `before()` | Before element | Yes | Yes |

---

## More Insertion Methods

### insertBefore()
Insert before a specific child element.

```javascript
const list = document.getElementById('my-list');
const newItem = document.createElement('li');
newItem.textContent = 'Inserted Item';

const thirdItem = list.children[2];
list.insertBefore(newItem, thirdItem);
// New item appears BEFORE the third item
```

### before() and after()
Insert relative to an element (not its parent).

```javascript
const existingElement = document.querySelector('.existing');
const newElement = document.createElement('div');

existingElement.before(newElement);  // Insert before
existingElement.after(newElement);   // Insert after
```

---

## Complete Examples

### Example 1: Add Item to a List
```javascript
function addListItem(text) {
    // 1. Create element
    const li = document.createElement('li');
    
    // 2. Add content
    li.textContent = text;
    
    // 3. Add to DOM
    document.getElementById('my-list').appendChild(li);
}

addListItem('New task');
addListItem('Another task');
```

### Example 2: Create a Card Component
```javascript
function createCard(title, description, imageUrl) {
    // Create container
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Create image
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;
    
    // Create title
    const h3 = document.createElement('h3');
    h3.textContent = title;
    
    // Create description
    const p = document.createElement('p');
    p.textContent = description;
    
    // Assemble card
    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(p);
    
    return card;
}

// Use the function
const container = document.getElementById('cards-container');
const card = createCard('My Card', 'This is a description', 'image.jpg');
container.appendChild(card);
```

### Example 3: Build from Array Data
```javascript
const users = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' }
];

const userList = document.getElementById('user-list');

users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${user.name}</strong> - ${user.email}`;
    userList.appendChild(li);
});
```

### Example 4: Create Interactive Elements
```javascript
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('btn');
    button.addEventListener('click', onClick);
    return button;
}

const container = document.getElementById('buttons');
const btn = createButton('Click Me', () => {
    alert('Button clicked!');
});
container.appendChild(btn);
```

---

## Removing Elements

### remove()
Remove an element from the DOM.

```javascript
const element = document.getElementById('to-remove');
element.remove();
```

### removeChild()
Remove a child from a parent.

```javascript
const parent = document.getElementById('parent');
const child = document.getElementById('child');
parent.removeChild(child);
```

---

## Replacing Elements

### replaceWith()
Replace an element with another.

```javascript
const oldElement = document.getElementById('old');
const newElement = document.createElement('div');
newElement.textContent = 'I am new!';

oldElement.replaceWith(newElement);
```

### replaceChild()
Replace a child through its parent.

```javascript
const parent = document.getElementById('parent');
const oldChild = document.getElementById('old-child');
const newChild = document.createElement('div');

parent.replaceChild(newChild, oldChild);
```

---

## Performance Tip: Batch Additions

Adding elements one at a time can be slow. We'll cover better techniques (DocumentFragment) in the next lesson, but here's a preview:

```javascript
// ❌ Slow - multiple DOM updates
for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    document.getElementById('list').appendChild(li);
}

// ✅ Better - build string and set once (for simple cases)
let html = '';
for (let i = 0; i < 100; i++) {
    html += `<li>Item ${i}</li>`;
}
document.getElementById('list').innerHTML = html;
```

---

## Summary

- `createElement()` creates an element in memory
- Set content with `textContent` or `innerHTML`
- Add classes with `classList.add()`
- `appendChild()` adds at the end
- `prepend()` adds at the beginning
- `insertBefore()` adds before a specific element
- `remove()` removes an element from the DOM
- Always add content and attributes before appending to the DOM

---

## Next Lesson

In the next lesson, we'll learn about **DocumentFragment and cloneNode** for creating templated content efficiently.
