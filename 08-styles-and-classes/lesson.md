# Lesson 08: Modifying Styles and Classes

## Learning Objectives

By the end of this lesson, you will be able to:
- Modify inline styles using the `style` property
- Use the `classList` API to add, remove, and toggle classes
- Choose between inline styles and classes
- Respond to user interactions with visual changes

---

## Two Approaches to Styling

1. **Inline Styles** (`element.style`) - Apply styles directly to an element
2. **CSS Classes** (`element.classList`) - Toggle pre-defined CSS classes

Generally, **classes are preferred** for maintainability, but inline styles are useful for dynamic values (like positions, colors from data, etc.).

---

## The style Property

Access and modify an element's inline styles using the `style` property.

### Setting Styles
```javascript
const box = document.getElementById('box');

// Set individual properties
box.style.backgroundColor = 'blue';    // Note: camelCase!
box.style.color = 'white';
box.style.padding = '20px';
box.style.borderRadius = '8px';
box.style.fontSize = '18px';
```

### CSS to JavaScript Property Names
CSS properties with hyphens become camelCase in JavaScript:

| CSS Property | JavaScript Property |
|-------------|---------------------|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `margin-top` | `marginTop` |
| `z-index` | `zIndex` |

### Getting Styles
```javascript
// Get inline style (only works for inline styles!)
const color = box.style.color;

// Get computed style (works for all styles)
const computed = window.getComputedStyle(box);
const bgColor = computed.backgroundColor;
const fontSize = computed.fontSize;
```

### Setting Multiple Styles
```javascript
// Using cssText for multiple properties at once
box.style.cssText = 'background: blue; color: white; padding: 20px;';

// Or use Object.assign
Object.assign(box.style, {
    backgroundColor: 'blue',
    color: 'white',
    padding: '20px'
});
```

---

## The classList API

The `classList` property provides methods to manipulate classes easily.

### Basic Methods

```javascript
const element = document.getElementById('myElement');

// Add one or more classes
element.classList.add('active');
element.classList.add('highlighted', 'visible');

// Remove one or more classes
element.classList.remove('inactive');
element.classList.remove('hidden', 'disabled');

// Toggle a class (add if missing, remove if present)
element.classList.toggle('active');

// Toggle based on condition
element.classList.toggle('active', isActive); // Add if isActive is true

// Check if element has a class
if (element.classList.contains('active')) {
    console.log('Element is active!');
}

// Replace a class
element.classList.replace('old-class', 'new-class');
```

### Iterating Over Classes
```javascript
// Get all classes
console.log(element.classList); // DOMTokenList

// Convert to array
const classes = [...element.classList];

// Loop through classes
element.classList.forEach(className => {
    console.log(className);
});

// Check number of classes
console.log(element.classList.length);
```

---

## Practical Examples

### Example 1: Toggle Dark Mode
```css
.dark-mode {
    background-color: #1a1a1a;
    color: #ffffff;
}
```

```javascript
const toggleBtn = document.getElementById('dark-mode-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update button text
    const isDark = body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
});
```

### Example 2: Active Navigation
```javascript
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove active from all
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active to clicked
        link.classList.add('active');
    });
});
```

### Example 3: Form Validation Feedback
```javascript
const input = document.getElementById('email');

input.addEventListener('input', () => {
    if (input.validity.valid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
});
```

### Example 4: Dynamic Positioning
```javascript
// Inline styles are great for dynamic values
const box = document.getElementById('draggable');

function moveBox(x, y) {
    box.style.left = x + 'px';
    box.style.top = y + 'px';
}

document.addEventListener('mousemove', (e) => {
    moveBox(e.clientX, e.clientY);
});
```

### Example 5: Progress Bar
```javascript
const progressBar = document.getElementById('progress');

function setProgress(percent) {
    progressBar.style.width = percent + '%';
    
    // Change color based on progress
    if (percent < 33) {
        progressBar.classList.remove('medium', 'complete');
        progressBar.classList.add('low');
    } else if (percent < 66) {
        progressBar.classList.remove('low', 'complete');
        progressBar.classList.add('medium');
    } else {
        progressBar.classList.remove('low', 'medium');
        progressBar.classList.add('complete');
    }
}
```

### Example 6: Accordion/Collapsible
```javascript
const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.classList.contains('open');
        
        // Close all others
        document.querySelectorAll('.accordion-content').forEach(c => {
            c.classList.remove('open');
        });
        
        // Toggle clicked one
        if (!isOpen) {
            content.classList.add('open');
        }
    });
});
```

---

## Comparing Approaches

### When to Use Inline Styles
- Dynamic values (positions, sizes, colors from data)
- Values calculated at runtime
- Animation keyframes
- One-off style changes

```javascript
// Good use of inline styles
element.style.left = mouseX + 'px';
element.style.backgroundColor = colorFromData;
```

### When to Use Classes
- Pre-defined style sets
- State changes (active, disabled, hidden)
- Complex style combinations
- Maintainable, reusable styles

```javascript
// Good use of classes
element.classList.add('active');
element.classList.toggle('dark-mode');
```

---

## Common Patterns

### Pattern 1: Show/Hide Elements
```javascript
// Using classes (recommended)
element.classList.add('hidden');    // Hide
element.classList.remove('hidden'); // Show
element.classList.toggle('hidden'); // Toggle

// Using inline styles
element.style.display = 'none';  // Hide
element.style.display = 'block'; // Show
```

### Pattern 2: Disable Elements
```javascript
const button = document.getElementById('submit');
button.classList.add('disabled');
button.setAttribute('disabled', 'true');
```

### Pattern 3: Loading State
```javascript
function setLoading(isLoading) {
    const button = document.getElementById('submit');
    button.classList.toggle('loading', isLoading);
    button.disabled = isLoading;
    button.textContent = isLoading ? 'Loading...' : 'Submit';
}
```

---

## getComputedStyle

Get the final computed style of an element (after all CSS is applied).

```javascript
const element = document.getElementById('box');
const styles = window.getComputedStyle(element);

console.log(styles.backgroundColor); // "rgb(0, 0, 255)"
console.log(styles.fontSize);        // "16px"
console.log(styles.display);         // "block"

// Get pseudo-element styles
const beforeStyles = window.getComputedStyle(element, '::before');
```

---

## Summary

- Use `element.style.property` for inline styles
- Convert CSS properties to camelCase in JavaScript
- Use `classList.add()`, `.remove()`, `.toggle()`, `.contains()`
- Prefer classes for maintainable, reusable styles
- Use inline styles for dynamic, calculated values
- Use `getComputedStyle()` to read final applied styles

---

## Next Lesson

In the next lesson, we'll learn how to **modify element attributes** using `setAttribute`, `getAttribute`, and data attributes.
