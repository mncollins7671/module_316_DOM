# Lesson 12: HTML Form Validation

## Learning Objectives

By the end of this lesson, you will be able to:
- Understand the purpose of client-side validation
- Use HTML5 validation attributes
- Implement required fields
- Use pattern matching for custom validation
- Set min/max constraints for numbers and dates
- Customize validation messages

---

## What is Form Validation?

Form validation ensures users enter data correctly before submission. There are two types:

1. **Client-side validation** (browser) - Immediate feedback, better UX
2. **Server-side validation** (server) - Security, always required

This lesson focuses on **HTML attribute-based validation** - using built-in HTML5 features.

---

## The required Attribute

Makes a field mandatory.

```html
<form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <button type="submit">Submit</button>
</form>
```

**What happens:**
- Form cannot be submitted if required fields are empty
- Browser shows a validation message
- Works with inputs, selects, and textareas

---

## Input Types with Built-in Validation

HTML5 provides input types that validate automatically:

### Email
```html
<input type="email" name="email" required>
<!-- Validates email format (must contain @) -->
```

### URL
```html
<input type="url" name="website">
<!-- Validates URL format (must start with http:// or https://) -->
```

### Number
```html
<input type="number" name="age" min="0" max="120">
<!-- Only allows numbers within range -->
```

### Date
```html
<input type="date" name="birthdate" min="1900-01-01" max="2024-12-31">
<!-- Validates date format and range -->
```

### Tel (Telephone)
```html
<input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
<!-- Tel type alone doesn't validate, but pattern does -->
```

---

## The pattern Attribute

Use regular expressions to define valid input formats.

### Common Patterns

```html
<!-- Phone number: 123-456-7890 -->
<input type="tel" name="phone" 
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       title="Format: 123-456-7890">

<!-- Zip code: 5 digits or 5+4 -->
<input type="text" name="zip" 
       pattern="[0-9]{5}(-[0-9]{4})?"
       title="5-digit zip code (with optional +4)">

<!-- Username: letters and numbers only, 4-20 characters -->
<input type="text" name="username" 
       pattern="[A-Za-z0-9]{4,20}"
       title="4-20 alphanumeric characters">

<!-- Password: min 8 chars, 1 uppercase, 1 lowercase, 1 number -->
<input type="password" name="password" 
       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
       title="Minimum 8 characters with uppercase, lowercase, and number">

<!-- Only letters -->
<input type="text" name="firstname" 
       pattern="[A-Za-z]+"
       title="Letters only">

<!-- Only letters and spaces -->
<input type="text" name="fullname" 
       pattern="[A-Za-z\s]+"
       title="Letters and spaces only">
```

**Note:** Always include a `title` attribute to explain the expected format.

---

## Length Constraints

### minlength and maxlength

```html
<!-- Username: 3-15 characters -->
<input type="text" name="username" 
       minlength="3" 
       maxlength="15" 
       required>

<!-- Bio: max 500 characters -->
<textarea name="bio" maxlength="500"></textarea>

<!-- Comment: at least 10 characters -->
<textarea name="comment" minlength="10" required></textarea>
```

---

## Number Constraints

### min, max, and step

```html
<!-- Age: 18 to 100 -->
<input type="number" name="age" min="18" max="100">

<!-- Quantity: 1 to 10, whole numbers -->
<input type="number" name="qty" min="1" max="10" step="1">

<!-- Price: 0.01 minimum, increments of 0.01 -->
<input type="number" name="price" min="0.01" step="0.01">

<!-- Rating: 1 to 5, half stars allowed -->
<input type="number" name="rating" min="1" max="5" step="0.5">
```

### Range Input
```html
<label for="volume">Volume: <span id="volume-value">50</span></label>
<input type="range" id="volume" name="volume" min="0" max="100" value="50">
```

---

## Date Constraints

```html
<!-- Future dates only -->
<input type="date" name="appointment" min="2024-01-01">

<!-- Past dates only -->
<input type="date" name="birthdate" max="2024-12-31">

<!-- Within a range -->
<input type="date" name="event" min="2024-01-01" max="2024-12-31">

<!-- Time range -->
<input type="time" name="meeting" min="09:00" max="17:00">
```

---

## Select Validation

```html
<select name="country" required>
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
</select>
```

**Key:** The first option has an empty `value=""` - this makes `required` work.

---

## Checkbox and Radio Validation

### Required Checkbox
```html
<label>
    <input type="checkbox" name="terms" required>
    I agree to the terms and conditions
</label>
```

