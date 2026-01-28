// Exercise 03: Solutions
// ======================

// Get a starting element to work from
const activeNavItem = document.querySelector('.nav-item.active');
const secondCard = document.getElementById('card-2');
const firstActionBtn = document.querySelector('.action-btn');

// ===== Part 1: Parent Navigation =====

// 1. Starting from activeNavItem, get its parent element (the <ul>)
const parentUl = activeNavItem.parentElement;
console.log('1. Parent UL:', parentUl);

// 2. From the activeNavItem, navigate up to find the <nav> element
const navElement = activeNavItem.parentElement.parentElement;
// Or using closest():
const navElement2 = activeNavItem.closest('nav');
console.log('2. Nav Element:', navElement);

// 3. From firstActionBtn, find the closest .card ancestor
const closestCard = firstActionBtn.closest('.card');
console.log('3. Closest Card:', closestCard);

// 4. From secondCard, navigate to its parent (main#content)
const mainContent = secondCard.parentElement;
console.log('4. Main Content:', mainContent);


// ===== Part 2: Child Navigation =====

// 5. Get the nav-list element and find all its child elements
const navList = document.getElementById('nav-list');
const navChildren = navList.children;
console.log('5. Nav Children:', navChildren);

// 6. Get the first child element of the navList
const firstNavChild = navList.firstElementChild;
console.log('6. First Nav Child:', firstNavChild);

// 7. Get the last child element of the navList
const lastNavChild = navList.lastElementChild;
console.log('7. Last Nav Child:', lastNavChild);

// 8. Get all children of secondCard
const cardChildren = secondCard.children;
console.log('8. Card Children:', cardChildren);

// 9. Get the first element child of secondCard (the h2)
const cardHeading = secondCard.firstElementChild;
console.log('9. Card Heading:', cardHeading);


// ===== Part 3: Sibling Navigation =====

// 10. From activeNavItem ("About"), get the previous sibling ("Home")
const prevSibling = activeNavItem.previousElementSibling;
console.log('10. Previous Sibling:', prevSibling);

// 11. From activeNavItem ("About"), get the next sibling ("Services")
const nextSibling = activeNavItem.nextElementSibling;
console.log('11. Next Sibling:', nextSibling);

// 12. From secondCard, get the previous sibling card (card-1)
const prevCard = secondCard.previousElementSibling;
console.log('12. Previous Card:', prevCard);

// 13. From secondCard, get the next sibling card (card-3)
const nextCard = secondCard.nextElementSibling;
console.log('13. Next Card:', nextCard);


// ===== Part 4: Combined Navigation =====

// 14. Starting from firstActionBtn, navigate to find the h2 of its card
const cardFromBtn = firstActionBtn.closest('.card');
const h2FromBtn = cardFromBtn.firstElementChild;
console.log('14. H2 from Button:', h2FromBtn);

// 15. Starting from secondCard, get the last nav item
const containerFromCard = secondCard.closest('.container');
const headerFromContainer = containerFromCard.querySelector('header');
const lastNavItem = headerFromContainer.querySelector('ul').lastElementChild;
console.log('15. Last Nav Item:', lastNavItem);

// 16. Get all siblings of secondCard
const siblings = [];
let sibling = secondCard.parentElement.firstElementChild;
while (sibling) {
    if (sibling !== secondCard) {
        siblings.push(sibling);
    }
    sibling = sibling.nextElementSibling;
}
console.log('16. All Siblings:', siblings);


// ===== Part 5: Counting and Checking =====

// 17. Count how many child elements the main#content has
const mainElement = document.getElementById('content');
const childCount = mainElement.children.length;
console.log('17. Child Count:', childCount);

// 18. Check if secondCard has any children
const hasChildren = secondCard.children.length > 0;
// Or: const hasChildren = secondCard.hasChildNodes();
console.log('18. Has Children:', hasChildren);

// 19. Check if activeNavItem has a previous sibling
const hasPrevSibling = activeNavItem.previousElementSibling !== null;
console.log('19. Has Previous Sibling:', hasPrevSibling);


// ===== BONUS Challenges =====

// 20. Function that returns all ancestors as an array
function getAncestors(element) {
    const ancestors = [];
    let current = element.parentElement;
    while (current) {
        ancestors.push(current);
        current = current.parentElement;
    }
    return ancestors;
}
console.log('20. Ancestors of activeNavItem:', getAncestors(activeNavItem));

// 21. Function that finds the index of an element among its siblings
function getSiblingIndex(element) {
    let index = 0;
    let sibling = element.previousElementSibling;
    while (sibling) {
        index++;
        sibling = sibling.previousElementSibling;
    }
    return index;
}
console.log('21. Index of activeNavItem:', getSiblingIndex(activeNavItem));

// 22. Starting from any button, navigate to find the sidebar
const sidebar = firstActionBtn.closest('.container').querySelector('#sidebar');
console.log('22. Sidebar from button:', sidebar);
