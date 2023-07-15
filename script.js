

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
let searchInput=  document.getElementById('search-input')

searchInput.addEventListener('focus',function(){
  searchInput.style.outline = 'none';
})

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


//fetch 

//  toggle function for the visibility of book details
function toggleBookDetails(bookDetailsItem) {
  bookDetailsItem.classList.toggle('active');
}

// Fetch
function fetchBookDetails() {
  fetch('https://api.itbook.store/1.0/search/mongodb')
    .then(response => response.json())
    .then(data => {
      // Extract the list of books from the response
      const books = data.books;

      //  HTML elements
      const bookList = document.getElementById('book-list');
      books.forEach(book => {
        const bookListItem = document.createElement('div');
        bookListItem.classList.add('book-item');
        bookListItem.innerHTML = `
          <p class="book-title">Title: ${book.title}</p>
          <p class="book-subtitle">Subtitle: ${book.subtitle}</p>
        `;

        // Create HTML elements for book details
        const bookDetails = document.getElementById('book-details');
        const bookDetailsItem = document.createElement('div');
        bookDetailsItem.classList.add('book-details');
        bookDetailsItem.innerHTML = `
          <img src="${book.image}" alt="${book.title} cover" />
          <p>Price: ${book.price}</p>
          <p>ISBN: ${book.isbn13}</p>
        `;

        // Event listener to show/hide book details on click
        bookListItem.addEventListener('click', () => {
          toggleBookDetails(bookDetailsItem);
        });

        // Append book list item to book list container
        bookList.appendChild(bookListItem);
        bookList.appendChild(bookDetailsItem);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// calling the function to fetch books
fetchBookDetails();



let formElement = document.getElementById('addbook-form');

formElement.addEventListener('submit', function(event){
  event.preventDefault();
  let errors = {};

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

     for (let item in errors){
        let errorText = document.getElementById('error-'+ item);

        if(errorText){
            errorText.innerText = errors[item];
        }
    }

    if (Object.keys(errors).length == 0) {
        const bookList = document.getElementById('book-list');
        const bookListItem = document.createElement('div');
        bookListItem.classList.add('book-item');
        bookListItem.innerHTML = `
          <p class="book-title">Title: ${titleField}</p>
          <p class="book-subtitle">Subtitle: ${subtitleField}</p>
        `;
        bookList.appendChild(bookListItem);

        formElement.reset();
    }
});


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