const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Path to our JSON database
const DB_FILE = path.join(__dirname, 'db.json');

// Helper function to load data
function loadData() {
    const dataBuffer = fs.readFileSync(DB_FILE);
    return JSON.parse(dataBuffer.toString());
}

// Helper function to save data
function saveData(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

/* 
  =============
  BOOKS ROUTES
  =============
*/

// Get all books
app.get('/books', (req, res) => {
    const data = loadData();
    let books = data.books;

    const descriptionFilter = req.query.description;
    if (descriptionFilter) {
        // Filter if the book's description includes the substring
        books = books.filter(c =>
            c.description.toLowerCase().includes(descriptionFilter.toLowerCase())
        );
    }

    res.json(books);
});

// Get a book by ID
app.get('/books/:id', (req, res) => {
    const data = loadData();
    const bookId = parseInt(req.params.id, 10);
    const book = data.books.find(c => c.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Add a new book
app.post('/books', (req, res) => {
    const data = loadData();
    const newBook = req.body;
    // Simple ID generation if needed
    newBook.id = Date.now();
    data.books.push(newBook);
    saveData(data);
    res.status(201).json(newBook);
});

/* 
  =============
  STUDENTS ROUTES
  =============
*/

// Get all members
app.get('/members', (req, res) => {
    const data = loadData();
    res.json(data.members);
});

// Add a new member
app.post('/members', (req, res) => {
    const data = loadData();
    const newMember = req.body;
    // Simple ID generation
    newMember.id = Date.now();
    data.members.push(newMember);
    saveData(data);
    res.status(201).json(newMember);
});

// Add a book to a member's enrolledBooks
app.post('/members/:memberId/books', (req, res) => {
    const data = loadData();
    const memberId = parseInt(req.params.memberId, 10);
    const member = data.members.find(s => s.id === memberId);

    if (!member) {
        return res.status(404).json({ error: 'Member not found' });
    }

    const { bookId } = req.body;
    // Check if the book exists
    const bookExists = data.books.some(c => c.id === bookId);
    if (!bookExists) {
        return res.status(404).json({ error: 'Book not found' });
    }

    // Add bookId to enrolledBooks if not already there
    if (!member.enrolledBooks.includes(bookId)) {
        member.enrolledBooks.push(bookId);
        saveData(data);
    }

    res.status(200).json(member);
});

// Get all members for a given book
app.get('/books/:id/members', (req, res) => {
    const data = loadData();
    const bookId = parseInt(req.params.id, 10);

    const enrolledMembers = data.members.filter((member) =>
        member.enrolledBooks && member.enrolledBooks.includes(bookId)
    );

    res.json(enrolledMembers);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});