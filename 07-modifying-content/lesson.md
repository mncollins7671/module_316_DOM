# Lesson 07: Modifying Content

## Learning Objectives

By the end of this lesson, you will be able to:
- Use `textContent` to get and set plain text
- Use `innerHTML` to get and set HTML content
- Use `innerText` and understand its differences
- Choose the right property for each situation
- Update content based on user interaction

---

## Three Ways to Access Content

| Property | Returns | Includes |
|----------|---------|----------|
| `textContent` | All text content | Hidden elements, scripts |
| `innerText` | Visible text only | Respects CSS |
| `innerHTML` | HTML markup | All child elements as HTML |

---

## textContent

Gets or sets the **raw text content** of an element and all its descendants.

### Getting Text
```javascript
const element = document.getElementById('message');
console.log(element.textContent);
// Returns all text, including hidden text
```

### Setting Text
```javascript
const element = document.getElementById('message');
element.textContent = 'Hello, World!';
// Sets plain text - HTML tags are NOT parsed
element.textContent = '<strong>Bold</strong>';
// Displays: "<strong>Bold</strong>" (as text, not bold)
```

### Key Points:
- ✅ Fast performance
- ✅ Safe from XSS attacks (HTML is escaped)
- ✅ Gets text from hidden elements
- ✅ Best for plain text content

---

## innerHTML

Gets or sets the **HTML content** of an element.

### Getting HTML
```javascript
const element = document.getElementById('container');
console.log(element.innerHTML);
// Returns: "<p>Paragraph</p><span>Span</span>"
```

### Setting HTML
```javascript
const element = document.getElementById('container');
element.innerHTML = '<h2>New Title</h2><p>New paragraph</p>';
// HTML is parsed and rendered
```

### Key Points:
- ✅ Can insert HTML structure
- ✅ Good for replacing complex content
- ⚠️ Slower than textContent
- ⚠️ **Security risk** - never use with user input!

### Security Warning!
```javascript
// ❌ DANGEROUS - XSS vulnerability!
const userInput = '<script>stealCookies()</script>';
element.innerHTML = userInput;

// ✅ SAFE - use textContent for user input
element.textContent = userInput;
```

---

## innerText

Gets or sets the **visible text** content, respecting CSS styling.

### Getting Text
```javascript
const element = document.getElementById('message');
console.log(element.innerText);
// Returns only visible text
```

### Setting Text
```javascript
const element = document.getElementById('message');
element.innerText = 'New visible text';
```

### Difference from textContent
```html
<div id="test">
    Visible text
    <span style="display: none">Hidden text</span>
    <script>// Script text</script>
</div>
```

```javascript
const test = document.getElementById('test');

console.log(test.textContent);
// "Visible text Hidden text // Script text"

console.log(test.innerText);
// "Visible text"
```

### Key Points:
- Returns only visible text
- Respects CSS (display: none, visibility: hidden)
- Triggers reflow (slower)
- Normalizes whitespace

---

## Comparison Table

| Feature | textContent | innerText | innerHTML |
|---------|-------------|-----------|-----------|
| Returns hidden text | ✅ Yes | ❌ No | ✅ Yes (as HTML) |
| Parses HTML | ❌ No | ❌ No | ✅ Yes |
| Performance | Fast | Slow | Medium |
| XSS Safe | ✅ Yes | ✅ Yes | ❌ No |
| Best for | Plain text | Visible text | HTML content |

---

## Practical Examples

### Example 1: Update a Counter
```javascript
const countElement = document.getElementById('count');
let count = 0;

function increment() {
    count++;
    countElement.textContent = count;
}
```

### Example 2: Display User Input
```javascript
const input = document.getElementById('name-input');
const display = document.getElementById('greeting');

input.addEventListener('input', () => {
    // Safe! User input is escaped
    display.textContent = `Hello, ${input.value}!`;
});
```

### Example 3: Insert HTML Structure
```javascript
const container = document.getElementById('results');
const results = ['Result 1', 'Result 2', 'Result 3'];

// Build HTML string (only with trusted data!)
const html = results.map(r => `<li>${r}</li>`).join('');
container.innerHTML = `<ul>${html}</ul>`;
```

### Example 4: Toggle Content
```javascript
const details = document.getElementById('details');
const toggleBtn = document.getElementById('toggle');
const originalContent = details.innerHTML;
let isHidden = false;

toggleBtn.addEventListener('click', () => {
    if (isHidden) {
        details.innerHTML = originalContent;
    } else {
        details.innerHTML = '<p><em>Content hidden</em></p>';
    }
    isHidden = !isHidden;
});
```

### Example 5: Live Preview
```javascript
const editor = document.getElementById('markdown-input');
const preview = document.getElementById('preview');

editor.addEventListener('input', () => {
    // For demonstration - real markdown would need a parser
    const text = editor.value;
    // Only use innerHTML if the content is sanitized!
    preview.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
});
```

---

## Modifying Specific Parts

### Using Span for Targeted Updates
```html
<p>You have <span id="notification-count">0</span> notifications.</p>
```

```javascript
// Only update the number, not the whole sentence
document.getElementById('notification-count').textContent = 5;
```

### Appending vs Replacing
```javascript
const log = document.getElementById('log');

// Replace all content
log.innerHTML = '<p>New log entry</p>';

// Append content
log.innerHTML += '<p>Another entry</p>';

// Better for appending (doesn't re-parse existing content)
const newEntry = document.createElement('p');
newEntry.textContent = 'Better way to append';
log.appendChild(newEntry);
```

---

## When to Use What

| Situation | Use |
|-----------|-----|
| Setting plain text | `textContent` |
| Getting all text | `textContent` |
| Getting visible text only | `innerText` |
| Inserting trusted HTML | `innerHTML` |
| User-provided content | `textContent` (always!) |
| Building complex structures | `createElement` + `appendChild` |

---

## Summary

- **textContent**: Fast, safe, gets/sets all text
- **innerText**: Gets visible text only, respects CSS
- **innerHTML**: Gets/sets HTML, can parse HTML tags
- Always use `textContent` for user input (XSS protection)
- Use `innerHTML` only with trusted content
- For complex additions, prefer `createElement` over `innerHTML`

---

## Next Lesson

In the next lesson, we'll learn how to **modify styles and classes** using the `style` property and `classList` API.
