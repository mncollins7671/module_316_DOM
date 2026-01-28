# Lesson 13: DOM Event-Based Form Validation

## Learning Objectives

By the end of this lesson, you will be able to:
- Implement custom validation using JavaScript
- Use the Constraint Validation API
- Show real-time validation feedback
- Validate on blur, input, and submit events
- Create custom error messages
- Implement complex validation logic (password matching, etc.)

---

## Why Use JavaScript Validation?

HTML validation is limited:
- ❌ Can't validate password confirmation
- ❌ Can't make async checks (username availability)
- ❌ Limited control over error messages
- ❌ Can't show custom UI feedback

JavaScript validation adds:
- ✅ Complex validation rules
- ✅ Custom error messages and styling
- ✅ Real-time feedback
- ✅ Async validation
- ✅ Cross-field validation

---

## The Constraint Validation API

Modern browsers provide built-in methods for form validation.

### Key Properties

```javascript
const input = document.getElementById('email');

// Check if valid
input.validity.valid;           // true/false

// Specific validity states
input.validity.valueMissing;    // Required field is empty
input.validity.typeMismatch;    // Wrong type (email, url, etc.)
input.validity.patternMismatch; // Doesn't match pattern
input.validity.tooLong;         // Exceeds maxlength
input.validity.tooShort;        // Below minlength
input.validity.rangeUnderflow;  // Below min
input.validity.rangeOverflow;   // Above max
input.validity.stepMismatch;    // Doesn't match step
input.validity.customError;     // Custom error set
```

### Key Methods

```javascript
// Check if element is valid
input.checkValidity();  // Returns true/false

// Check validity and show built-in message
input.reportValidity(); // Returns true/false, shows message

// Set custom error message
input.setCustomValidity('This username is taken');

// Clear custom error
input.setCustomValidity('');

// Get validation message
input.validationMessage; // Browser's error message
```

---

## Basic Event-Based Validation

### Validate on Submit

```javascript
const form = document.getElementById('myForm');

form.addEventListener('submit', (e) => {
    // Prevent submission
    e.preventDefault();
    
    // Check validity
    if (form.checkValidity()) {
        // Form is valid - submit
        console.log('Form is valid!');
        form.submit();
    } else {
        // Form is invalid - show errors
        showErrors();
    }
});
```

### Validate on Input (Real-time)

```javascript
const emailInput = document.getElementById('email');

emailInput.addEventListener('input', () => {
    if (emailInput.validity.valid) {
        clearError(emailInput);
    } else {
        showError(emailInput);
    }
});
```

### Validate on Blur (When Leaving Field)

```javascript
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
});
```

---

## Custom Error Display

Instead of browser default messages, create your own UI:

```html
<div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
    <span class="error-message" id="email-error"></span>
</div>
```

```css
.form-group {
    margin-bottom: 20px;
}

.error-message {
    color: red;
    font-size: 12px;
    display: none;
}

.form-group.error input {
    border-color: red;
}

.form-group.error .error-message {
    display: block;
}

.form-group.success input {
    border-color: green;
}
```

```javascript
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    errorSpan.textContent = message;
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    errorSpan.textContent = '';
}
```

---

## Field-Specific Validation

### Get Appropriate Error Message

```javascript
function getErrorMessage(input) {
    const validity = input.validity;
    
    if (validity.valueMissing) {
        return `${input.name || 'This field'} is required`;
    }
    if (validity.typeMismatch) {
        if (input.type === 'email') {
            return 'Please enter a valid email address';
        }
        if (input.type === 'url') {
            return 'Please enter a valid URL';
        }
    }
    if (validity.patternMismatch) {
        return input.title || 'Please match the requested format';
    }
    if (validity.tooShort) {
        return `Must be at least ${input.minLength} characters`;
    }
    if (validity.tooLong) {
        return `Must be no more than ${input.maxLength} characters`;
    }
    if (validity.rangeUnderflow) {
        return `Must be at least ${input.min}`;
    }
    if (validity.rangeOverflow) {
        return `Must be no more than ${input.max}`;
    }
    
    return 'Invalid value';
}
```

---

## Password Confirmation Validation

A common cross-field validation:

```html
<input type="password" id="password" name="password" required minlength="8">
<input type="password" id="confirm-password" name="confirmPassword" required>
```

```javascript
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

function validatePasswordMatch() {
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords do not match');
    } else {
        confirmPassword.setCustomValidity('');
    }
}

password.addEventListener('input', validatePasswordMatch);
confirmPassword.addEventListener('input', validatePasswordMatch);
```

---

