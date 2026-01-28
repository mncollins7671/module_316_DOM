// Exercise 02: Solutions
// ======================

// ===== Part 1: getElementById =====

// 1. Select the element with id "page-title"
const pageTitle = document.getElementById('page-title');
console.log('1. Page Title:', pageTitle);

// 2. Select the element with id "main-header"
const mainHeader = document.getElementById('main-header');
console.log('2. Main Header:', mainHeader);

// 3. Select the contact form by its id
const contactForm = document.getElementById('contact-form');
console.log('3. Contact Form:', contactForm);

// 4. Select the submit button by its id
const submitBtn = document.getElementById('submit-btn');
console.log('4. Submit Button:', submitBtn);


// ===== Part 2: querySelector =====

// 5. Select the first paragraph with class "intro-text"
const firstIntro = document.querySelector('.intro-text');
console.log('5. First Intro Text:', firstIntro);

// 6. Select the navigation element using its class
const navigation = document.querySelector('.navigation');
console.log('6. Navigation:', navigation);

// 7. Select the h3 element that also has class "special"
const specialTitle = document.querySelector('h3.special');
console.log('7. Special Title:', specialTitle);

// 8. Select the first card using its data attribute
const firstCard = document.querySelector('[data-id="1"]');
console.log('8. First Card:', firstCard);

// 9. Select the email input using an attribute selector
const emailInput = document.querySelector('input[type="email"]');
console.log('9. Email Input:', emailInput);


// ===== Part 3: querySelectorAll =====

// 10. Select ALL nav links
const navLinks = document.querySelectorAll('.nav-link');
console.log('10. Nav Links:', navLinks);

// 11. Select ALL cards on the page
const allCards = document.querySelectorAll('.card');
console.log('11. All Cards:', allCards);

// 12. Select ALL paragraphs with class "intro-text"
const introTexts = document.querySelectorAll('.intro-text');
console.log('12. Intro Texts:', introTexts);

// 13. Select ALL input elements in the form
const formInputs = document.querySelectorAll('#contact-form input');
console.log('13. Form Inputs:', formInputs);

// 14. Select ALL h2 AND h3 elements on the page
const headings = document.querySelectorAll('h2, h3');
console.log('14. H2 and H3 elements:', headings);


// ===== Part 4: Caching and Using Selections =====

// 15. Cache the page title element, then log its text content
const cachedTitle = document.getElementById('page-title');
console.log('15. Title text:', cachedTitle.textContent);

// 16. Cache all card titles, then log how many there are
const cardTitles = document.querySelectorAll('.card-title');
console.log('16. Number of card titles:', cardTitles.length);

// 17. Select the footer and log its innerHTML
const footer = document.getElementById('main-footer');
console.log('17. Footer HTML:', footer.innerHTML);


// ===== BONUS Challenges =====

// 18. Select the second nav-link
const secondLink = document.querySelector('.nav-link:nth-child(2)');
console.log('18. Second Nav Link:', secondLink);

// 19. Select all cards except the first one
const otherCards = document.querySelectorAll('.card:not(:first-child)');
console.log('19. Cards after first:', otherCards);

// 20. Convert a NodeList to an array
const cardsArray = Array.from(document.querySelectorAll('.card'));
console.log('20. Cards as array:', cardsArray);
// Alternative: const cardsArray = [...document.querySelectorAll('.card')];
