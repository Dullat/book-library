let wrapper = document.querySelector('.wrapper');
const creationDialog = document.querySelector('.creation-dialog');
const bookName = document.querySelector('#book-name');
const bookAuthor = document.querySelector('#author');
const bookCategory = document.querySelector('#created-category');
const bookPages = document.querySelector('#pages');
const categoryDialog = document.querySelector('.category-dialog');
const bookIndex = document.querySelector('.book-index');

const bookArray = [];
const category = [];
let index = 0;

function books(name, author, category, pages) {
  this.name = name;
  this.author = author;
  this.category = category;
  this.pages = pages;
}

books.prototype.addCategory = function() {
  category.push(this.category);
  console.log(category);
}

function openCreationDialog() {
  creationDialog.showModal();
}

function updateBook(eName, eAuthor, ePages, eCategory, index) {
  bookArray[index].name = eName;
  bookArray[index].author = eAuthor;
  bookArray[index].pages = ePages;
  bookArray[index].category = eCategory;
  console.log(bookArray[index], index);

  document.querySelectorAll('.edit-details').forEach(element => {
    element.setAttribute('disabled','');
    element.toggleAttribute('edit-mode');
  });
}

function createCard(value, index) {
  let card = document.createElement('div');
  card.innerHTML = `
      <div>
        <label for="e-name">Name:</label>
        <input type="text" value='${value.name}' class='edit-details' id="e-name" disabled>
      </div>
      <div>
        <label for="e-author">Author:</label>
        <input type="text" value='${value.author}' class='edit-details' id="e-author" disabled>
      </div>
      <div>
        <label for="e-pages">Pages:</label>
        <input type="text" value='${value.pages}' class='edit-details' id="e-pages" disabled>
      </div>
      <div>
        <label for="e-category">Category:</label>
        <input type="text" value='${value.category}' class='' id="e-category" disabled>
      </div>
      <div>
        <button class='edit' onclick='editBook();'>edit</button>
        <button class='update' onclick='updateBook(document.querySelector("#e-name").value,
        document.querySelector("#e-author").value,
        document.querySelector("#e-pages").value,
        document.querySelector("#e-category").value,
        ${index});'>update</button>
      </div
      `;
  card.classList.add('book-card');

  wrapper.appendChild(card);
}

function createBook() {
  bookArray[index] = new books(bookName.value, bookAuthor.value, bookCategory.value, bookPages.value);
  console.log(bookArray[index]);
  bookArray[index].addCategory();
  createCard(bookArray[index], index);
  
  index++;
  bookIndex.textContent = `total-books: ${index}`;
  creationDialog.close();
}

function addNewCategory(value){
  category.push(value);
  console.log(category);
  
  category.forEach(e => {
    let option = document.createElement('option');
    option.value = e;
    option.innerHTML = `${e}`;
    document.querySelector('#created-category').appendChild(option);
  });
}

function addCategory(create='no') {
  console.log(create);
  if(create === 'yes'){
    addNewCategory(document.querySelector('.new-category').value);
    categoryDialog.close();
  }else if(create === 'no'){
    categoryDialog.showModal();
  }
}

function clear() {
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }
}

function filterBook() {
  clear();
  bookArray.forEach((e) => {
    if (document.querySelector('.filter-search').value === e.name){
      createCard(e);
    }
  })
}

function showAll() {
  clear();
  bookArray.forEach((e) => {
    createCard(e);
  })
}

function showLast(){
  clear();
  createCard(bookArray[index - 1]);
}

function editBook() {
  // document.querySelectorAll('.edit-details').removeAttribute('disabled');
  document.querySelectorAll('.edit-details').forEach(element => {
    element.removeAttribute('disabled');
    element.toggleAttribute('edit-mode');
  });

  document.querySelector('.edit-details').focus();
}

function getEditIndex() {
  console.log(document.querySelectorAll('.edit'));
}
