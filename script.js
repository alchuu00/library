const newBookModal = document.getElementById('new-book-modal');
const newBookBtn = document.getElementById('new-book-btn');
const submit = document.querySelector('form');
const bookList = document.querySelector('.book-list');

const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

function Book(title, author, pages, imageURL, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.imageURL = imageURL;
  this.read = read;
}

const myBook = new Book(
  'To Kill a Mockingbird',
  'Harper Lee',
  281,
  'https://cdn.penguin.co.uk/dam-assets/books/9780434020485/9780434020485-jacket-large.jpg',
  false
);
myLibrary.push(myBook);

function render() {
  bookList.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.classList.add('flip-card');

    const frontCard = document.createElement('div');
    frontCard.classList.add('flip-card-front');
    bookDiv.appendChild(frontCard);

    const backCard = document.createElement('div');
    backCard.classList.add('flip-card-back');
    bookDiv.appendChild(backCard);

    const image = document.createElement('img');
    image.setAttribute('src', `${book.imageURL}`);
    frontCard.appendChild(image);

    const title = document.createElement('h2');
    title.textContent = book.title;
    backCard.appendChild(title);

    const author = document.createElement('p');
    author.textContent = `${book.author}`;
    backCard.appendChild(author);

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;
    backCard.appendChild(pages);

    const readContainer = document.createElement('div');
    readContainer.setAttribute('class', 'container-read');
    backCard.appendChild(readContainer);
    readContainer.style.backgroundColor = book.read ? '#a1ff9e' : '#ff5151';

    const readStatus = document.createElement('p');
    readStatus.textContent = 'Read: ';
    readContainer.appendChild(readStatus);

    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.textContent = book.read ? 'Yes' : 'No';
    readContainer.addEventListener('click', () => {
      book.read = !book.read;
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      render();
    });
    readContainer.appendChild(toggleReadBtn);

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'remove-btn');
    removeBtn.textContent = '🗑️';
    removeBtn.addEventListener('click', () => {
      if (window.confirm('are you sure you want to delete this book?')) {
        myLibrary.splice(index, 1);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        render();
      } else {
        render();
      }
    });
    backCard.appendChild(removeBtn);

    bookList.appendChild(bookDiv);
  });
}

function addBookToLibrary() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  let imageURL = document.querySelector('#imageURL').value;
  if (imageURL === '') {
    imageURL =
      'https://2.bp.blogspot.com/-muVbmju-gkA/Vir94NirTeI/AAAAAAAAT9c/VoHzHZzQmR4/s1600/placeholder-image.jpg';
  }

  const newBook = new Book(title, author, pages, imageURL, read);
  myLibrary.push(newBook);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

newBookBtn.addEventListener('click', () => {
  if (newBookModal.classList.contains('hidden')) {
    newBookModal.classList.remove('hidden');
  } else {
    newBookModal.classList.add('hidden');
  }
});

submit.addEventListener('submit', (event) => {
  event.preventDefault();
  newBookModal.classList.add('hidden');
  addBookToLibrary();
  location.reload();
});

window.addEventListener('load', () => {
  if (localStorage.getItem('myLibrary')) {
    render();
  }
});
