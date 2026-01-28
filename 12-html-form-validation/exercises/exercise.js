// Exercise 12: HTML Form Validation
// ==================================
// These exercises are primarily HTML-based.
// This file contains helper scripts and verification.

// Prevent forms from actually submitting (for testing)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form is valid! ✓');
    });
});

// ===== Exercise 1: Required Fields =====
// TODO: In index.html, add "required" attribute to:
// - #firstName1
// - #lastName1
// - #email1


// ===== Exercise 2: Input Types =====
// TODO: In index.html, change the type attribute for:
// - #email2 → type="email"
// - #website2 → type="url"
// - #age2 → type="number"
// - #birthday2 → type="date"
// - #color2 → type="color"


// ===== Exercise 3: Pattern Validation =====
// TODO: In index.html, add pattern and title attributes:
// - #phone3: pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
// - #zip3: pattern="[0-9]{5}"
// - #username3: pattern="[A-Za-z0-9]{4,12}"


// ===== Exercise 4: Length Constraints =====
// TODO: In index.html, add minlength/maxlength:
// - #username4: minlength="3" maxlength="20" required
// - #bio4: maxlength="150"
// - #tweet4: maxlength="280"


// ===== Exercise 5: Number Constraints =====
// TODO: In index.html, add min/max/step:
// - #age5: min="18" max="100"
// - #quantity5: min="1" max="10" step="1"
// - #price5: min="0.01" step="0.01"
// - #rating5: min="1" max="5" step="0.5"


// ===== Exercise 6: Date Constraints =====
// Set today's date for min/max attributes
const today = new Date().toISOString().split('T')[0];
console.log('Today\'s date for forms:', today);

// TODO: In index.html, add date constraints:
// - #appointment6: min="(today's date)"
// - #birthdate6: max="(today's date)"
// - #meeting6: min="09:00" max="17:00"

// You can also set these dynamically with JavaScript:
// document.getElementById('appointment6').min = today;
// document.getElementById('birthdate6').max = today;


// ===== Exercise 7: Select Validation =====
// TODO: In index.html:
// - Add required to #country7 and #size7
// - Change first option to have value=""
// Example: <option value="">Select a country</option>


// ===== Exercise 8: Checkbox and Radio =====
// TODO: In index.html:
// - Add required to all radio inputs with name="contact"
// - Add required to #terms8


// ===== Exercise 9: Complete Form =====
// TODO: Build a complete form in index.html with these fields:
// - fullName: required, pattern="[A-Za-z\s]+"
// - email: required, type="email"
// - password: required, minlength="8"
// - age: required, type="number", min="18", max="120"
// - phone: pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
// - country: required, select with value="" first option
// - terms: required, checkbox


// ===== Exercise 10: Strong Password =====
// TODO: In index.html:
// - #username10: required, minlength="4", pattern="[A-Za-z0-9_]+"
// - #password10: required, pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"


// ===== Verification Helper =====
// This function checks if a field has the expected attributes
function verifyAttribute(id, attribute, expectedValue = null) {
    const element = document.getElementById(id);
    if (!element) {
        console.log(`❌ Element #${id} not found`);
        return false;
    }
    
    if (attribute === 'required') {
        const hasAttr = element.hasAttribute('required');
        console.log(`${hasAttr ? '✓' : '❌'} #${id} has required`);
        return hasAttr;
    }
    
    const value = element.getAttribute(attribute);
    if (expectedValue === null) {
        const hasAttr = element.hasAttribute(attribute);
        console.log(`${hasAttr ? '✓' : '❌'} #${id} has ${attribute}`);
        return hasAttr;
    }
    
    const matches = value === expectedValue;
    console.log(`${matches ? '✓' : '❌'} #${id} ${attribute}="${value}" (expected: ${expectedValue})`);
    return matches;
}

// Run verification
function verifyExercises() {
    console.log('=== Exercise 1: Required Fields ===');
    verifyAttribute('firstName1', 'required');
    verifyAttribute('lastName1', 'required');
    verifyAttribute('email1', 'required');
    
    console.log('\n=== Exercise 2: Input Types ===');
    verifyAttribute('email2', 'type', 'email');
    verifyAttribute('website2', 'type', 'url');
    verifyAttribute('age2', 'type', 'number');
    verifyAttribute('birthday2', 'type', 'date');
    verifyAttribute('color2', 'type', 'color');
    
    console.log('\n=== Exercise 3: Patterns ===');
    verifyAttribute('phone3', 'pattern');
    verifyAttribute('zip3', 'pattern');
    verifyAttribute('username3', 'pattern');
    
    console.log('\n=== Exercise 5: Number Constraints ===');
    verifyAttribute('age5', 'min', '18');
    verifyAttribute('age5', 'max', '100');
    verifyAttribute('quantity5', 'step', '1');
    verifyAttribute('rating5', 'step', '0.5');
    
    console.log('\n=== Exercise 7: Select Required ===');
    verifyAttribute('country7', 'required');
    verifyAttribute('size7', 'required');
    
    console.log('\n=== Exercise 8: Checkbox Required ===');
    verifyAttribute('terms8', 'required');
}

// Uncomment to run verification:
// verifyExercises();

console.log('HTML Form Validation exercises loaded.');
console.log('These exercises are primarily completed in the HTML file.');
console.log('Run verifyExercises() in console to check your work.');
