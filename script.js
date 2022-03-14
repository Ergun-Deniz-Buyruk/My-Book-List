// Book Class
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#tbody');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(targetElement) {
        if(targetElement.classList.contains('delete')) {
            targetElement.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.myContainer');
        const form = document.querySelector('#form');
        container.insertBefore(div, form);
        
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // Clear Fields
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instatiate book
        const book = new Book(title, author, isbn);

        // Add book to list.
        UI.addBookToList(book);

        // Add book to localStorage
        Store.addBook(book);

        // Show success message
        UI.showAlert('Book Added', 'success');

        // Clear fields
        UI.clearFields();
    }
});

// Event: Remove a Book
document.querySelector('#tbody').addEventListener('click', (e) => {
   // Remove from UI
    UI.deleteBook(e.target);

    // Removed Book from localStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show success message
    UI.showAlert('Book Removed', 'success');
});



/*

************************************************************************************
                        This is my first code. 
            It was working correctly but not very clean. I accept :)
************************************************************************************


var form = document.getElementById('form');
var table = document.getElementById('table');
var tbody = document.getElementById('tbody');

//Form Event
form.addEventListener('submit', addBook);

// Delete Button Event
table.addEventListener('click', removeBook);

// Add Book
function addBook(e) {
    e.preventDefault();

    if(document.getElementById('title').value != "" 
    && document.getElementById('author').value != "" 
    && document.getElementById('isbn').value != "") {
        // Create Table Data (td)
        var title = document.createElement('td');
        title.appendChild(document.createTextNode(document.getElementById('title').value));

        var author = document.createElement('td');
        author.appendChild(document.createTextNode(document.getElementById('author').value));

        var isbn = document.createElement('td');
        isbn.appendChild(document.createTextNode(document.getElementById('isbn').value));

        // create Button
        var deleteBtn = document.createElement('button');
        deleteBtn.className = "btn btn-danger btn-sm fw-bolder delete";
        deleteBtn.type = 'button';
        deleteBtn.appendChild(document.createTextNode('X'));

        // create td for delete button
        var deleteBtnTable = document.createElement('td');
        deleteBtnTable.appendChild(deleteBtn);

        // Create Table Row (tr)
        var tr = document.createElement('tr');
        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(isbn);
        tr.appendChild(deleteBtnTable);

        // Add table Row into tbody
        tbody.appendChild(tr);

        // Delete input's values
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    } else {
        alert("boss");
    }
}

// Remove Book
function removeBook(e) {
    if (e.target.classList.contains('delete')) {
        if(confirm('Are you sure?')) {
            var tr = e.target.parentElement.parentElement;
            tbody.removeChild(tr);
        }
    }
}
*/