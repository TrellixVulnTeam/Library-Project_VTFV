'use strict';

const bookshelf = document.querySelector('#js-bookshelf');
let library = localStorage.getItem('storedLibrary') ? JSON.parse(localStorage.getItem('storedLibrary')) : [];
let removeBtn;

function Book(title, author, pagesTotal, haveRead, id) {
    this.title = title;
    this.author = author;
    this.pagesTotal = pagesTotal;
    this.haveRead = haveRead;
    // should I made it a method?? Ok, I'll deal with it later
    this.id = id;
}

function addNewBook() {
    
    const entry = new Book(document.querySelector('#js-title').value, 
    document.querySelector('#js-author').value, 
    document.querySelector('#js-pages-total').value, 
    document.querySelector('#js-have-read').checked ? 'read' : 'not read yet',
    `id${Date.now()}`); /* shit, I spend 20 minutes trying to figure out why the hell the id returns undefined and then I realized that I was typing it behind the closing parentheses*/ 
    
    library.push(entry);
    localStorage.setItem('storedLibrary', JSON.stringify(library));
}

/* 
did you know that when you use the appendChild method to move a child from one parent element to another, you actually moving it, i. e. removing from one parent and moving it to another, and not just cloning it! I had no idea, wow. It's actually really neat and makes total sense! Like, if a child was cloned, which parent would it inherit from (it can't have two parents, according to the spec, poor thing)? Which parent would be referenced? What about possible duplicated IDs? What about the deep cloning? Shit, now I'm reading about the place of Event interface in the DOM hierarchy, like, I have a function to write but this stuff is just so captivating :( I'm fucking hopeless 
*/



function showBookCard(obj) {
    const article = document.createElement('article');
    bookshelf.appendChild(article);
    article.setAttribute('id', obj.id);

    removeBtn = document.createElement('button');
    article.appendChild(removeBtn);
    removeBtn.textContent = 'x';
    //why can't I access the property using this keyword? Test it later

    for (const [key, value] of Object.entries(obj)) {
        const p = article.appendChild(document.createElement('p'));
        p.textContent = `${key}: ${value}`;
    }

    article.lastChild.hidden = true; 

    removeBtn.addEventListener('click', (e) => {
        removeBookCard(e);
    })

    function removeBookCard(e) {
        //library.splice(obj);
        console.log(library[Object.values(obj).includes(e.target.parentElement.id)]);
        //console.log(library.includes(obj));
        e.target.parentElement.remove();
    }   
    console.dir(library);
}

const addBookBtn = document.querySelector('#js-add-btn');
const submitBookBtn = document.querySelector('#js-submit-book-card');
//const removeBookBtn = document.querySelector('')


addBookBtn.addEventListener('click', () => {
    // show a form to add a new book 
    document.querySelector('#js-new-book-card').style.display = 'block';
});

submitBookBtn.addEventListener('click', () => {
    addNewBook();

    const inputFields = Array.from(document.querySelector('#js-new-book-card').querySelectorAll('input'));

    // clear input fields after creating a new book card
    inputFields.forEach(i => i.value = '');
    document.querySelector('#js-have-read').checked = false;
    document.querySelector('#js-new-book-card').style.display = 'none';

    // show the last added book
    showBookCard(library[library.length-1]);
});