### Required Radio (at least one selected)
```html
<fieldset>
    <legend>Preferred Contact Method:</legend>
    <label>
        <input type="radio" name="contact" value="email" required> Email
    </label>
    <label>
        <input type="radio" name="contact" value="phone" required> Phone
    </label>
</fieldset>
```

---

## CSS Pseudo-classes for Validation

Style valid and invalid fields:

```css
/* Invalid field (after user interaction) */
input:invalid {
    border-color: red;
}

/* Valid field */
input:valid {
    border-color: green;
}

/* Required empty field (specific state) */
input:required:invalid {
    border-color: orange;
}

/* Optional valid field */
input:optional:valid {
    border-color: green;
}

/* Focused invalid field */
input:focus:invalid {
    outline-color: red;
}

/* In range (for number/date) */
input:in-range {
    background: #e8f5e9;
}

/* Out of range */
input:out-of-range {
    background: #ffebee;
}
```

### Better UX - Only Show After Interaction
```css
/* Don't show invalid on page load - wait for user interaction */
input:not(:placeholder-shown):invalid {
    border-color: red;
}

/* Or use :user-invalid (newer browsers) */
input:user-invalid {
    border-color: red;
}
```

---

## Complete Form Example

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        form { max-width: 400px; margin: 20px; }
        
        label { display: block; margin: 10px 0 5px; }
        
        input, select, textarea { 
            width: 100%; 
            padding: 8px; 
            border: 2px solid #ddd;
            border-radius: 4px;
        }
        
        input:valid, select:valid { border-color: green; }
        input:invalid, select:invalid { border-color: #ddd; }
        input:focus:invalid { border-color: red; }
        
        button { 
            margin-top: 15px; 
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
        
        .hint { 
            font-size: 12px; 
            color: #666; 
        }
    </style>
</head>
<body>
    <form action="/submit" method="post">
        <label for="fullname">Full Name *</label>
        <input type="text" id="fullname" name="fullname" 
               required minlength="2" maxlength="50"
               pattern="[A-Za-z\s]+"
               title="Letters and spaces only">
        
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required>
        
        <label for="phone">Phone</label>
        <input type="tel" id="phone" name="phone" 
               pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
               title="Format: 123-456-7890">
        <span class="hint">Format: 123-456-7890</span>
        
        <label for="age">Age *</label>
        <input type="number" id="age" name="age" 
               min="18" max="120" required>
        
        <label for="website">Website</label>
        <input type="url" id="website" name="website" 
               placeholder="https://example.com">
        
        <label for="country">Country *</label>
        <select id="country" name="country" required>
            <option value="">Select country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
        </select>
        
        <label for="password">Password *</label>
        <input type="password" id="password" name="password" 
               required minlength="8"
               pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
               title="Minimum 8 characters with uppercase, lowercase, and number">
        <span class="hint">8+ chars, uppercase, lowercase, number</span>
        
        <label for="bio">Bio (max 200 chars)</label>
        <textarea id="bio" name="bio" maxlength="200" rows="3"></textarea>
        
        <label>
            <input type="checkbox" name="terms" required>
            I agree to the terms *
        </label>
        
        <button type="submit">Register</button>
    </form>
</body>
</html>
```

---

## The novalidate Attribute

Disable HTML validation (for testing or when using JavaScript validation):

```html
<!-- Disable validation on form -->
<form novalidate>
    <input type="email" required>
    <button type="submit">Submit</button>
</form>

<!-- Disable for a specific button -->
<button type="submit" formnovalidate>Skip Validation</button>
```

---

## Summary

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `required` | Field is mandatory | `<input required>` |
| `type` | Built-in validation | `type="email"` |
| `pattern` | Custom regex pattern | `pattern="[A-Z]{2,}"` |
| `minlength` | Minimum characters | `minlength="3"` |
| `maxlength` | Maximum characters | `maxlength="100"` |
| `min` | Minimum value | `min="0"` |
| `max` | Maximum value | `max="100"` |
| `step` | Valid increments | `step="0.5"` |
| `title` | Custom error hint | `title="Enter valid email"` |

### Benefits of HTML Validation
- No JavaScript required
- Works even if JS is disabled
- Consistent browser behavior
- Accessible by default
- Easy to implement

### Limitations
- Limited customization of error messages
- Can't validate complex logic (password match)
- Still need server-side validation

---

## Next Lesson

In the next lesson, we'll learn about **DOM Event-Based Validation** for more control over the validation process.
