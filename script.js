const newBookModal = document.getElementById('new-book-modal');
const newBookBtn = document.getElementById('new-book');
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

function render() {
  bookList.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const title = document.createElement('h2');
    title.textContent = book.title;
    bookDiv.appendChild(title);

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;
    bookDiv.appendChild(author);

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;
    bookDiv.appendChild(pages);

    const image = document.createElement('img');
    image.setAttribute('src', `${book.imageURL}`);
    bookDiv.appendChild(image);

    const readStatus = document.createElement('p');
    readStatus.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
    bookDiv.appendChild(readStatus);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      render();
    });
    bookDiv.appendChild(removeBtn);

    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.textContent = 'Toggle Read Status';
    toggleReadBtn.addEventListener('click', () => {
      book.read = !book.read;
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
      render();
    });
    bookDiv.appendChild(toggleReadBtn);

    bookList.appendChild(bookDiv);
  });
}

function addBookToLibrary() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const imageURL = document.querySelector('#imageURL').value;
  const read = document.querySelector('#read').checked;
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

myLibrary.forEach((book) => {
  console.log(book);
});
