// Exercise 11: Solutions
// ======================

// ===== Part 1: Window Properties =====

// 1. Window info
document.getElementById('show-window-info').addEventListener('click', () => {
    document.getElementById('window-info').innerHTML = `
        <strong>Inner Size:</strong> ${window.innerWidth} x ${window.innerHeight}<br>
        <strong>Outer Size:</strong> ${window.outerWidth} x ${window.outerHeight}<br>
        <strong>Scroll Position:</strong> X: ${window.scrollX}, Y: ${window.scrollY}
    `;
});


// ===== Part 2: Dialog Methods =====

const dialogResult = document.getElementById('dialog-result');

// 2. Alert
document.getElementById('show-alert').addEventListener('click', () => {
    alert('This is an alert message!');
});

// 3. Confirm
document.getElementById('show-confirm').addEventListener('click', () => {
    const result = confirm('Do you want to proceed?');
    dialogResult.textContent = `You clicked: ${result ? 'OK' : 'Cancel'}`;
});

// 4. Prompt
document.getElementById('show-prompt').addEventListener('click', () => {
    const name = prompt('What is your name?', 'Anonymous');
    if (name) {
        dialogResult.textContent = `Hello, ${name}!`;
    } else {
        dialogResult.textContent = 'You cancelled the prompt.';
    }
});


// ===== Part 3: Location Object =====

// 5. Location info
document.getElementById('show-location-info').addEventListener('click', () => {
    document.getElementById('location-info').innerHTML = `
        <strong>href:</strong> ${location.href}<br>
        <strong>protocol:</strong> ${location.protocol}<br>
        <strong>host:</strong> ${location.host}<br>
        <strong>pathname:</strong> ${location.pathname}<br>
        <strong>search:</strong> ${location.search || '(none)'}<br>
        <strong>hash:</strong> ${location.hash || '(none)'}
    `;
});

// 6. Add hash
document.getElementById('add-hash').addEventListener('click', () => {
    location.hash = 'section';
});

// 7. Reload page (commented out to prevent issues during development)
document.getElementById('reload-page').addEventListener('click', () => {
    // location.reload();
    alert('location.reload() would refresh the page');
});


// ===== Part 4: Navigator Object =====

// 8. Navigator info
document.getElementById('show-navigator-info').addEventListener('click', () => {
    document.getElementById('navigator-info').innerHTML = `
        <strong>User Agent:</strong> ${navigator.userAgent}<br>
        <strong>Language:</strong> ${navigator.language}<br>
        <strong>Online:</strong> ${navigator.onLine}<br>
        <strong>Cookies Enabled:</strong> ${navigator.cookieEnabled}<br>
        <strong>Platform:</strong> ${navigator.platform}
    `;
});

// 9. Online status
const onlineStatus = document.getElementById('online-status');

function updateOnlineStatus() {
    if (navigator.onLine) {
        onlineStatus.textContent = 'Online';
        onlineStatus.className = 'online-status online';
    } else {
        onlineStatus.textContent = 'Offline';
        onlineStatus.className = 'online-status offline';
    }
}

updateOnlineStatus();
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);


// ===== Part 5: Timers =====

let timerInterval = null;
let seconds = 0;
const timerDisplay = document.getElementById('timer-display');

function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

// 10. Timer controls
document.getElementById('start-timer').addEventListener('click', () => {
    if (timerInterval) return; // Already running
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = formatTime(seconds);
    }, 1000);
});

document.getElementById('stop-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('reset-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    timerDisplay.textContent = formatTime(seconds);
});

// 11. Countdown
document.getElementById('countdown-btn').addEventListener('click', () => {
    const countdownDisplay = document.getElementById('countdown-display');
    let count = 5;
    
    countdownDisplay.textContent = count;
    
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDisplay.textContent = count;
        } else {
            countdownDisplay.textContent = 'Done!';
            clearInterval(countdownInterval);
        }
    }, 1000);
});


// ===== Part 6: Local Storage =====

const storageList = document.getElementById('storage-list');

// 13. Display storage items
function refreshStorageList() {
    storageList.innerHTML = '';
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        
        const item = document.createElement('div');
        item.className = 'storage-item';
        item.innerHTML = `
            <span><strong>${key}:</strong> ${value}</span>
            <button class="btn" onclick="removeStorageItem('${key}')">Remove</button>
        `;
        storageList.appendChild(item);
    }
    
    if (localStorage.length === 0) {
        storageList.innerHTML = '<p>No items in localStorage</p>';
    }
}

// Helper function to remove item
window.removeStorageItem = function(key) {
    localStorage.removeItem(key);
    refreshStorageList();
};

// 12. Save to storage
document.getElementById('save-storage').addEventListener('click', () => {
    const key = document.getElementById('storage-key').value;
    const value = document.getElementById('storage-value').value;
    
    if (key && value) {
        localStorage.setItem(key, value);
        document.getElementById('storage-key').value = '';
        document.getElementById('storage-value').value = '';
        refreshStorageList();
    }
});

// 14. Clear all
document.getElementById('clear-storage').addEventListener('click', () => {
    if (confirm('Clear all localStorage?')) {
        localStorage.clear();
        refreshStorageList();
    }
});

// 15. Load on page load
refreshStorageList();


// ===== Part 7: Dark Mode with Persistence =====

// 16. Dark mode
const darkModeKey = 'darkMode';

// Load saved preference
if (localStorage.getItem(darkModeKey) === 'true') {
    document.body.classList.add('dark-mode');
}

document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem(darkModeKey, isDark);
});


// ===== Part 8: Scroll & Screen =====

// 17. Scroll to top
document.getElementById('scroll-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 18. Scroll to bottom
document.getElementById('scroll-bottom').addEventListener('click', () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});

// 19. Screen info
document.getElementById('show-screen-info').addEventListener('click', () => {
    document.getElementById('screen-info').innerHTML = `
        <strong>Screen Size:</strong> ${screen.width} x ${screen.height}<br>
        <strong>Available:</strong> ${screen.availWidth} x ${screen.availHeight}<br>
        <strong>Color Depth:</strong> ${screen.colorDepth} bits
    `;
});


// ===== BONUS Challenges =====

// 20. Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// 21. Visit counter
let visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
localStorage.setItem('visitCount', visitCount);
console.log(`You have visited this page ${visitCount} times`);

// 22. Debounced resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log(`Window resized to: ${window.innerWidth} x ${window.innerHeight}`);
    }, 300);
});

console.log('All BOM exercises completed!');
