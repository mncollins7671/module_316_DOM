# Lesson 10: Event Handling

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand what events are and how they work
- Register event listeners using `addEventListener()`
- Create and use event handler functions
- Work with the event object
- Understand event propagation (bubbling and capturing)
- Implement event delegation

---

## What Are Events?

Events are actions or occurrences that happen in the browser. They can be:
- **User actions**: clicks, keypresses, mouse movements, form submissions
- **Browser actions**: page load, resize, scroll
- **API responses**: data received, errors

JavaScript can "listen" for these events and respond with code.

---

## The addEventListener() Method

The modern way to handle events:

```javascript
element.addEventListener(eventType, handlerFunction);
```

### Basic Example
```javascript
const button = document.getElementById('my-button');

button.addEventListener('click', function() {
    console.log('Button was clicked!');
});
```

### With Arrow Function
```javascript
const button = document.getElementById('my-button');

button.addEventListener('click', () => {
    console.log('Button was clicked!');
});
```

### Named Function Handler
```javascript
function handleClick() {
    console.log('Button was clicked!');
}

const button = document.getElementById('my-button');
button.addEventListener('click', handleClick);

// Can remove later:
button.removeEventListener('click', handleClick);
```

---

## Common Event Types

### Mouse Events
| Event | Fires When |
|-------|------------|
| `click` | Element is clicked |
| `dblclick` | Element is double-clicked |
| `mousedown` | Mouse button is pressed |
| `mouseup` | Mouse button is released |
| `mouseover` | Mouse enters element |
| `mouseout` | Mouse leaves element |
| `mousemove` | Mouse moves over element |

### Keyboard Events
| Event | Fires When |
|-------|------------|
| `keydown` | Key is pressed down |
| `keyup` | Key is released |
| `keypress` | Key is pressed (deprecated) |

### Form Events
| Event | Fires When |
|-------|------------|
| `submit` | Form is submitted |
| `input` | Input value changes |
| `change` | Value changes and loses focus |
| `focus` | Element receives focus |
| `blur` | Element loses focus |

### Document/Window Events
| Event | Fires When |
|-------|------------|
| `load` | Page fully loaded |
| `DOMContentLoaded` | DOM is ready |
| `resize` | Window is resized |
| `scroll` | Page is scrolled |

---

## The Event Object

Every event handler receives an event object with information about the event:

```javascript
button.addEventListener('click', function(event) {
    console.log(event);           // The event object
    console.log(event.type);      // "click"
    console.log(event.target);    // The clicked element
    console.log(event.currentTarget); // Element with the listener
    console.log(event.timeStamp); // When the event occurred
});
```

### Common Event Object Properties

| Property | Description |
|----------|-------------|
| `event.target` | Element that triggered the event |
| `event.currentTarget` | Element the listener is attached to |
| `event.type` | Type of event ("click", "keydown", etc.) |
| `event.preventDefault()` | Prevents default behavior |
| `event.stopPropagation()` | Stops event bubbling |

### Mouse Event Properties
```javascript
element.addEventListener('click', (e) => {
    console.log(e.clientX, e.clientY); // Position relative to viewport
    console.log(e.pageX, e.pageY);     // Position relative to document
    console.log(e.button);              // Which mouse button (0=left, 2=right)
});
```

### Keyboard Event Properties
```javascript
document.addEventListener('keydown', (e) => {
    console.log(e.key);        // The key value ("a", "Enter", "ArrowUp")
    console.log(e.code);       // Physical key code ("KeyA", "Enter")
    console.log(e.ctrlKey);    // Was Ctrl pressed?
    console.log(e.shiftKey);   // Was Shift pressed?
    console.log(e.altKey);     // Was Alt pressed?
});
```

---

## Preventing Default Behavior

Some elements have default behaviors. Use `preventDefault()` to stop them:

```javascript
// Prevent form submission (page reload)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle form with JavaScript instead
    console.log('Form submitted via JS');
});

// Prevent link navigation
link.addEventListener('click', (e) => {
    e.preventDefault();
    // Do something else instead
});

// Prevent right-click menu
element.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    // Show custom menu
});
```

---

## Event Propagation

Events "bubble" up through the DOM tree:

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click</button>
    </div>
</div>
```

When you click the button, the click event fires on:
1. The button
2. The inner div
3. The outer div
4. The body, html, document, window

### Stopping Propagation
```javascript
button.addEventListener('click', (e) => {
    e.stopPropagation(); // Event won't bubble up
    console.log('Button clicked');
});
```

### Capturing vs Bubbling
```javascript
// Bubbling (default) - event goes up
element.addEventListener('click', handler, false);

// Capturing - event goes down first
element.addEventListener('click', handler, true);
```

---

## Event Delegation

Instead of adding listeners to many elements, add one listener to a parent:

### Without Delegation (Inefficient)
```javascript
// ❌ Adding listener to each item
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        console.log('Item clicked');
    });
});
```

### With Delegation (Efficient)
```javascript
// ✅ One listener on the parent
document.getElementById('list').addEventListener('click', (e) => {
    if (e.target.classList.contains('item')) {
        console.log('Item clicked:', e.target.textContent);
    }
});
```

### Benefits of Delegation
- Fewer event listeners (better performance)
- Works for dynamically added elements
- Cleaner code

---

## Practical Examples

### Example 1: Toggle Button
```javascript
const toggleBtn = document.getElementById('toggle');

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    toggleBtn.textContent = toggleBtn.classList.contains('active') 
        ? 'ON' 
        : 'OFF';
});
```

### Example 2: Form Validation
```javascript
const form = document.getElementById('myForm');
const email = document.getElementById('email');

form.addEventListener('submit', (e) => {
    if (!email.value.includes('@')) {
        e.preventDefault();
        alert('Please enter a valid email');
    }
});
```

### Example 3: Keyboard Shortcuts
```javascript
document.addEventListener('keydown', (e) => {
    // Ctrl+S to save
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveDocument();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});
```

### Example 4: Dynamic List with Delegation
```javascript
const todoList = document.getElementById('todos');

todoList.addEventListener('click', (e) => {
    // Handle delete buttons
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('li').remove();
    }
    
    // Handle checkbox
    if (e.target.type === 'checkbox') {
        e.target.closest('li').classList.toggle('completed');
    }
});
```

### Example 5: Mouse Tracking
```javascript
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
```

---

## Removing Event Listeners

Use `removeEventListener()` with a named function:

```javascript
function handleClick() {
    console.log('Clicked!');
}

// Add
button.addEventListener('click', handleClick);

// Remove (must use same function reference!)
button.removeEventListener('click', handleClick);
```

### One-Time Event Listener
```javascript
// Using the once option
button.addEventListener('click', () => {
    console.log('This only fires once!');
}, { once: true });
```

---

## Multiple Events on Same Element

```javascript
const input = document.getElementById('search');

input.addEventListener('focus', () => {
    input.classList.add('focused');
});

input.addEventListener('blur', () => {
    input.classList.remove('focused');
});

input.addEventListener('input', () => {
    console.log('Value:', input.value);
});
```

---

## Summary

- Use `addEventListener()` to listen for events
- The event object contains useful information about the event
- Use `preventDefault()` to stop default behaviors
- Events bubble up; use `stopPropagation()` to stop it
- Event delegation is efficient for multiple similar elements
- Named functions are required for `removeEventListener()`

---

## Next Lesson

In the next lesson, we'll learn about the **Browser Object Model (BOM)** - working with the window, location, history, and more.
