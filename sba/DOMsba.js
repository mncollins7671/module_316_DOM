let books = [];
let currentFilter = 'all';
let nextId = 1;

// DOM Elements
const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const bookTemplate = document.getElementById('book-template');
const emptyMessage = document.getElementById('empty-message');

const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const bookDescriptionInput = document.getElementById('book-description');
const bookGenreInput = document.getElementById('book-genre');

const filterButtons = document.querySelectorAll('.filter-btn');
const bookCount = document.getElementById('book-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const descCount = document.getElementById('desc-count');
const addBookBtn = document.getElementById('add-book-btn');

function init() {
    setupEventListeners();
    loadBooksFromStorage();
    renderAllBooks();
    updateBookCount();
}

function setupEventListeners() {
    bookForm.addEventListener('submit', handleSubmit);
    bookList.addEventListener('click', handleBookClick);
    bookList.addEventListener('change', handleBookStatus);
    filterButtons.forEach(btn => btn.addEventListener('click', handleFilterClick));
    clearCompletedBtn.addEventListener('click', handleClearCompleted);
    bookDescriptionInput.addEventListener('input', updateCharCount);
    bookTitleInput.addEventListener('input', validateTitleInput);
}

function validateTitleInput() {

    const formGroup = bookTitleInput.parentNode;
    const errorMsg = formGroup.querySelector('.error-message');
    const value = bookTitleInput.value.trim();

    if (value.length === 0 || value.length === '' || value.length < 1) {
        showError(formGroup, errorMsg, 'Title cannot be empty');
        return false;
    } else if (value.length > 50) {
        showError(formGroup, errorMsg, 'Title cannot exceed 50 characters');
        return false;
    } else {
        showSuccess(formGroup, errorMsg);
        return true;
    }
}

function showError(formGroup, errorElement, message) {

    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function showSuccess(formGroup, errorElement) {

    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    errorElement.style.display = 'none';
}

function updateCharCount(event) {
    const count = event.target.value.length;
    descCount.textContent = count;

    const countElement = descCount.parentNode;
    countElement.classList.remove('warning', 'error');

    if (count > 280) {
        countElement.classList.add('warning');
    } else if (count > 300) {
        countElement.classList.add('error');
    }
}

// Event Handlers

function handleSubmit(event) {
    event.preventDefault();
    const titleValid = validateTitleInput({ target: bookTitleInput });

    if (!titleValid) {
        return;
    }

    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    const description = bookDescriptionInput.value.trim();
    const genre = bookGenreInput.value;

    const newBook = {
        id: nextId++,
        title: title,
        author: author,
        description: description,
        genre: genre,
        status: 'waiting',
        createdAt: new Date().toISOString()
    };

    books.push(newBook);
    saveBooksToStorage();
    renderAllBooks();
    updateBookCount();
    bookForm.reset();
    descCount.textContent = '0';
}

function handleBookClick(event) {
    const target = event.target;
    const bookItem = target.closest('.book-item');
    if (!bookItem) return;

    const bookId = parseInt(bookItem.dataset.id);

    if (target.classList.contains('btn-delete')) {
        deleteBook(bookId);
    }
    if (target.classList.contains('btn-edit')) {
        editBook(bookId);
    }
}

function handleBookStatus(event) {
    const target = event.target;
    const bookItem = target.closest('.book-item');
    if (!bookItem) return;

    const bookId = parseInt(bookItem.dataset.id);
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    if (target.classList.contains('waiting-checkbox')) {
        book.status = 'waiting';
    } else if (target.classList.contains('reading-checkbox')) {
        book.status = 'reading';
    } else if (target.classList.contains('complete-checkbox')) {
        book.status = 'complete';
    }
    saveBooksToStorage();
    renderAllBooks();
    updateBookCount();
}

function handleFilterClick(event) {
    const button = event.target;
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    currentFilter = filter;
    applyFilter(filter);
    updateBookCount();
}

function handleClearCompleted() {
    books = books.filter(book => book.status !== 'completed');

    saveBooksToStorage();
    renderAllBooks();
    updateBookCount();

    if (books.length === 0) {
        alert('All books cleared!');
    }
}

function deleteBook(bookId) {
    if (!confirm('Are you sure you want to delete this book?')) {
        return;
    }
    books = books.filter(b => b.id !== bookId);
    saveBooksToStorage();
    renderAllBooks();
    updateBookCount();
}

function editBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    bookTitleInput.value = book.title;
    bookAuthorInput.value = book.author === 'Unknown Author' ? '' : book.author;
    bookDescriptionInput.value = book.description;
    bookGenreInput.value = book.genre;

    descCount.textContent = book.description.length;

    books = books.filter(b => b.id !== bookId);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    bookTitleInput.focus();

    saveBooksToStorage();
    renderAllBooks();
    updateBookCount();
}

function renderBook(book) {
    const bookElement = bookTemplate.contentEditable.cloneNode(true);
    const bookItem = bookElement.querySelector('.book-item');
    bookItem.dataset.id = book.id;

    if (book.status === 'complete') {
        bookItem.classList.add('complete');
    }

    const titleElement = bookElement.querySelector('.book-title');
    const authorElement = bookElement.querySelector('.book-author');
    const descriptionElement = bookElement.querySelector('.book-description');
    const genreBadge = bookElement.querySelector('.book-genre-badge');

    titleElement.textContent = book.title;
    authorElement.textContent = `by ${book.author}`;
    descriptionElement.textContent = book.description || 'No description provided.';

    if (book.genre) {
        const genreEmojis = {
            'romance': '💕',
            'fantasy': '🐉',
            'mystery': '🔍',
            'science-fiction': '🚀',
            'self-help': '📚',
            'horror': '👻',
            'biography': '📖',
            'historical': '🏛️',
            'non-fiction': '📰',
            'other': '📕'
        };
        genreBadge.innerHTML = `${genreEmojis[book.genre] || '📕'} ${book.genre}`;
        genreBadge.style.display = 'inline-block';
    } else {
        genreBadge.style.display = 'none';
    }

    const waitingCheckbox = bookElement.querySelector('.waiting-checkbox');
    const readingCheckbox = bookElement.querySelector('.reading-checkbox');
    const completeCheckbox = bookElement.querySelector('.complete-checkbox');

    waitingCheckbox.checked = book.status === 'waiting';
    readingCheckbox.checked = book.status === 'reading';
    completeCheckbox.checked = book.status === 'complete';

    bookList.appendChild(bookElement);
}

function renderAllBooks() {
    bookList.innerHTML = '';

    if (books.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        books.forEach(book => {renderBook(book)});
    }
    applyFilter(currentFilter);
}

function applyFilter(filter) {
    const bookItems = document.querySelectorAll('.book-item');
    bookItems.forEach(item => {
        const bookId = parseInt(item.dataset.id);
        const book = books.find(b => b.id === bookId);
        if(!book) return;

        if (filter === 'all') {
            item.classList.remove('hidden');
        } else if (filter === 'reading' && book.status === 'reading') {
            item.classList.remove('hidden');
        } else if (filter === 'waiting' && book.status === 'waiting') {
            item.classList.remove('hidden');
        } else if (filter === 'completed' && book.status === 'complete') {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

function updateBookCount() {
    let count = 0;
    if (currentFilter === 'all') {
        count = books.length;
    } else if (currentFilter === 'reading') {
        count = books.filter(b => b.status === 'reading').length;
    } else if (currentFilter === 'waiting') {
        count = books.filter(b => b.status === 'waiting').length;
    } else if (currentFilter === 'completed') {
        count = books.filter(b => b.status === 'complete').length;
    }
    bookCount.textContent = `Books: ${count}`;
}

// Local Storage

function saveBooksToStorage() {
    try {
        localStorage.setItem('readingListBooks', JSON.stringify(books));
        localStorage.setItem('readingListNextId', nextId.toString());
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadBooksFromStorage() {
    try {
        const savedBooks = localStorage.getItem('readingListBooks');
        const savedNextId = localStorage.getItem('readingListNextId');
        
        if (savedBooks) {
            books = JSON.parse(savedBooks);
        }
        
        if (savedNextId) {
            nextId = parseInt(savedNextId);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        books = [];
        nextId = 1;
    }
}

document.addEventListener('DOMContentLoaded', init);
