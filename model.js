books = [
  {
    id: 1,
    name: "The Colour of Magic",
    borrowed: true,
    description: "The beginning of the hilarious and irreverent series that has more than 80 million copies worldwide, The Color of Magic is where we meet tourist Twoflower and wizard guide Ricewind, and follow them on their always-bizarre journeys.",
    authors: [
      {
        id: 1,
        first: "Terry",
        last: "Pratchett"
      }
    ]
  }
]

const defaultBook = {
  borrowed: false,
  authors: [],
  description: ""
}

const defaultAuthor = {}

const getNextId = (a) => {
  let max = 0;
  a.forEach(({id}) => max = (id > max ? id : max))
  return max + 1;
}

//books
const getBooks = () => {
  return books;
}

const getBook = (id) => {
  let ret = books.filter(({id:iid}) => iid == id)[0]
  if (ret === undefined) {
    throw "book not found"
  }
  return ret;
}

const assert$ = (error, yes) => {
  if (!yes) {
    throw error;
  }
}

const validateBook = (book) => {
  console.log(JSON.stringify(book))
  assert$("book name must be a string", typeof(book.name) == 'string')
  assert$("book description must be a string", typeof(book.description == 'string'))
  assert$("book borrowed status must be a boolean"+`${typeof(book.borrowed)}`, typeof(book.borrowed) == 'boolean')
  assert$("book name must be <= 30 characters", book.name.length <= 30);
}

const createBook = (book) => {
  book = Object.assign(Object.assign({}, defaultBook), book)
  book.id = getNextId(books);
  validateBook(book);
  books.push(book);
}

const updateBook = (id, book) => {
  book = Object.assign(Object.assign({}, defaultBook), book)
  validateBook(book);
  assert$("book path id must match book body id", book.id == id)
  let newbooks = books.filter(({id: iid}) => iid != id)
  newbooks.push(book);
  books = newbooks;
}

const deleteBook = (id) => {
  let newbooks = books.filter(({id: iid}) => iid != id)
  books = newbooks;
}

//authors
const getAuthors = (bookId) => {
  const book = getBook(bookId);
  return book.authors;
}

const getAuthor = (bookId, id) => {
  const book = getBook(bookId);
  let ret = book.authors.filter(({id:iid}) => iid == id)[0]
  if (ret === undefined) {
    throw "author not found"
  }
  return ret;
}

const validateAuthor = (author) => {
  assert$("author first name must be a string", typeof(book.first) == 'string')
  assert$("author last name must be a string", typeof(book.last) == 'string')
}

const createAuthor = (bookId, author) => {
  const book = getBook(bookId);

  author = Object.assign(Object.assign({}, defaultAuthor), author);
  author.id = getNextId(book.authors);
  validateAuthor(author);
  book.authors.push(author);
  updateBook(bookId, book);

  return author;
}

const updateAuthor = (bookId, id, author) => {
  const book = getBook(bookId);

  author = Object.assign(Object.assign({}, defaultAuthor), author);
  validateAuthor(author);
  assert$("author path id must match author body id", author.id == id)
  let newauthors = book.authors.filter(({id: iid}) => iid != id)
  newauthors.push(author);
  book.authors = newauthors;
  updateBook(bookId, book);
}

const deleteAuthor = (bookId, id) => {
  const book = getBook(bookId);

  let newauthors = book.authors.filter(({id: iid}) => iid != id)
  book.authors = newauthors;

  updateBook(bookId, book);
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
}
