//Book Class: Represents a Book

class Book {
  constructor(title, author, isbn) {
    (this.title = title), (this.author = author), (this.isbn = isbn);
  }
}

//UI Class: Handle UI Tasks

class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "3488829384",
      },
      {
        title: "Book Two",
        author: "Jane Doe",
        isbn: "3489901029384",
      },
    ];

    const books = StoredBooks;

    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    //Vanish in 3 sec
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

//Store Class: Handles Storage

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Getting values from inputs
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //Validation
  if (title === "" || author === "" || isbn === "") {
    //Showing fail message
    const message = "Please fill in all the fields";
    const classList = "danger";
    UI.showAlert(message, classList);
  } else {
    //Showing success message
    const message = "Success on adding new book";
    const classList = "success";
    UI.showAlert(message, classList);

    //Book instantiation
    const book = new Book(title, author, isbn);

    UI.addBookToList(book);

    //Clear input fields on submit
    UI.clearFields();
  }
});

//Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  const message = "Book removed";
  const classList = "warning";
  UI.showAlert(message, classList);
});
