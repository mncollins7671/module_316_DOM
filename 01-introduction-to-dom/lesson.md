# Lesson 01: Introduction to the DOM

## Learning Objectives

By the end of this lesson, you will be able to:
- Define what the DOM is and why it's important
- Understand the DOM tree structure
- Identify nodes and their types
- Access the document object

---

## What is the DOM?

The **Document Object Model (DOM)** is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content.

Think of the DOM as a bridge between your HTML document and JavaScript. When a browser loads an HTML page, it creates a DOM representation of that page.

### Key Points:
- The DOM is **not** your HTML source code
- The DOM is a **live** representation of your page
- Changes to the DOM immediately reflect in what the user sees
- JavaScript can read and modify the DOM

---

## The DOM Tree Structure

The DOM represents a document as a **tree structure**. Each element, attribute, and piece of text becomes a **node** in this tree.

```
document
└── html
    ├── head
    │   ├── title
    │   │   └── "My Page"
    │   └── meta
    └── body
        ├── h1
        │   └── "Welcome"
        ├── p
        │   └── "Hello, world!"
        └── div
            ├── p
            └── p
```

### Node Types

| Node Type | Description | Example |
|-----------|-------------|---------|
| Document | The entire document | `document` |
| Element | HTML tags | `<div>`, `<p>`, `<h1>` |
| Text | Text content inside elements | "Hello, world!" |
| Attribute | Attributes on elements | `class="container"` |
| Comment | HTML comments | `<!-- comment -->` |

---

## The Document Object

The `document` object is your entry point to the DOM. It represents the entire HTML document and provides methods to access and manipulate elements.

```javascript
// The document object
console.log(document);

// Some useful document properties
console.log(document.title);        // Page title
console.log(document.URL);          // Page URL
console.log(document.body);         // The <body> element
console.log(document.head);         // The <head> element
console.log(document.documentElement); // The <html> element
```

---

## Viewing the DOM

You can view the DOM in your browser's Developer Tools:

1. **Chrome/Edge**: Right-click → Inspect → Elements tab
2. **Firefox**: Right-click → Inspect Element
3. **Safari**: Develop menu → Show Web Inspector

The Elements panel shows you the current state of the DOM, which may differ from your original HTML if JavaScript has modified it.

---

## Why the DOM Matters

The DOM enables:

1. **Dynamic Content**: Update text, images, and HTML without reloading
2. **User Interaction**: Respond to clicks, keyboard input, form submissions
3. **Styling**: Change CSS dynamically based on conditions
4. **Validation**: Check user input before sending to a server
5. **Animation**: Create smooth transitions and effects

---

## Summary

- The DOM is a programming interface that represents your HTML document as a tree
- The `document` object is your gateway to accessing the DOM
- Every HTML element becomes a node in the DOM tree
- JavaScript uses the DOM to read and modify web pages dynamically

---

## Next Lesson

In the next lesson, we'll learn how to **select elements** from the DOM using methods like `getElementById` and `querySelector`.
