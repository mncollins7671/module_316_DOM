# Lesson 06: Templating with DocumentFragment and cloneNode

## Learning Objectives

By the end of this lesson, you will be able to:
- Use DocumentFragment to batch DOM operations
- Clone elements using `cloneNode()`
- Use HTML `<template>` elements for reusable content
- Understand when and why to use these techniques

---

## The Problem: Performance

Every time you add an element to the DOM, the browser may need to:
- Recalculate styles
- Reflow the layout
- Repaint the screen

Adding 100 elements one at a time = 100 potential reflows! This slows down your page.

```javascript
// ❌ Slow - causes reflow for each item
const list = document.getElementById('list');
for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    list.appendChild(li); // DOM update on EVERY iteration
}
```

---

## Solution 1: DocumentFragment

A `DocumentFragment` is a lightweight container that holds elements. It's **not part of the DOM** until you add it, so you can build up content without causing reflows.

### Creating a DocumentFragment
```javascript
const fragment = document.createDocumentFragment();
```

### Using DocumentFragment
```javascript
const list = document.getElementById('list');
const fragment = document.createDocumentFragment();

// Build all items in the fragment (no reflows yet)
for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);
}

// Single DOM update - one reflow!
list.appendChild(fragment);
```

### Key Points:
- Fragment itself disappears when appended (only children are added)
- Works just like any other parent element
- Can contain any type of nodes
- Great for building lists, tables, or any repeated content

---

## Complete DocumentFragment Example

```javascript
// Data to display
const products = [
    { name: 'Widget', price: 9.99 },
    { name: 'Gadget', price: 19.99 },
    { name: 'Doohickey', price: 29.99 }
];

// Create fragment
const fragment = document.createDocumentFragment();

// Build product cards
products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    
    const name = document.createElement('h3');
    name.textContent = product.name;
    
    const price = document.createElement('p');
    price.textContent = `$${product.price}`;
    
    card.appendChild(name);
    card.appendChild(price);
    fragment.appendChild(card);
});

// Add all products at once
document.getElementById('products').appendChild(fragment);
```

---

## Solution 2: cloneNode()

`cloneNode()` creates a copy of an existing element. This is useful when you have a template element in your HTML.

### Syntax
```javascript
const clone = element.cloneNode(deep);
// deep = true: clone all descendants
// deep = false: clone only the element itself
```

### Example
```javascript
// HTML: <div id="template-card" class="card"><h3></h3><p></p></div>

const template = document.getElementById('template-card');

function createCard(title, text) {
    // Clone the template
    const clone = template.cloneNode(true);
    
    // Fill in the content
    clone.querySelector('h3').textContent = title;
    clone.querySelector('p').textContent = text;
    
    // Remove template id
    clone.removeAttribute('id');
    
    return clone;
}
```

### Shallow vs Deep Clone

```html
<div id="parent">
    <span>Child 1</span>
    <span>Child 2</span>
</div>
```

```javascript
const parent = document.getElementById('parent');

// Shallow clone - just the div, no children
const shallow = parent.cloneNode(false);
console.log(shallow.innerHTML); // ""

// Deep clone - div AND all children
const deep = parent.cloneNode(true);
console.log(deep.innerHTML); // "<span>Child 1</span><span>Child 2</span>"
```

---

## Solution 3: HTML Template Element

The `<template>` element is perfect for reusable markup. Its content is **not rendered** until you clone and use it.

### HTML Setup
```html
<template id="card-template">
    <div class="card">
        <img src="" alt="" class="card-image">
        <h3 class="card-title"></h3>
        <p class="card-description"></p>
        <button class="card-button">View Details</button>
    </div>
</template>

<div id="cards-container"></div>
```

### JavaScript Usage
```javascript
const template = document.getElementById('card-template');
const container = document.getElementById('cards-container');

function createCardFromTemplate(title, description, imageUrl) {
    // Clone the template content
    const clone = template.content.cloneNode(true);
    
    // Fill in the data
    clone.querySelector('.card-title').textContent = title;
    clone.querySelector('.card-description').textContent = description;
    clone.querySelector('.card-image').src = imageUrl;
    clone.querySelector('.card-image').alt = title;
    
    return clone;
}

// Use it
const card = createCardFromTemplate(
    'My Product',
    'This is a great product!',
    'product.jpg'
);
container.appendChild(card);
```

### Key Points:
- Template content is accessed via `.content` property
- Content is a DocumentFragment
- Must clone with `cloneNode(true)` to get all elements
- Perfect for complex, reusable structures

---

## Combining Techniques

Use DocumentFragment with templates for maximum efficiency:

```javascript
const template = document.getElementById('item-template');
const container = document.getElementById('items');
const fragment = document.createDocumentFragment();

const data = [
    { title: 'Item 1', desc: 'Description 1' },
    { title: 'Item 2', desc: 'Description 2' },
    { title: 'Item 3', desc: 'Description 3' }
];

data.forEach(item => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.title').textContent = item.title;
    clone.querySelector('.desc').textContent = item.desc;
    fragment.appendChild(clone);
});

// Single DOM operation
container.appendChild(fragment);
```

---

## When to Use What

| Technique | Use When |
|-----------|----------|
| `DocumentFragment` | Adding multiple elements at once |
| `cloneNode()` | Duplicating existing elements |
| `<template>` | You have complex reusable HTML structures |
| `createElement()` | Creating simple, one-off elements |

---

## Performance Comparison

```javascript
// Test with 1000 items

// ❌ Direct append: ~50-100ms
for (let i = 0; i < 1000; i++) {
    list.appendChild(createItem(i));
}

// ✅ With fragment: ~10-20ms
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    fragment.appendChild(createItem(i));
}
list.appendChild(fragment);
```

---

## Summary

- **DocumentFragment** batches DOM operations for better performance
- **cloneNode()** duplicates elements (use `true` for deep clones)
- **Template elements** provide hidden, reusable HTML structures
- Access template content via `.content` property
- Combine these techniques for efficient, maintainable code
- Always batch large DOM updates for best performance

---

## Next Lesson

In the next lesson, we'll learn how to **modify content** using `innerHTML`, `innerText`, and `textContent`.
