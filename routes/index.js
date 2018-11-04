var express = require('express');
var router = express.Router();
var model = require('model');

router.get('/books', (req, res) => {
  res.status(200).json(model.getBooks());
})
router.get('/books/:id', (req, res) => {
  try {
    res.status(200).json(model.getBook(req.params.id));
  } catch (err) {
    res.status(404).send("Not found");
  }
})
router.post('/books', (req, res) => {
  try {
    let result = model.createBook(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send("failed");
  }
})
router.put('/books/:id', (req, res) => {
  try {
    let result = model.updateBook(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send("failed");
  }
})
router.delete('/books/:id', (req, res) => {
  try {
    model.deleteBook(req.params.id);
    res.status(200);
  } catch (err) {
    res.status(404).send("not found");
  }
})

router.get('/books/:bid/authors', (req, res) => {
  res.status(200).json(model.getAuthors(req.params.bid))
})
router.get('/books/:bid/authors/:id', (req, res) => {
  try {
    res.status(200).json(model.getAuthor(req.params.bid, req.params.id));
  } catch (err) {
    res.status(404).send("Not found");
  }
})
router.post('/books/:bid/authors', (req, res) => {
  try {
    let result = model.createAuthor(req.params.bid, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send("failed");
  }
})
router.put('/books/:bid/authors/:id', (req, res) => {
  try {
    let result = model.updateAuthor(req.params.bid, req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send("failed");
  }
})
router.delete('/books/:bid/authors/:id', (req, res) => {
  try {
    model.deleteAuthor(req.params.bid, req.params.id);
    res.status(200);
  } catch (err) {
    res.status(404).send("not found");
  }
})


module.exports = router;