## Complete Form Validation Example

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .form-group { margin-bottom: 20px; }
        
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        
        input {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        
        .error-message {
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }
        
        .form-group.error input { border-color: #dc3545; }
        .form-group.error .error-message { display: block; }
        .form-group.success input { border-color: #28a745; }
        
        button {
            padding: 12px 24px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        
        button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <form id="registrationForm" novalidate>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" 
                   required minlength="4" maxlength="20"
                   pattern="[A-Za-z0-9_]+">
            <span class="error-message"></span>
        </div>
        
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <span class="error-message"></span>
        </div>
        
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" 
                   required minlength="8">
            <span class="error-message"></span>
        </div>
        
        <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
            <span class="error-message"></span>
        </div>
        
        <button type="submit">Register</button>
    </form>

    <script>
        const form = document.getElementById('registrationForm');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        // Helper functions
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            const errorSpan = formGroup.querySelector('.error-message');
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            errorSpan.textContent = message;
        }
        
        function showSuccess(input) {
            const formGroup = input.closest('.form-group');
            const errorSpan = formGroup.querySelector('.error-message');
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            errorSpan.textContent = '';
        }
        
        function getErrorMessage(input) {
            const validity = input.validity;
            
            if (validity.valueMissing) {
                return `${input.previousElementSibling.textContent} is required`;
            }
            if (validity.typeMismatch && input.type === 'email') {
                return 'Please enter a valid email address';
            }
            if (validity.tooShort) {
                return `Must be at least ${input.minLength} characters`;
            }
            if (validity.patternMismatch) {
                return 'Only letters, numbers, and underscores allowed';
            }
            if (validity.customError) {
                return input.validationMessage;
            }
            
            return 'Invalid value';
        }
        
        function validateField(input) {
            // Check password match
            if (input.id === 'password' || input.id === 'confirmPassword') {
                if (password.value && confirmPassword.value) {
                    if (password.value !== confirmPassword.value) {
                        confirmPassword.setCustomValidity('Passwords do not match');
                    } else {
                        confirmPassword.setCustomValidity('');
                    }
                }
            }
            
            // Show error or success
            if (input.validity.valid) {
                showSuccess(input);
            } else {
                showError(input, getErrorMessage(input));
            }
        }
        
        // Validate on blur
        form.querySelectorAll('input').forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.closest('.form-group').classList.contains('error')) {
                    validateField(input);
                }
            });
        });
        
        // Validate on submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            form.querySelectorAll('input').forEach(input => {
                validateField(input);
                if (!input.validity.valid) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                console.log('Form submitted!');
                alert('Registration successful!');
            } else {
                // Focus first invalid field
                form.querySelector('.error input').focus();
            }
        });
    </script>
</body>
</html>
```

---

## Real-Time Character Counter

```html
<div class="form-group">
    <label for="bio">Bio</label>
    <textarea id="bio" maxlength="200" rows="4"></textarea>
    <span class="char-count"><span id="char-current">0</span>/200</span>
</div>
```

```javascript
const bio = document.getElementById('bio');
const charCurrent = document.getElementById('char-current');

bio.addEventListener('input', () => {
    charCurrent.textContent = bio.value.length;
    
    if (bio.value.length > 180) {
        charCurrent.style.color = 'orange';
    } else if (bio.value.length >= 200) {
        charCurrent.style.color = 'red';
    } else {
        charCurrent.style.color = 'inherit';
    }
});
```

---

## Password Strength Indicator

```javascript
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

passwordInput.addEventListener('input', () => {
    const strength = checkPasswordStrength(passwordInput.value);
    const percentage = (strength / 6) * 100;
    
    strengthBar.style.width = percentage + '%';
    
    if (strength <= 2) {
        strengthBar.style.background = 'red';
        strengthText.textContent = 'Weak';
    } else if (strength <= 4) {
        strengthBar.style.background = 'orange';
        strengthText.textContent = 'Medium';
    } else {
        strengthBar.style.background = 'green';
        strengthText.textContent = 'Strong';
    }
});
```

---

## Async Validation (Username Availability)

```javascript
const usernameInput = document.getElementById('username');
let debounceTimer;

usernameInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    
    debounceTimer = setTimeout(async () => {
        const username = usernameInput.value;
        
        if (username.length < 4) return;
        
        showLoading(usernameInput);
        
        try {
            const available = await checkUsernameAvailability(username);
            
            if (!available) {
                usernameInput.setCustomValidity('Username is already taken');
                showError(usernameInput, 'Username is already taken');
            } else {
                usernameInput.setCustomValidity('');
                showSuccess(usernameInput);
            }
        } catch (error) {
            console.error('Error checking username:', error);
        }
    }, 500); // Wait 500ms after user stops typing
});

// Simulated API call
async function checkUsernameAvailability(username) {
    // In real app: fetch('/api/check-username?username=' + username)
    return new Promise((resolve) => {
        setTimeout(() => {
            const taken = ['admin', 'user', 'test'];
            resolve(!taken.includes(username.toLowerCase()));
        }, 300);
    });
}
```

---

## Preventing Form Submission

```javascript
// Method 1: preventDefault
form.addEventListener('submit', (e) => {
    if (!isFormValid()) {
        e.preventDefault();
    }
});

// Method 2: Disable button until valid
function updateSubmitButton() {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = !form.checkValidity();
}

form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateSubmitButton);
});
```

---

## Summary

| Concept | Description |
|---------|-------------|
| `validity` | Object with validation state properties |
| `checkValidity()` | Returns true/false for validity |
| `reportValidity()` | Shows browser's validation message |
| `setCustomValidity()` | Set custom error message |
| `validationMessage` | Current validation message |
| `blur` event | Validate when leaving field |
| `input` event | Real-time validation |
| `submit` event | Final validation before submit |

### Best Practices
1. Use `novalidate` on forms to control validation yourself
2. Validate on blur for better UX (not every keystroke)
3. Revalidate on input if field is already showing error
4. Focus first invalid field after submit attempt
5. Always validate server-side too!

---

## Next Lesson

In the final lesson, we'll put everything together in a **Capstone Project** that demonstrates all the DOM skills you've learned!
