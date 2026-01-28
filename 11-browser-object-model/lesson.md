# Lesson 11: The Browser Object Model (BOM)

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the difference between the DOM and the BOM
- Use the `window` object and its properties
- Work with `location`, `history`, and `navigator`
- Create alerts, prompts, and confirmations
- Use timers with `setTimeout()` and `setInterval()`
- Work with `localStorage` and `sessionStorage`

---

## What is the BOM?

The **Browser Object Model (BOM)** represents the browser window and provides methods to interact with the browser itself (not just the document).

```
window (BOM)
├── document (DOM)
├── location
├── history
├── navigator
├── screen
├── localStorage
├── sessionStorage
└── console
```

---

## The window Object

The `window` object is the global object in browsers. All global variables and functions become properties of `window`.

```javascript
// These are the same:
window.alert('Hello');
alert('Hello');

// Global variables are window properties
var myVar = 'test';
console.log(window.myVar); // 'test'

// Window dimensions
console.log(window.innerWidth);  // Viewport width
console.log(window.innerHeight); // Viewport height
console.log(window.outerWidth);  // Browser window width
console.log(window.outerHeight); // Browser window height

// Scroll position
console.log(window.scrollX); // Horizontal scroll
console.log(window.scrollY); // Vertical scroll
```

---

## Dialog Methods

### alert()
Display a message to the user.
```javascript
alert('Welcome to our website!');
```

### confirm()
Ask the user a yes/no question. Returns `true` or `false`.
```javascript
const result = confirm('Are you sure you want to delete this?');
if (result) {
    deleteItem();
}
```

### prompt()
Get text input from the user. Returns the input string or `null` if cancelled.
```javascript
const name = prompt('What is your name?');
if (name) {
    alert(`Hello, ${name}!`);
}

// With default value
const age = prompt('Enter your age:', '25');
```

---

## The location Object

The `location` object contains information about the current URL.

### Properties
```javascript
console.log(location.href);     // Full URL
console.log(location.protocol); // "https:"
console.log(location.host);     // "example.com:8080"
console.log(location.hostname); // "example.com"
console.log(location.port);     // "8080"
console.log(location.pathname); // "/path/page.html"
console.log(location.search);   // "?id=123&name=test"
console.log(location.hash);     // "#section"
```

### Methods
```javascript
// Navigate to a new page
location.href = 'https://google.com';
// or
location.assign('https://google.com');

// Replace current page (no back button)
location.replace('https://google.com');

// Reload the page
location.reload();
```

### Parsing Query Parameters
```javascript
// For URL: ?name=John&age=30
const params = new URLSearchParams(location.search);
console.log(params.get('name')); // "John"
console.log(params.get('age'));  // "30"
```

---

## The history Object

Navigate through browser history.

```javascript
// Go back one page
history.back();

// Go forward one page
history.forward();

// Go back/forward multiple pages
history.go(-2); // Back 2 pages
history.go(1);  // Forward 1 page

// Number of pages in history
console.log(history.length);

// Add entry without navigation
history.pushState({ page: 2 }, 'Page 2', '/page2');

// Replace current entry
history.replaceState({ page: 1 }, 'Page 1', '/page1');
```

---

## The navigator Object

Information about the browser and device.

```javascript
console.log(navigator.userAgent);    // Browser info string
console.log(navigator.language);     // User's language ("en-US")
console.log(navigator.onLine);       // Is user online?
console.log(navigator.cookieEnabled); // Are cookies enabled?
console.log(navigator.platform);     // Operating system

// Geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
        },
        (error) => {
            console.log('Error:', error.message);
        }
    );
}

// Clipboard
navigator.clipboard.writeText('Copied text!');
navigator.clipboard.readText().then(text => console.log(text));
```

---

## The screen Object

Information about the user's screen.

```javascript
console.log(screen.width);       // Screen width
console.log(screen.height);      // Screen height
console.log(screen.availWidth);  // Available width (minus taskbar)
console.log(screen.availHeight); // Available height
console.log(screen.colorDepth);  // Color depth (bits)
```

