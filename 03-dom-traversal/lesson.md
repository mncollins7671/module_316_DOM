# Lesson 03: DOM Traversal

## Learning Objectives

By the end of this lesson, you will be able to:
- Navigate from one element to its parent
- Navigate from a parent to its children
- Navigate between sibling elements
- Understand the difference between nodes and elements

---

## What is DOM Traversal?

DOM traversal means moving through the DOM tree from one node to another using their relationships. Instead of selecting elements directly by ID or class, you navigate based on their position relative to other elements.

This is useful when:
- You don't know the exact ID or class of an element
- You want to find elements based on a known element
- You're working with dynamically generated content

---

## Parent-Child-Sibling Relationships

```
        ┌─────────┐
        │ parent  │
        └────┬────┘
             │
    ┌────────┼────────┐
    │        │        │
┌───▼───┐┌───▼───┐┌───▼───┐
│ child ││ child ││ child │
│(first)││       ││(last) │
└───┬───┘└───┬───┘└───┬───┘
    │        │        │
    └────────┴────────┘
       siblings
```

---

## Navigating to Parents

### parentNode
Returns the parent node of an element.

```javascript
const child = document.querySelector('.child');
const parent = child.parentNode;
```

### parentElement
Returns the parent element (same as parentNode for elements, but returns null if parent is not an element).

```javascript
const child = document.querySelector('.child');
const parent = child.parentElement;
```

### closest()
Returns the nearest ancestor that matches a selector (including the element itself).

```javascript
// HTML: <div class="wrapper"><div class="inner"><p>Text</p></div></div>
const p = document.querySelector('p');
const wrapper = p.closest('.wrapper'); // Finds the outer div
```

---

## Navigating to Children

### children
Returns an HTMLCollection of all child **elements** (no text nodes).

```javascript
const parent = document.querySelector('.parent');
const kids = parent.children;
console.log(kids.length); // Number of child elements
```

### childNodes
Returns a NodeList of all child **nodes** (includes text, comments, etc.).

```javascript
const parent = document.querySelector('.parent');
const nodes = parent.childNodes;
// Includes text nodes (whitespace between elements!)
```

### firstElementChild / lastElementChild
Returns the first or last child **element**.

```javascript
const parent = document.querySelector('.parent');
const first = parent.firstElementChild;
const last = parent.lastElementChild;
```

### firstChild / lastChild
Returns the first or last child **node** (could be text/whitespace!).

```javascript
const parent = document.querySelector('.parent');
const first = parent.firstChild; // Might be a text node!
```

---

## Navigating to Siblings

### nextElementSibling / previousElementSibling
Returns the next or previous sibling **element**.

```javascript
const middle = document.querySelector('.middle');
const next = middle.nextElementSibling;
const prev = middle.previousElementSibling;
```

### nextSibling / previousSibling
Returns the next or previous sibling **node** (could be text/whitespace!).

```javascript
const middle = document.querySelector('.middle');
const next = middle.nextSibling; // Might be a text node!
```

---

## Nodes vs Elements: The Important Difference

### Nodes include:
- Element nodes (HTML tags)
- Text nodes (text content, **including whitespace**)
- Comment nodes

### Elements are:
- Only HTML tags

**Common Gotcha:** Whitespace between HTML tags creates text nodes!

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
```

```javascript
const ul = document.querySelector('ul');

// This includes text nodes (the whitespace/newlines)!
console.log(ul.childNodes.length); // 5 (text, li, text, li, text)

// This only includes element nodes
console.log(ul.children.length); // 2 (li, li)
```

### Best Practice
**Use the `Element` versions** to avoid dealing with text nodes:
- `parentElement` instead of `parentNode`
- `children` instead of `childNodes`
- `firstElementChild` instead of `firstChild`
- `nextElementSibling` instead of `nextSibling`

---

## Practical Examples

### Example 1: Navigate Up to Find a Container
```html
<div class="card">
    <h3>Title</h3>
    <p>Content</p>
    <button class="delete-btn">Delete</button>
</div>
```

```javascript
const deleteBtn = document.querySelector('.delete-btn');

// Navigate up to the card container
const card = deleteBtn.parentElement;
// or
const card = deleteBtn.closest('.card');
```

### Example 2: Loop Through Siblings
```html
<ul id="menu">
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
</ul>
```

```javascript
const menu = document.getElementById('menu');
const firstItem = menu.firstElementChild;

// Start at first child, move through siblings
let current = firstItem;
while (current) {
    console.log(current.textContent);
    current = current.nextElementSibling;
}
```

### Example 3: Get All Children
```javascript
const container = document.querySelector('.container');
const children = container.children;

for (let i = 0; i < children.length; i++) {
    console.log(children[i]);
}
```

---

## Summary Table

| Property | Returns | Includes Text Nodes? |
|----------|---------|---------------------|
| `parentNode` | Parent node | N/A |
| `parentElement` | Parent element | N/A |
| `children` | Child elements | No ✓ |
| `childNodes` | Child nodes | Yes ⚠️ |
| `firstElementChild` | First child element | No ✓ |
| `firstChild` | First child node | Yes ⚠️ |
| `lastElementChild` | Last child element | No ✓ |
| `lastChild` | Last child node | Yes ⚠️ |
| `nextElementSibling` | Next sibling element | No ✓ |
| `nextSibling` | Next sibling node | Yes ⚠️ |
| `previousElementSibling` | Previous sibling element | No ✓ |
| `previousSibling` | Previous sibling node | Yes ⚠️ |

---

## Summary

- DOM traversal lets you navigate between related elements
- Use `Element` properties to avoid text node issues
- `parentElement` goes up, `children` goes down, `siblings` go sideways
- `closest()` is powerful for finding ancestor elements

---

## Next Lesson

In the next lesson, we'll learn how to **iterate over collections of elements** to perform actions on multiple elements at once.
