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

function createCard(value) {
  let card = document.createElement('div');
  card.innerHTML = `<p>Name : ${value.name}</p>
      <p>
        Author : ${value.author}
      </p>
      <p>
        Pages : ${value.pages}
      </p>
      <p>
        Category : ${value.category}
      </p>`;
  card.classList.add('book-card');

  wrapper.appendChild(card);
}

function createBook() {
  bookArray[index] = new books(bookName.value, bookAuthor.value, bookCategory.value, bookPages.value);
  console.log(bookArray[index]);
  bookArray[index].addCategory();
  createCard(bookArray[index]);
  
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
