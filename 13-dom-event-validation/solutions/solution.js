// Exercise 13: DOM Event-Based Validation - SOLUTIONS
// =====================================================

// ===== Helper Functions =====

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    if (errorSpan) errorSpan.textContent = message;
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    if (errorSpan) errorSpan.textContent = '';
}

function getBasicMessage(input) {
    if (input.validity.valueMissing) {
        return 'This field is required';
    }
    if (input.validity.typeMismatch) {
        if (input.type === 'email') return 'Please enter a valid email';
        if (input.type === 'url') return 'Please enter a valid URL';
    }
    if (input.validity.tooShort) {
        return `Must be at least ${input.minLength} characters`;
    }
    if (input.validity.tooLong) {
        return `Must be no more than ${input.maxLength} characters`;
    }
    if (input.validity.rangeUnderflow) {
        return `Must be at least ${input.min}`;
    }
    if (input.validity.rangeOverflow) {
        return `Must be no more than ${input.max}`;
    }
    if (input.validity.patternMismatch) {
        return input.title || 'Please match the required format';
    }
    if (input.validity.customError) {
        return input.validationMessage;
    }
    return 'Invalid value';
}


// ===== Exercise 1: Validate on Submit =====
const form1 = document.getElementById('form1');

form1.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    form1.querySelectorAll('input').forEach(input => {
        if (!input.validity.valid) {
            showError(input, getBasicMessage(input));
            isValid = false;
        } else {
            clearError(input);
        }
    });
    
    if (isValid) {
        alert('Form 1 submitted successfully!');
    }
});


// ===== Exercise 2: Validate on Blur =====
const form2 = document.getElementById('form2');

form2.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.validity.valid) {
            clearError(input);
        } else {
            showError(input, getBasicMessage(input));
        }
    });
});

form2.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form2.checkValidity()) {
        alert('Form 2 submitted successfully!');
    }
});


// ===== Exercise 3: Real-time Validation =====
const form3 = document.getElementById('form3');

form3.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        if (input.value === '') {
            // Clear styling if empty
            input.closest('.form-group').classList.remove('error', 'success');
        } else if (input.validity.valid) {
            clearError(input);
        } else {
            showError(input, getBasicMessage(input));
        }
    });
});

form3.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form3.checkValidity()) {
        alert('Form 3 submitted successfully!');
    }
});


// ===== Exercise 4: Password Confirmation =====
const form4 = document.getElementById('form4');
const password4 = document.getElementById('password4');
const confirm4 = document.getElementById('confirm4');

function validatePasswordMatch4() {
    if (password4.value !== confirm4.value) {
        confirm4.setCustomValidity('Passwords do not match');
    } else {
        confirm4.setCustomValidity('');
    }
    
    // Update UI
    if (confirm4.value) {
        if (confirm4.validity.valid) {
            clearError(confirm4);
        } else {
            showError(confirm4, getBasicMessage(confirm4));
        }
    }
}

password4.addEventListener('input', () => {
    if (password4.validity.valid) {
        clearError(password4);
    } else {
        showError(password4, getBasicMessage(password4));
    }
    validatePasswordMatch4();
});

confirm4.addEventListener('input', validatePasswordMatch4);

form4.addEventListener('submit', (e) => {
    e.preventDefault();
    validatePasswordMatch4();
    
    if (form4.checkValidity()) {
        alert('Form 4 submitted successfully!');
    } else {
        form4.querySelectorAll('input').forEach(input => {
            if (!input.validity.valid) {
                showError(input, getBasicMessage(input));
            }
        });
    }
});


// ===== Exercise 5: Character Counter =====
const tweet5 = document.getElementById('tweet5');
const charCurrent5 = document.getElementById('char-current5');

tweet5.addEventListener('input', () => {
    const current = tweet5.value.length;
    const max = parseInt(tweet5.maxLength);
    
    charCurrent5.textContent = current;
    
    const charCount = charCurrent5.parentElement;
    charCount.classList.remove('warning', 'danger');
    
    if (current >= max) {
        charCount.classList.add('danger');
    } else if (current >= max * 0.8) {
        charCount.classList.add('warning');
    }
});

const bio5 = document.getElementById('bio5');
const charCurrentBio5 = document.getElementById('char-current-bio5');

bio5.addEventListener('input', () => {
    const current = bio5.value.length;
    const max = parseInt(bio5.maxLength);
    
    charCurrentBio5.textContent = current;
    
    const charCount = charCurrentBio5.parentElement;
    charCount.classList.remove('warning', 'danger');
    
    if (current >= max) {
        charCount.classList.add('danger');
    } else if (current >= max * 0.8) {
        charCount.classList.add('warning');
    }
});


// ===== Exercise 6: Password Strength =====
const password6 = document.getElementById('password6');
const strengthBar6 = document.getElementById('strength-bar6');
const strengthText6 = document.getElementById('strength-text6');

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

