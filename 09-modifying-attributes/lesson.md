# Lesson 09: Modifying Attributes

## Learning Objectives

By the end of this lesson, you will be able to:
- Get and set element attributes with `getAttribute()` and `setAttribute()`
- Remove attributes with `removeAttribute()`
- Work with `data-*` attributes using the `dataset` property
- Understand the difference between attributes and properties
- Modify attributes in response to user interaction

---

## What Are Attributes?

Attributes are the values defined in HTML tags:

```html
<a href="https://example.com" id="my-link" class="external" target="_blank">Link</a>
<img src="image.jpg" alt="Description" width="300">
<input type="text" placeholder="Enter name" required>
```

All the `name="value"` pairs are attributes: `href`, `id`, `class`, `src`, `alt`, etc.

---

## getAttribute() and setAttribute()

### Getting Attributes
```javascript
const link = document.getElementById('my-link');

const href = link.getAttribute('href');     // "https://example.com"
const target = link.getAttribute('target'); // "_blank"
const id = link.getAttribute('id');         // "my-link"
```

### Setting Attributes
```javascript
const link = document.getElementById('my-link');

link.setAttribute('href', 'https://newsite.com');
link.setAttribute('target', '_self');
link.setAttribute('title', 'Visit our site');  // Adding new attribute
```

### Checking if Attribute Exists
```javascript
if (link.hasAttribute('target')) {
    console.log('Link opens in new window');
}
```

### Removing Attributes
```javascript
link.removeAttribute('target');  // No longer opens in new window
link.removeAttribute('title');
```

---

## Common Attributes

| Element | Attributes |
|---------|------------|
| `<a>` | href, target, rel, download |
| `<img>` | src, alt, width, height, loading |
| `<input>` | type, name, value, placeholder, required, disabled |
| `<button>` | type, disabled, form |
| `<form>` | action, method, enctype |
| Any element | id, class, style, title, data-* |

---

## Direct Property Access

Many attributes can be accessed directly as properties:

```javascript
const link = document.getElementById('my-link');

// These are equivalent for most cases:
link.getAttribute('href');  // Attribute
link.href;                  // Property

const input = document.getElementById('my-input');
input.getAttribute('value'); // Initial value from HTML
input.value;                 // Current value (user may have changed it)
```

### Attributes vs Properties

| Aspect | Attributes | Properties |
|--------|------------|------------|
| Defined by | HTML | DOM |
| Access via | getAttribute/setAttribute | Direct property |
| Values | Always strings | Can be any type |
| Updated | Not automatically | Reflects current state |

### Important Difference: value
```javascript
const input = document.getElementById('email');

// User types "hello@test.com"

input.getAttribute('value'); // Original value from HTML (or null)
input.value;                 // "hello@test.com" (current value)
```

---

## Data Attributes

Custom attributes that store extra data on elements. They start with `data-`.

### HTML
```html
<div 
    class="user-card"
    data-user-id="123"
    data-role="admin"
    data-last-login="2024-01-15"
>
    User Card
</div>
```

### Accessing with dataset
```javascript
const card = document.querySelector('.user-card');

// Read data attributes
const userId = card.dataset.userId;        // "123"
const role = card.dataset.role;            // "admin"
const lastLogin = card.dataset.lastLogin;  // "2024-01-15"

// Set data attributes
card.dataset.status = 'active';  // Creates data-status="active"
card.dataset.newAttr = 'value';  // Creates data-new-attr="value"

// Delete data attributes
delete card.dataset.role;        // Removes data-role
```

### Naming Convention

| HTML Attribute | JavaScript Property |
|----------------|---------------------|
| data-id | dataset.id |
| data-user-id | dataset.userId |
| data-first-name | dataset.firstName |
| data-XMLParser | dataset.xmlparser |

**Rule:** Hyphens become camelCase in JavaScript.

---

## Practical Examples

### Example 1: Toggle Image Sources
```javascript
const image = document.getElementById('hero-image');
const toggleBtn = document.getElementById('toggle-btn');

toggleBtn.addEventListener('click', () => {
    const currentSrc = image.getAttribute('src');
    if (currentSrc.includes('day')) {
        image.setAttribute('src', 'images/night.jpg');
        image.setAttribute('alt', 'Night scene');
    } else {
        image.setAttribute('src', 'images/day.jpg');
        image.setAttribute('alt', 'Day scene');
    }
});
```

### Example 2: Disable/Enable Form Elements
```javascript
const submitBtn = document.getElementById('submit');
const checkbox = document.getElementById('agree-terms');

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', 'true');
    }
});
```

### Example 3: Update Links
```javascript
const languageLinks = document.querySelectorAll('.lang-link');

languageLinks.forEach(link => {
    const currentHref = link.getAttribute('href');
    link.setAttribute('href', `/fr${currentHref}`);  // Add French prefix
});
```

### Example 4: Using Data Attributes for State
```javascript
const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('click', () => {
        // Toggle selected state using data attribute
        const isSelected = item.dataset.selected === 'true';
        item.dataset.selected = !isSelected;
        
        // Update visual style
        item.classList.toggle('selected', !isSelected);
    });
});
```

### Example 5: Product Cards with Data
```html
<div class="product" data-id="101" data-price="29.99" data-category="electronics">
    <h3>Wireless Mouse</h3>
    <button class="add-to-cart">Add to Cart</button>
</div>
```

```javascript
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const id = product.dataset.id;
        const price = parseFloat(product.dataset.price);
        const category = product.dataset.category;
        
        console.log(`Adding product ${id} (${category}) - $${price}`);
        addToCart(id, price);
    });
});
```

### Example 6: Tab Interface
```html
<button class="tab" data-tab="info">Info</button>
<button class="tab" data-tab="settings">Settings</button>
<button class="tab" data-tab="help">Help</button>

<div class="tab-content" data-content="info">Info content...</div>
<div class="tab-content" data-content="settings">Settings content...</div>
<div class="tab-content" data-content="help">Help content...</div>
```

```javascript
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        
        // Hide all content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected content
        document.querySelector(`[data-content="${tabId}"]`).classList.add('active');
        
        // Update active tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});
```

---

## Working with Boolean Attributes

Some attributes are boolean (their presence means `true`):

```html
<input type="checkbox" checked>
<button disabled>Submit</button>
<input required>
```

```javascript
const button = document.getElementById('submit');

// Check if disabled
console.log(button.hasAttribute('disabled')); // true/false
console.log(button.disabled); // true/false (property)

// Disable
button.setAttribute('disabled', '');  // Value doesn't matter
button.disabled = true;               // Property way

// Enable
button.removeAttribute('disabled');
button.disabled = false;              // Property way
```

---

## ARIA Attributes

Improve accessibility with ARIA attributes:

```javascript
const modal = document.getElementById('modal');

// Set accessibility attributes
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-hidden', 'true');
modal.setAttribute('aria-labelledby', 'modal-title');

// Update when modal opens
function openModal() {
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
}
```

---

## Summary

- `getAttribute()`/`setAttribute()` for reading/writing attributes
- `hasAttribute()` to check existence
- `removeAttribute()` to remove attributes
- `dataset` for easy access to `data-*` attributes
- Direct properties work for common attributes
- Properties reflect current state; attributes reflect initial HTML
- Use data attributes to store custom data on elements

---

## Next Lesson

In the next lesson, we'll learn about **Event Handling** - how to listen for and respond to user interactions.
