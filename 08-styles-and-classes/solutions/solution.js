// Exercise 08: Solutions
// ======================

const styleBox = document.getElementById('style-box');
const classBox = document.getElementById('class-box');

// ===== Part 1: Inline Styles =====

// 1. Random color
document.getElementById('change-color-btn').addEventListener('click', () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    styleBox.style.backgroundColor = randomColor;
});

// 2. Increase size
document.getElementById('change-size-btn').addEventListener('click', () => {
    const currentWidth = parseInt(window.getComputedStyle(styleBox).width);
    const currentHeight = parseInt(window.getComputedStyle(styleBox).height);
    styleBox.style.width = (currentWidth + 20) + 'px';
    styleBox.style.height = (currentHeight + 20) + 'px';
});

// 3. Reset styles
document.getElementById('reset-style-btn').addEventListener('click', () => {
    styleBox.removeAttribute('style');
});


// ===== Part 2: classList Methods =====

// 4. Toggle rounded
document.getElementById('toggle-round-btn').addEventListener('click', () => {
    classBox.classList.toggle('rounded');
});

// 5. Toggle large
document.getElementById('toggle-large-btn').addEventListener('click', () => {
    classBox.classList.toggle('large');
});

// 6. Toggle hidden
document.getElementById('toggle-hidden-btn').addEventListener('click', () => {
    classBox.classList.toggle('hidden');
});

// 7. Add highlight
document.getElementById('add-highlight-btn').addEventListener('click', () => {
    classBox.classList.add('highlight');
});

// 8. Remove highlight
document.getElementById('remove-highlight-btn').addEventListener('click', () => {
    classBox.classList.remove('highlight');
});


// ===== Part 3: Dark Mode =====

// 9. Dark mode toggle
const darkModeBtn = document.getElementById('dark-mode-btn');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
});


// ===== Part 4: Navigation Active State =====

// 10. Navigation active state
const navLinks = document.querySelectorAll('#main-nav .nav-link');
const currentPage = document.getElementById('current-page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active from all
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active to clicked
        link.classList.add('active');
        
        // Update current page text
        currentPage.textContent = 'Current page: ' + link.textContent;
    });
});


// ===== Part 5: Accordion =====

// 11. Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.classList.contains('open');
        
        // Close all
        document.querySelectorAll('.accordion-content').forEach(c => {
            c.classList.remove('open');
        });
        
        // Open clicked if it was closed
        if (!isOpen) {
            content.classList.add('open');
        }
    });
});


// ===== Part 6: Progress Bar =====

// 12. Progress bar
const progressBar = document.getElementById('progress-bar');
const progressSlider = document.getElementById('progress-slider');

progressSlider.addEventListener('input', () => {
    const value = progressSlider.value;
    
    // Update width and text
    progressBar.style.width = value + '%';
    progressBar.textContent = value + '%';
    
    // Remove all color classes
    progressBar.classList.remove('low', 'medium', 'high');
    
    // Add appropriate class
    if (value <= 33) {
        progressBar.classList.add('low');
    } else if (value <= 66) {
        progressBar.classList.add('medium');
    } else {
        progressBar.classList.add('high');
    }
});


// ===== Part 7: Card Selection =====

// 13. Card selection
const cards = document.querySelectorAll('.card');
const selectedCardsSpan = document.getElementById('selected-cards');

function updateSelectedDisplay() {
    const selected = document.querySelectorAll('.card.selected');
    if (selected.length === 0) {
        selectedCardsSpan.textContent = 'None';
    } else {
        const values = [...selected].map(c => c.dataset.value);
        selectedCardsSpan.textContent = values.join(', ');
    }
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
        updateSelectedDisplay();
    });
});


// ===== Part 8: Button States =====

// 14. Action button toggle
const actionBtn = document.getElementById('action-btn');
actionBtn.addEventListener('click', () => {
    actionBtn.classList.toggle('active');
    const isActive = actionBtn.classList.contains('active');
    actionBtn.textContent = isActive ? 'Clicked!' : 'Click Me';
});

// 15. Loading button
const loadingBtn = document.getElementById('loading-btn');
loadingBtn.addEventListener('click', () => {
    loadingBtn.classList.add('disabled');
    loadingBtn.textContent = 'Loading...';
    loadingBtn.disabled = true;
    
    setTimeout(() => {
        loadingBtn.classList.remove('disabled');
        loadingBtn.textContent = 'Submit';
        loadingBtn.disabled = false;
    }, 2000);
});


// ===== BONUS Challenges =====

// 16. Color picker (would need input element added)
function setupColorPicker() {
    // Add color input if needed
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#007bff';
    document.getElementById('section-1').appendChild(colorInput);
    
    colorInput.addEventListener('input', () => {
        styleBox.style.backgroundColor = colorInput.value;
    });
}
// setupColorPicker();


// 17. Select All / Deselect All
function selectAllCards() {
    cards.forEach(card => card.classList.add('selected'));
    updateSelectedDisplay();
}

function deselectAllCards() {
    cards.forEach(card => card.classList.remove('selected'));
    updateSelectedDisplay();
}


// 18. Get computed style
const bodyBg = window.getComputedStyle(document.body).backgroundColor;
console.log('Body background color:', bodyBg);

console.log('All styles and classes exercises completed!');
