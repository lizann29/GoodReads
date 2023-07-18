
//burger
let burgerBar = document.querySelector('.burger-bar');
let ulItems = document.querySelector('.nav-ul-items');

burgerBar.addEventListener('click', () => {
  burgerBar.classList.toggle('active');
  ulItems.classList.toggle('active');
});

document.querySelectorAll('.nav-a').forEach(item => {
  item.addEventListener('click', () => {
    burgerBar.classList.remove('active');
  });
});



// search bar
function searchBooks(query) {
  const bookItems = document.querySelectorAll('.book-item');

  bookItems.forEach(bookItem => {
    const title = bookItem.querySelector('.book-title').textContent.toLowerCase();
    const subtitle = bookItem.querySelector('.book-subtitle').textContent.toLowerCase();

    if (title.includes(query) || subtitle.includes(query)) {
      bookItem.style.display = 'block';
    } else {
      bookItem.style.display = 'none';
    }
  });
}

let searchInput = document.getElementById('search-input')

searchInput.addEventListener('focus', function () {
  searchInput.style.outline = 'none';
});

//  search button 
document.getElementById('search-btn').addEventListener('click', () => {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value.trim().toLowerCase();
  searchBooks(query);
});

// search input enter key press
document.getElementById('search-input').addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim().toLowerCase();
    searchBooks(query);
  }
});

// to toggle the visibility of book details
function toggleBookDetails(bookDetailsItem) {
  bookDetailsItem.classList.toggle('active');
}



// Fetch 
function fetchBookDetails() {
  fetch('https://api.itbook.store/1.0/search/mongodb')
    .then(response => response.json())
    .then(data => {
      const books = data.books;
      const bookList = document.getElementById('book-list');

      books.forEach(book => {
        const bookListItem = document.createElement('div');
        bookListItem.classList.add('book-item');
        bookListItem.innerHTML = `
          <p class="book-title">Title: ${book.title}</p>
          <p class="book-subtitle">Subtitle: ${book.subtitle}</p>
        `;

        const bookDetailsItem = document.createElement('div');
        bookDetailsItem.classList.add('book-details');
        bookDetailsItem.innerHTML = `
          <img src="${book.image}" alt="${book.title} cover" />
          <p>Price: ${book.price}</p>
          <p>ISBN: ${book.isbn13}</p>
        `;

        bookListItem.addEventListener('click', () => {
          toggleBookDetails(bookDetailsItem);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        bookListItem.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          deleteBook(bookListItem);
        });

        bookList.appendChild(bookListItem);
        bookList.appendChild(bookDetailsItem);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//  delete fetched a book
function deleteBook(bookItem) {
  const bookList = document.getElementById('book-list');
  bookList.removeChild(bookItem);
}

// calling the function to fetch books
fetchBookDetails();

//toggle the visibility
function toggleBookDetails(bookDetailsItem) {
  bookDetailsItem.classList.toggle('active');
}

// customer-added books
function booksByCostumer(title, subtitle) {
  const bookListItem = document.createElement('div');
  bookListItem.classList.add('book-item', 'customer-added');
  bookListItem.innerHTML = `
    <p class="book-title">Title: ${title}</p>
    <p class="book-subtitle">Subtitle: ${subtitle}</p>
    <button class="delete-btn">Delete</i></button>
  `;

  // Event listener to show/hide book details on click
  bookListItem.addEventListener('click', () => {
    const bookDetailsItem = bookListItem.nextElementSibling;
    toggleBookDetails(bookDetailsItem);
  });

  // Event listener for the delete button
  const deleteBtn = bookListItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    deleteBook(bookListItem);
  });

  return bookListItem;
}

// customer-added books -- need to finish
function submitedBooks(event) {
  event.preventDefault();
  const formElement = event.target;
  const errors = {};

  let titleField = document.getElementById('title-field').value;

  if (titleField.trim() === "" || titleField.length < 2){
     errors.title = "Title cannot be empty and must be at least 2 characters";
 }

 let subtitleField = document.getElementById('subtitle-field').value;

  if (subtitleField.trim() === "" || subtitleField.length < 2){
     errors.subtitle = "Subtitle cannot be empty and must be at least 2 characters";
 }

 let isbnElement = document.getElementById('isbn-input').value;

  if (isbnElement.trim() === "" || isbnElement.length < 13){
   errors.isbn = "ISBN field should not be empty and should be at least 13 characters";
  }

  let priceElement = document.getElementById('price-input').value;

  if (priceElement.trim() === ""){
   errors.price = "Price field should not be empty";
  }
  
  let photoElement = document.getElementById('photo-input').value;

  if (photoElement.trim() === ""){
   errors.photo = "Please upload the photo of the book";
  }
  
  for (let item in errors) {
    let errorText = document.getElementById('error-' + item);

    if (errorText) {
      errorText.innerText = errors[item];
    }
  }


  if (Object.keys(errors).length === 0) {
    const bookList = document.getElementById('book-list');
    const titleField = document.getElementById('title-field').value;
    const subtitleField = document.getElementById('subtitle-field').value;

    // checking if the book is already added --- ?????
    const existingBooks = document.querySelectorAll('.customer-added');
    const bookAlreadyAdded = Array.from(existingBooks).find(
      book =>
        book.querySelector('.book-title').textContent.toLowerCase() ===
          titleField.toLowerCase() &&
        book.querySelector('.book-subtitle').textContent.toLowerCase() ===
          subtitleField.toLowerCase()
    );

    if (bookAlreadyAdded) {
      alert('This book is already in the list.');
      return; // Stop further execution
    }

    // Create a customer-added book item
    const bookItem = booksByCostumer(titleField, subtitleField);
    bookList.appendChild(bookItem);

    formElement.reset();
  }
}

const addBookForm = document.getElementById('addbook-form');
addBookForm.addEventListener('submit', submitedBooks);

//email
let emailField = document.getElementById("email-field");
let textEmail = document.getElementById("error-email");

emailField.addEventListener("input", function () {
  let emailFieldValue = emailField.value;
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailFieldValue.match(regex)) {
    textEmail.innerText = "Your email is valid";
    textEmail.style.color = "green";
    emailField.style.outline = "none";
    emailField.style.border = "2px solid green";
  } else {
    textEmail.innerText = "Invalid email format";
    textEmail.style.color = "red";
    emailField.style.outline = "none";
    emailField.style.border = "2px solid red";
  }

  if (emailFieldValue === "") {
    textEmail.innerText = "";
    emailField.style.border = '2px solid beige';
  }
});

emailField.addEventListener('focus',function(){
  emailField.style.outline = 'none';
})
