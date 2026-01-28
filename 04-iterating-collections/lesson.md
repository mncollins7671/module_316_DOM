# Lesson 04: Iterating Over Collections

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand HTMLCollections and NodeLists
- Iterate over collections using various methods
- Choose the appropriate iteration method for your use case
- Perform batch operations on multiple elements

---

## What Are DOM Collections?

When you select multiple elements from the DOM, you get back a collection. There are two types:

### HTMLCollection
- Returned by: `getElementsByClassName()`, `getElementsByTagName()`, `children`
- **Live**: Automatically updates when the DOM changes
- Only contains elements

### NodeList
- Returned by: `querySelectorAll()`, `childNodes`
- **Static** (usually): Does not update when DOM changes
- Can contain any node type

---

## Converting Collections to Arrays

Many array methods don't work directly on collections. Convert first!

```javascript
const elements = document.querySelectorAll('.item');

// Method 1: Array.from()
const arr1 = Array.from(elements);

// Method 2: Spread operator
const arr2 = [...elements];

// Now you can use array methods
arr1.map(el => el.textContent);
arr2.filter(el => el.classList.contains('active'));
```

---

## Iteration Methods

### 1. For Loop (Classic)
Works on both HTMLCollections and NodeLists.

```javascript
const items = document.querySelectorAll('.item');

for (let i = 0; i < items.length; i++) {
    console.log(items[i].textContent);
}
```

**Pros:** Works everywhere, can break/continue, access to index
**Cons:** More verbose

---

### 2. For...of Loop
Clean syntax for iterating over collections.

```javascript
const items = document.querySelectorAll('.item');

for (const item of items) {
    console.log(item.textContent);
}
```

**Pros:** Clean syntax, works on NodeLists
**Cons:** No direct access to index

---

### 3. forEach() Method
NodeLists have a built-in forEach method.

```javascript
const items = document.querySelectorAll('.item');

items.forEach((item, index) => {
    console.log(`Item ${index}: ${item.textContent}`);
});
```

**Pros:** Clean, provides index, familiar syntax
**Cons:** Cannot break early, HTMLCollections need conversion

---

### 4. forEach with HTMLCollection
HTMLCollections don't have forEach, so convert first or borrow it.

```javascript
const items = document.getElementsByClassName('item');

// Option 1: Convert to array
Array.from(items).forEach(item => {
    console.log(item.textContent);
});

// Option 2: Borrow forEach from Array prototype
Array.prototype.forEach.call(items, item => {
    console.log(item.textContent);
});
```

---

### 5. Using map(), filter(), reduce()
Convert to array first to use powerful array methods.

```javascript
const items = document.querySelectorAll('.item');

// Get all text contents
const texts = Array.from(items).map(item => item.textContent);

// Filter active items
const active = [...items].filter(item => item.classList.contains('active'));

// Count total characters
const totalChars = [...items].reduce((sum, item) => {
    return sum + item.textContent.length;
}, 0);
```

---

## Practical Examples

### Example 1: Add a Class to All Elements
```javascript
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.classList.add('animated');
});
```

### Example 2: Toggle Visibility
```javascript
const sections = document.querySelectorAll('section');

sections.forEach(section => {
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
});
```

### Example 3: Add Event Listeners to Multiple Elements
```javascript
const buttons = document.querySelectorAll('.btn');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log(`Button ${index} clicked!`);
    });
});
```

### Example 4: Find and Modify Specific Elements
```javascript
const items = document.querySelectorAll('.item');

// Find items with specific text
const matchingItems = [...items].filter(item => 
    item.textContent.includes('special')
);

// Highlight them
matchingItems.forEach(item => {
    item.style.backgroundColor = 'yellow';
});
```

### Example 5: Create a Summary
```javascript
const products = document.querySelectorAll('.product');

// Calculate total price
const total = [...products].reduce((sum, product) => {
    const price = parseFloat(product.dataset.price);
    return sum + price;
}, 0);

console.log(`Total: $${total.toFixed(2)}`);
```

---

## Live vs Static Collections

### Live Collection (HTMLCollection)
```javascript
const items = document.getElementsByClassName('item');
console.log(items.length); // 3

// Add a new item to the DOM
document.body.innerHTML += '<div class="item">New</div>';

console.log(items.length); // 4 (automatically updated!)
```

### Static Collection (NodeList from querySelectorAll)
```javascript
const items = document.querySelectorAll('.item');
console.log(items.length); // 3

// Add a new item to the DOM
document.body.innerHTML += '<div class="item">New</div>';

console.log(items.length); // 3 (NOT updated)
```

---

## Common Patterns

### Pattern 1: Apply Styles to All
```javascript
document.querySelectorAll('.highlight').forEach(el => {
    el.style.backgroundColor = '#ffff00';
    el.style.padding = '5px';
});
```

### Pattern 2: Remove All of a Type
```javascript
document.querySelectorAll('.notification').forEach(el => {
    el.remove();
});
```

### Pattern 3: Get Values from Multiple Inputs
```javascript
const inputs = document.querySelectorAll('input[type="text"]');
const values = [...inputs].map(input => input.value);
```

### Pattern 4: Find by Content
```javascript
const items = document.querySelectorAll('li');
const found = [...items].find(li => li.textContent === 'Target');
```

---

## Performance Tips

1. **Cache your collection** if you'll iterate multiple times
2. **Store length** in a variable for classic loops
3. **Use for...of** or forEach for cleaner code
4. **Consider live vs static** based on your needs

```javascript
// Caching and storing length
const items = document.querySelectorAll('.item');
const len = items.length;

for (let i = 0; i < len; i++) {
    // Process items[i]
}
```

---

## Summary

- NodeLists and HTMLCollections are array-like but not arrays
- Use `Array.from()` or spread `[...]` to convert to arrays
- `forEach()` works on NodeLists; convert HTMLCollections first
- Use `for...of` for simple iteration
- Use `map()`, `filter()`, `reduce()` after converting for powerful operations
- Remember: querySelectorAll returns static; getElementsBy... returns live

---

## Next Lesson

In the next lesson, we'll learn how to **create and add new elements** to the DOM using `createElement()`, `appendChild()`, and `prepend()`.
