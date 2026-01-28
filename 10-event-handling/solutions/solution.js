// Exercise 10: Solutions
// ======================

// ===== Part 1: Click Events =====

// 1. Click counter
let clickCount = 0;
const clickCounterBtn = document.getElementById('click-counter-btn');
clickCounterBtn.addEventListener('click', () => {
    clickCount++;
    clickCounterBtn.textContent = `Clicks: ${clickCount}`;
});

// 2. Toggle button
const toggleBtn = document.getElementById('toggle-btn');
toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    toggleBtn.textContent = toggleBtn.classList.contains('active') ? 'ON' : 'OFF';
});

// 3. Double click
const doubleClickBtn = document.getElementById('double-click-btn');
doubleClickBtn.addEventListener('dblclick', () => {
    doubleClickBtn.textContent = 'Double Clicked!';
    doubleClickBtn.style.backgroundColor = '#28a745';
});


// ===== Part 2: Mouse Events =====

const mouseBox = document.getElementById('mouse-box');

// 4. Mouseover - change to green
mouseBox.addEventListener('mouseover', () => {
    mouseBox.style.backgroundColor = '#28a745';
});

// 5. Mouseout - change back to blue
mouseBox.addEventListener('mouseout', () => {
    mouseBox.style.backgroundColor = '#007bff';
});

// 6. Mouse position tracking
const mousePos = document.getElementById('mouse-pos');
document.getElementById('mouse-tracker').addEventListener('mousemove', (e) => {
    mousePos.textContent = `X: ${e.clientX}, Y: ${e.clientY}`;
});

// 7. Mousedown/mouseup scale effect
mouseBox.addEventListener('mousedown', () => {
    mouseBox.style.transform = 'scale(0.9)';
});
mouseBox.addEventListener('mouseup', () => {
    mouseBox.style.transform = 'scale(1)';
});


// ===== Part 3: Keyboard Events =====

const keyboardInput = document.getElementById('keyboard-input');
const keyDisplay = document.getElementById('key-display');
let keyTimeout;

// 8. Keydown display
keyboardInput.addEventListener('keydown', (e) => {
    keyDisplay.innerHTML = `
        Key: ${e.key}<br>
        Code: ${e.code}<br>
        Modifiers: ${e.shiftKey ? 'Shift ' : ''}${e.ctrlKey ? 'Ctrl ' : ''}${e.altKey ? 'Alt' : ''}
    `;
    clearTimeout(keyTimeout);
});

// 9. Keyup clear after 1 second
keyboardInput.addEventListener('keyup', () => {
    keyTimeout = setTimeout(() => {
        keyDisplay.textContent = 'Press any key';
    }, 1000);
});


// ===== Part 4: Form Events =====

const demoForm = document.getElementById('demo-form');
const formOutput = document.getElementById('form-output');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');

// 10. Form submit
demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formOutput.innerHTML = `
        <p>Username: ${usernameInput.value}</p>
        <p>Email: ${emailInput.value}</p>
    `;
});

// 11. Live character count
usernameInput.addEventListener('input', () => {
    console.log(`Character count: ${usernameInput.value.length}`);
});

// 12. Focus/blur events
emailInput.addEventListener('focus', () => {
    emailInput.style.boxShadow = '0 0 5px rgba(0,123,255,0.5)';
});
emailInput.addEventListener('blur', () => {
    emailInput.style.boxShadow = 'none';
});


// ===== Part 5: Event Delegation =====

let itemCounter = 3;
const todoList = document.getElementById('todo-list');

// 13. Add new item
document.getElementById('add-item-btn').addEventListener('click', () => {
    itemCounter++;
    const newItem = document.createElement('div');
    newItem.className = 'list-item';
    newItem.innerHTML = `
        <input type="checkbox">
        <span>Task ${itemCounter}</span>
        <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(newItem);
});

// 14. Event delegation for delete and checkbox
todoList.addEventListener('click', (e) => {
    // Handle delete
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('.list-item').remove();
    }
    
    // Handle checkbox
    if (e.target.type === 'checkbox') {
        e.target.closest('.list-item').classList.toggle('completed');
    }
});


// ===== Part 6: Event Propagation =====

let stopPropagation = false;
const propagationLog = document.getElementById('propagation-log');
const propDemo = document.getElementById('propagation-demo');

// 15. Click events on nested elements
propDemo.addEventListener('click', (e) => {
    if (stopPropagation && e.target !== propDemo) return;
    propagationLog.textContent = 'Clicked: Outer (blue)';
});

propDemo.querySelector('.inner').addEventListener('click', (e) => {
    if (stopPropagation) e.stopPropagation();
    propagationLog.textContent = 'Clicked: Inner (green)';
});

propDemo.querySelector('.innermost').addEventListener('click', (e) => {
    if (stopPropagation) e.stopPropagation();
    propagationLog.textContent = 'Clicked: Innermost (yellow)';
});

// 16. Toggle stop propagation
document.getElementById('stop-propagation-btn').addEventListener('click', () => {
    stopPropagation = !stopPropagation;
    document.getElementById('stop-propagation-btn').textContent = 
        stopPropagation ? 'Stop Propagation: ON' : 'Toggle Stop Propagation';
});


// ===== Part 7: Prevent Default =====

const preventLog = document.getElementById('prevent-log');

// 17. Prevent link
document.getElementById('prevented-link').addEventListener('click', (e) => {
    e.preventDefault();
    preventLog.textContent = 'Link click prevented! Would have gone to: ' + e.target.href;
});

// 18. Prevent form
document.getElementById('prevented-form').addEventListener('submit', (e) => {
    e.preventDefault();
    preventLog.textContent = 'Form submit prevented!';
});


// ===== Part 8: Counter with Multiple Events =====

let count = 0;
const counterDisplay = document.getElementById('counter-display');

function updateCounter() {
    counterDisplay.textContent = count;
}

// 19. Button click events
document.getElementById('increment-btn').addEventListener('click', () => {
    count++;
    updateCounter();
});

document.getElementById('decrement-btn').addEventListener('click', () => {
    count--;
    updateCounter();
});

document.getElementById('reset-btn').addEventListener('click', () => {
    count = 0;
    updateCounter();
});

// 20. Keyboard events
document.addEventListener('keydown', (e) => {
    const change = e.shiftKey ? 10 : 1;
    
    if (e.key === 'ArrowUp') {
        count += change;
        updateCounter();
    } else if (e.key === 'ArrowDown') {
        count -= change;
        updateCounter();
    }
});


// ===== BONUS Challenges =====

// 21. Long press detection
function setupLongPress(element, callback, duration = 1000) {
    let pressTimer;
    
    element.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            callback();
        }, duration);
    });
    
    element.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });
    
    element.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
    });
}


// 22. Simple drag and drop concept
function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;
    
    element.style.position = 'absolute';
    
    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            element.style.left = (e.clientX - offsetX) + 'px';
            element.style.top = (e.clientY - offsetY) + 'px';
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}


// 23. Once event
const onceBtn = document.createElement('button');
onceBtn.textContent = 'Click me (only once)';
onceBtn.className = 'btn';
document.getElementById('section-1').appendChild(onceBtn);

onceBtn.addEventListener('click', () => {
    alert('This only fires once!');
    onceBtn.textContent = 'Already clicked';
}, { once: true });

console.log('All event handling exercises completed!');
