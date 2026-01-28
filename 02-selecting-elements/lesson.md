# Lesson 02: Selecting Elements

## Learning Objectives

By the end of this lesson, you will be able to:
- Select elements using `getElementById()`
- Select elements using `querySelector()` and `querySelectorAll()`
- Understand the difference between these methods
- Choose the right method for different situations

---

## Why Select Elements?

Before you can modify an element on the page, you need to **select** it first. Think of it like this: you can't change the color of a wall until you've identified which wall you want to paint.

---

## Method 1: getElementById()

The `getElementById()` method selects a **single element** by its unique `id` attribute.

### Syntax
```javascript
const element = document.getElementById('elementId');
```

### Example
```html
<h1 id="main-title">Welcome to My Site</h1>
<p id="intro">This is the introduction paragraph.</p>
```

```javascript
// Select the h1 element
const title = document.getElementById('main-title');
console.log(title); // <h1 id="main-title">Welcome to My Site</h1>

// Select the paragraph
const intro = document.getElementById('intro');
console.log(intro.textContent); // "This is the introduction paragraph."
```

### Key Points:
- ✅ Returns a **single element** (or `null` if not found)
- ✅ Very fast - IDs should be unique
- ❌ Only works with `id` attributes
- ❌ Cannot select multiple elements

---

## Method 2: querySelector()

The `querySelector()` method selects the **first element** that matches a CSS selector.

### Syntax
```javascript
const element = document.querySelector('css-selector');
```

### Examples
```html
<div class="container">
    <p class="text">First paragraph</p>
    <p class="text">Second paragraph</p>
    <button id="submit-btn">Submit</button>
</div>
```

```javascript
// Select by class (gets the FIRST match)
const firstText = document.querySelector('.text');
console.log(firstText.textContent); // "First paragraph"

// Select by ID (same as getElementById)
const button = document.querySelector('#submit-btn');

// Select by tag name
const div = document.querySelector('div');

// Select by attribute
const btn = document.querySelector('[id="submit-btn"]');

// Complex selectors
const nestedP = document.querySelector('.container p');
const firstChild = document.querySelector('.container > p:first-child');
```

### Key Points:
- ✅ Uses CSS selector syntax (very flexible!)
- ✅ Works with classes, IDs, attributes, pseudo-selectors
- ❌ Returns only the **first** matching element
- ❌ Slightly slower than `getElementById()` for IDs

---

## Method 3: querySelectorAll()

The `querySelectorAll()` method selects **all elements** that match a CSS selector.

### Syntax
```javascript
const elements = document.querySelectorAll('css-selector');
```

### Examples
```html
<ul>
    <li class="item">Item 1</li>
    <li class="item">Item 2</li>
    <li class="item">Item 3</li>
</ul>
```

```javascript
// Select all list items
const items = document.querySelectorAll('.item');
console.log(items.length); // 3

// Select all paragraphs on the page
const allParagraphs = document.querySelectorAll('p');

// Select all elements with a specific attribute
const allInputs = document.querySelectorAll('input[type="text"]');

// Multiple selectors
const headings = document.querySelectorAll('h1, h2, h3');
```

### Key Points:
- ✅ Returns a **NodeList** (like an array)
- ✅ Can select multiple elements at once
- ✅ Very flexible with CSS selectors
- ⚠️ NodeList is **static** (doesn't update automatically)

---

## Comparison Table

| Method | Returns | Use Case |
|--------|---------|----------|
| `getElementById()` | Single element or `null` | When you have a unique ID |
| `querySelector()` | First matching element or `null` | When you need one element with complex selector |
| `querySelectorAll()` | NodeList (all matches) | When you need multiple elements |

---

## Caching Elements

When you'll use an element multiple times, **cache** it in a variable. This improves performance and makes your code cleaner.

```javascript
// ❌ Bad - selecting the same element multiple times
document.getElementById('title').textContent = 'Hello';
document.getElementById('title').style.color = 'blue';
document.getElementById('title').classList.add('active');

// ✅ Good - cache the element first
const title = document.getElementById('title');
title.textContent = 'Hello';
title.style.color = 'blue';
title.classList.add('active');
```

---

## Common Mistakes

### 1. Forgetting the # for IDs in querySelector
```javascript
// ❌ Wrong
const element = document.querySelector('myId');

// ✅ Correct
const element = document.querySelector('#myId');
```

### 2. Expecting an array from querySelectorAll
```javascript
const items = document.querySelectorAll('.item');

// ❌ Wrong - NodeList doesn't have all array methods
items.map(item => item.textContent);

// ✅ Correct - Convert to array first
Array.from(items).map(item => item.textContent);

// ✅ Or use spread operator
[...items].map(item => item.textContent);
```

---

## Summary

- `getElementById()` is fastest for selecting by ID
- `querySelector()` selects the first matching element using CSS selectors
- `querySelectorAll()` selects all matching elements as a NodeList
- Cache frequently used elements in variables
- Remember the `#` for IDs and `.` for classes in querySelector methods

---

## Next Lesson

In the next lesson, we'll learn how to **traverse the DOM** using parent-child-sibling relationships.