password6.addEventListener('input', () => {
    const strength = checkPasswordStrength(password6.value);
    const percentage = (strength / 6) * 100;
    
    strengthBar6.style.width = percentage + '%';
    
    if (strength === 0) {
        strengthBar6.style.background = '#eee';
        strengthText6.textContent = 'Enter a password';
    } else if (strength <= 2) {
        strengthBar6.style.background = '#dc3545';
        strengthText6.textContent = 'Weak';
    } else if (strength <= 4) {
        strengthBar6.style.background = '#ffc107';
        strengthText6.textContent = 'Medium';
    } else {
        strengthBar6.style.background = '#28a745';
        strengthText6.textContent = 'Strong';
    }
});


// ===== Exercise 7: Custom Error Messages =====
const form7 = document.getElementById('form7');

function getCustomMessage(input) {
    if (input.validity.valueMissing) {
        return `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
    }
    if (input.validity.typeMismatch) {
        if (input.type === 'email') {
            return 'Please enter a valid email address (e.g., user@example.com)';
        }
        if (input.type === 'url') {
            return 'Please enter a valid URL (e.g., https://example.com)';
        }
    }
    if (input.validity.patternMismatch) {
        return 'Please use only letters, numbers, and underscores';
    }
    if (input.validity.tooShort) {
        return `${input.name} must be at least ${input.minLength} characters long`;
    }
    if (input.validity.tooLong) {
        return `${input.name} must be no more than ${input.maxLength} characters`;
    }
    return 'Please enter a valid value';
}

form7.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value === '' && !input.required) {
            input.closest('.form-group').classList.remove('error', 'success');
        } else if (input.validity.valid) {
            clearError(input);
        } else {
            showError(input, getCustomMessage(input));
        }
    });
});

form7.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    form7.querySelectorAll('input').forEach(input => {
        if (!input.validity.valid) {
            showError(input, getCustomMessage(input));
            isValid = false;
        }
    });
    
    if (isValid) {
        alert('Form 7 submitted successfully!');
    }
});


// ===== Exercise 8: Enable Submit When Valid =====
const form8 = document.getElementById('form8');
const submit8 = document.getElementById('submit8');

function updateSubmitButton8() {
    submit8.disabled = !form8.checkValidity();
}

form8.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateSubmitButton8);
    input.addEventListener('change', updateSubmitButton8);
});

form8.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form 8 submitted successfully!');
});


// ===== Exercise 9: Complete Signup Form =====
const form9 = document.getElementById('form9');
const password9 = document.getElementById('password9');
const confirm9 = document.getElementById('confirm9');
const strengthBar9 = document.getElementById('strength-bar9');
const bio9 = document.getElementById('bio9');
const charCount9 = document.getElementById('char-count9');

// Password match validation
function validatePasswordMatch9() {
    if (password9.value !== confirm9.value) {
        confirm9.setCustomValidity('Passwords do not match');
    } else {
        confirm9.setCustomValidity('');
    }
}

// Password strength
password9.addEventListener('input', () => {
    const strength = checkPasswordStrength(password9.value);
    const percentage = (strength / 6) * 100;
    
    strengthBar9.style.width = percentage + '%';
    
    if (strength <= 2) {
        strengthBar9.style.background = '#dc3545';
    } else if (strength <= 4) {
        strengthBar9.style.background = '#ffc107';
    } else {
        strengthBar9.style.background = '#28a745';
    }
    
    validatePasswordMatch9();
});

confirm9.addEventListener('input', validatePasswordMatch9);

// Character counter for bio
bio9.addEventListener('input', () => {
    charCount9.textContent = bio9.value.length;
});

// Blur validation for all fields
form9.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.id === 'password9' || input.id === 'confirm9') {
            validatePasswordMatch9();
        }
        
        if (input.value || input.required) {
            if (input.validity.valid) {
                clearError(input);
            } else {
                showError(input, getBasicMessage(input));
            }
        }
    });
});

// Submit validation
form9.addEventListener('submit', (e) => {
    e.preventDefault();
    validatePasswordMatch9();
    
    let isValid = true;
    form9.querySelectorAll('input').forEach(input => {
        if (!input.validity.valid) {
            showError(input, getBasicMessage(input));
            isValid = false;
        }
    });
    
    if (isValid) {
        alert('Account created successfully!');
    }
});


// ===== Exercise 10: Focus First Error =====
const form10 = document.getElementById('form10');

form10.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    let firstInvalid = null;
    
    form10.querySelectorAll('input').forEach(input => {
        if (!input.validity.valid) {
            showError(input, getBasicMessage(input));
            isValid = false;
            if (!firstInvalid) {
                firstInvalid = input;
            }
        } else {
            clearError(input);
        }
    });
    
    if (isValid) {
        alert('Form 10 submitted successfully!');
    } else {
        // Focus the first invalid field
        firstInvalid.focus();
    }
});

// Also validate on blur
form10.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.validity.valid) {
            clearError(input);
        } else if (input.value || input.required) {
            showError(input, getBasicMessage(input));
        }
    });
});


console.log('All DOM Event Validation exercises loaded!');