---

## Timers

### setTimeout()
Execute code after a delay.

```javascript
// Run once after 2 seconds
setTimeout(() => {
    console.log('2 seconds have passed!');
}, 2000);

// With a named function
function greet() {
    console.log('Hello!');
}
const timerId = setTimeout(greet, 1000);

// Cancel the timeout
clearTimeout(timerId);
```

### setInterval()
Execute code repeatedly at intervals.

```javascript
// Run every second
const intervalId = setInterval(() => {
    console.log('Tick');
}, 1000);

// Stop after 5 seconds
setTimeout(() => {
    clearInterval(intervalId);
    console.log('Stopped!');
}, 5000);
```

### Practical Timer Example
```javascript
// Countdown timer
function countdown(seconds) {
    let remaining = seconds;
    
    const display = document.getElementById('timer');
    display.textContent = remaining;
    
    const intervalId = setInterval(() => {
        remaining--;
        display.textContent = remaining;
        
        if (remaining <= 0) {
            clearInterval(intervalId);
            display.textContent = 'Time\'s up!';
        }
    }, 1000);
}

countdown(10);
```

---

## Web Storage

### localStorage
Persists until explicitly cleared.

```javascript
// Save data
localStorage.setItem('username', 'John');
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark' }));

// Get data
const username = localStorage.getItem('username');
const prefs = JSON.parse(localStorage.getItem('preferences'));

// Remove specific item
localStorage.removeItem('username');

// Clear all
localStorage.clear();

// Check number of items
console.log(localStorage.length);
```

### sessionStorage
Cleared when the browser tab is closed.

```javascript
// Same API as localStorage
sessionStorage.setItem('tempData', 'value');
const temp = sessionStorage.getItem('tempData');
sessionStorage.removeItem('tempData');
sessionStorage.clear();
```

### Practical Storage Example
```javascript
// Save user preferences
function savePreferences(prefs) {
    localStorage.setItem('userPrefs', JSON.stringify(prefs));
}

// Load user preferences
function loadPreferences() {
    const saved = localStorage.getItem('userPrefs');
    return saved ? JSON.parse(saved) : { theme: 'light', fontSize: 16 };
}

// Apply saved preferences on page load
const prefs = loadPreferences();
document.body.classList.add(`theme-${prefs.theme}`);
```

---

## Window Methods

### open() and close()
```javascript
// Open a new window
const newWindow = window.open('https://example.com', '_blank', 'width=800,height=600');

// Close a window (only works for windows opened with window.open)
newWindow.close();
```

### Scrolling
```javascript
// Scroll to position
window.scrollTo(0, 500);

// Smooth scroll
window.scrollTo({
    top: 500,
    behavior: 'smooth'
});

// Scroll by amount
window.scrollBy(0, 100);
```

### Print
```javascript
window.print(); // Opens print dialog
```

---

## Practical Examples

### Example 1: Dark Mode Toggle with Persistence
```javascript
// Check saved preference
const darkMode = localStorage.getItem('darkMode') === 'true';
if (darkMode) {
    document.body.classList.add('dark-mode');
}

// Toggle button
document.getElementById('toggle-dark').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
});
```

### Example 2: "Are You Sure?" Before Leaving
```javascript
window.addEventListener('beforeunload', (e) => {
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = ''; // Required for Chrome
    }
});
```

### Example 3: Detect Online/Offline
```javascript
window.addEventListener('online', () => {
    showNotification('You are back online!');
});

window.addEventListener('offline', () => {
    showNotification('You are offline.');
});
```

---

## Summary

- The BOM provides access to browser features beyond the document
- `window` is the global object containing all BOM properties
- `location` handles URL navigation
- `history` manages browser history
- `navigator` provides browser/device information
- Use `setTimeout`/`setInterval` for timed operations
- `localStorage`/`sessionStorage` persist data client-side

---

## Next Lesson

In the next lesson, we'll learn about **HTML Form Validation** using built-in HTML attributes.
