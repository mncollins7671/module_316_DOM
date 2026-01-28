// Exercise 07: Solutions
// ======================

// ===== Part 1: textContent Basics =====

// 1. Change text button
document.getElementById('change-text-btn').addEventListener('click', () => {
    document.getElementById('text-target').textContent = 'The text has been changed!';
});

// 2. Clear text button
document.getElementById('clear-text-btn').addEventListener('click', () => {
    document.getElementById('text-target').textContent = '';
});


// ===== Part 2: Understanding Differences =====

// 3. Compare the three properties
document.getElementById('compare-btn').addEventListener('click', () => {
    const element = document.getElementById('mixed-content');
    const output = document.getElementById('comparison-output');
    
    output.innerHTML = `
        <h4>textContent:</h4>
        <pre>${element.textContent}</pre>
        <h4>innerText:</h4>
        <pre>${element.innerText}</pre>
        <h4>innerHTML:</h4>
        <pre>${escapeHtml(element.innerHTML)}</pre>
    `;
});

// Helper function to escape HTML for display
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


// ===== Part 3: Counter =====

// 4. Counter functionality
let count = 0;
const counterDisplay = document.getElementById('counter-display');

document.getElementById('increment-btn').addEventListener('click', () => {
    count++;
    counterDisplay.textContent = count;
});

document.getElementById('decrement-btn').addEventListener('click', () => {
    count--;
    counterDisplay.textContent = count;
});

document.getElementById('reset-btn').addEventListener('click', () => {
    count = 0;
    counterDisplay.textContent = count;
});


// ===== Part 4: innerHTML =====

// 5. Replace with HTML
document.getElementById('replace-html-btn').addEventListener('click', () => {
    document.getElementById('html-container').innerHTML = `
        <h3>New Heading</h3>
        <p>This is a new paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
    `;
});

// 6. Add a list
document.getElementById('add-list-btn').addEventListener('click', () => {
    document.getElementById('html-container').innerHTML += `
        <ul>
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
        </ul>
    `;
});


// ===== Part 5: User Input Display =====

// 7. Display user input safely
document.getElementById('user-input').addEventListener('input', (e) => {
    const display = document.getElementById('input-display');
    const value = e.target.value.trim();
    display.textContent = value || 'Your message will appear here';
});


// ===== Part 6: Quote Rotator =====

// 8. Quote rotator
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
];

let quoteIndex = 0;

document.getElementById('next-quote-btn').addEventListener('click', () => {
    const quote = quotes[quoteIndex];
    document.getElementById('quote-text').textContent = `"${quote.text}"`;
    document.getElementById('quote-author').textContent = `— ${quote.author}`;
    quoteIndex = (quoteIndex + 1) % quotes.length;
});


// ===== Part 7: Live Preview =====

// 9. Live preview with newlines
document.getElementById('preview-input').addEventListener('input', (e) => {
    const preview = document.getElementById('live-preview');
    // Replace newlines with <br> tags
    // Note: This is relatively safe since we're only allowing <br>
    const text = e.target.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    preview.innerHTML = text;
});


// ===== Part 8: Word Counter =====

// 10. Word and character counter
document.getElementById('word-input').addEventListener('input', (e) => {
    const text = e.target.value;
    
    // Character count
    document.getElementById('char-count').textContent = text.length;
    
    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    document.getElementById('word-count').textContent = words.length;
});


// ===== BONUS Challenges =====

// 11. Simple markdown preview
function simpleMarkdown(text) {
    return text
        // Escape HTML first
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Headers
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
        // Line breaks
        .replace(/\n/g, '<br>');
}


// 12. Typing effect
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Example usage:
// typeText(document.getElementById('some-element'), 'Hello, World!', 100);


// 13. Sanitize HTML
function sanitizeHtml(html) {
    const temp = document.createElement('div');
    temp.textContent = html; // This escapes all HTML
    
    // If you want to allow some tags, you'd need a more complex solution
    // or use a library like DOMPurify
    
    return temp.innerHTML;
}

// More permissive sanitizer (removes only dangerous elements)
function sanitizeHtmlPermissive(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Remove script tags
    temp.querySelectorAll('script').forEach(el => el.remove());
    
    // Remove event handlers
    temp.querySelectorAll('*').forEach(el => {
        [...el.attributes].forEach(attr => {
            if (attr.name.startsWith('on')) {
                el.removeAttribute(attr.name);
            }
        });
    });
    
    return temp.innerHTML;
}

console.log('All content modification exercises completed!');
