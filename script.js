//burger

let burgerBar = document.querySelector('.burger-bar');
let ulItems = document.querySelector('.nav-ul-items');

burgerBar.addEventListener('click', () =>{
    burgerBar.classList.toggle('active');
    ulItems.classList.toggle('active');
})

document.querySelectorAll('nav-a').forEach(item => item.addEventListener('click', function(){
    burgerBar.classList.remove('active');
 }))

//fetch

// Function to toggle the visibility of book details
function toggleBookDetails(bookDetailsItem) {
    bookDetailsItem.classList.toggle('active');
  }
  
  // Function to fetch book details and populate the list
  function fetchBookDetails() {
    fetch('https://api.itbook.store/1.0/books/9781617294136')
      .then(response => response.json())
      .then(data => {
        // Extract the required book details
        const { title, authors, year, image, desc, price, isbn13 } = data;
  
        // Create HTML elements for book list
        const bookList = document.getElementById('book-list');
        const bookListItem = document.createElement('div');
        bookListItem.classList.add('book-item');
        bookListItem.innerHTML = `
          <p>Title: ${title}</p>
          <p>Author: ${authors}</p>
          <p>Year: ${year}</p>
        `;
  
        // Create HTML elements for book details
        const bookDetails = document.getElementById('book-details');
        const bookDetailsItem = document.createElement('div');
        bookDetailsItem.classList.add('book-details');
        bookDetailsItem.innerHTML = `
          <img src="${image}" alt="${title} cover" />
          <p>Description: ${desc}</p>
          <p>Price: ${price}</p>
          <p>ISBN: ${isbn13}</p>
        `;
  
        // Event listener to show/hide book details on click
        bookListItem.addEventListener('click', () => {
          toggleBookDetails(bookDetailsItem);
        });
  
        // Append book list item to book list container
        bookList.appendChild(bookListItem);
        bookList.appendChild(bookDetailsItem);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Call the function to fetch book details and populate the list
  fetchBookDetails();
   


  