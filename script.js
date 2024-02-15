const wrapper = document.querySelector('.wrapper');
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
let shouldUpdate = false;

function books(name, author, category, pages) {
  this.name = name;
  this.author = author;
  this.category = category;
  this.pages = pages;
}

books.prototype.addCategory = function() {
  category.push(this.category);
};

function openCreationDialog() {
  creationDialog.showModal();
}

function updateBook(eName, eAuthor, ePages, i) {
  bookArray[i].name = eName;
  bookArray[i].author = eAuthor;
  bookArray[i].pages = ePages;

  document.querySelectorAll(`.edit-details-${i}`).forEach(element => {
    element.setAttribute('disabled','');
    element.toggleAttribute('edit-mode');
  });
  console.log(bookArray);
  let btn = document.querySelector(`#update-btn-${i}`);
  btn.setAttribute('disabled','');
  btn.style.opacity = '0';
  document.querySelector(`.num-${i}`).style.opacity = '1';
}

function createCard(value, i) {
  let card = document.createElement('div');
  card.innerHTML = `
      <div>
        <label for="e-name">Name:</label>
        <input type="text" value='${value.name}' class='edit-details-${i}' id="e-name-${i}" disabled focusonit>
      </div>
      <div>
        <label for="e-author">Author:</label>
        <input type="text" value='${value.author}' class='edit-details-${i}' id="e-author-${i}" disabled>
      </div>
      <div>
        <label for="e-pages">Pages:</label>
        <input type="text" value='${value.pages}' class='edit-details-${i}' id="e-pages-${i}" disabled>
      </div>
      <div>
        <label for="e-category">Category:</label>
        <input type="text" value='${value.category}' class='' id="e-category-${i}" disabled>
      </div>
      <div>
        <button class='edit num-${i}' onclick='editBookBtn(${i});'>edit</button>
        <button class='update' id='update-btn-${i}'  style='opacity: 0;' disabled onclick='updateBook(document.querySelector("#e-name-${i}").value,
        document.querySelector("#e-author-${i}").value,
        document.querySelector("#e-pages-${i}").value,
        ${i});'>update</button>
      </div>
      `;
  card.classList.add('book-card');

  wrapper.appendChild(card);
}

function createBook() {
  bookArray[index] = new books(bookName.value, bookAuthor.value, bookCategory.value, bookPages.value);
  bookArray[index].addCategory();
  createCard(bookArray[index], index);
  
  index++;
  bookIndex.textContent = `total-books: ${index}`;
  creationDialog.close();
}

function addNewCategory(value){
  category.push(value);
  
  category.forEach(e => {
    let option = document.createElement('option');
    option.value = e;
    option.innerHTML = `${e}`;
    document.querySelector('#created-category').appendChild(option);
  });
}

function addCategory(create='no') {
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
  });
}

function showAll() {
  clear();
  bookArray.forEach((e) => {
    createCard(e);
  });
}

function showLast(){
  clear();
  createCard(bookArray[index - 1]);
}

function editBookBtn(i) {
  document.querySelectorAll(`.edit-details-${i}`).forEach(element => {
    element.removeAttribute('disabled');
    element.toggleAttribute('edit-mode');
    element.focus();
  });
  
  let btn = document.querySelector(`#update-btn-${i}`);
  btn.removeAttribute('disabled');
  btn.style.opacity = '1';
  document.querySelector(`.num-${i}`).style.opacity = '0';
}
