const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/library')
  .then(() => console.log('Connected to MongoDB (Backup)'))
  .catch(err => console.error('MongoDB connection error (Backup):', err));

const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  publicationDate: String,
  author: String,
  genre: String,
  publisher: String,
  language: String
});
const Book = mongoose.model('Book', bookSchema);

const readerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  gender: String,
  birthday: String,
  height: Number,
  weight: Number,
  employment: String
});
const Reader = mongoose.model('Reader', readerSchema);


app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json({ message: 'Book added!' });
});

app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.put('/books', async (req, res) => {
  const { id, ...updateData } = req.body;
  await Book.updateOne({ id: id }, { $set: updateData });
  res.json({ message: 'Book updated!' });
});

app.delete('/books', async (req, res) => {
  const { id } = req.body;
  await Book.deleteOne({ id: id });
  res.json({ message: 'Book removed!' });
});

app.get('/books/search', async (req, res) => {
  const { id, title } = req.query;
  const books = await Book.find({ $or: [{ id: id }, { title: title }] });
  res.json(books);
});

app.get('/books/sort', async (req, res) => {
  const { by } = req.query;
  const sortQuery = by === 'title' ? { title: 1 } : { publicationDate: 1 };
  const books = await Book.find().sort(sortQuery);
  res.json(books);
});

app.post('/readers', async (req, res) => {
  const reader = new Reader(req.body);
  await reader.save();
  res.json({ message: 'Reader added!' });
});

app.put('/readers', async (req, res) => {
  const { id, ...updateData } = req.body;
  await Reader.updateOne({ id: id }, { $set: updateData });
  res.json({ message: 'Reader updated!' });
});

app.delete('/readers', async (req, res) => {
  const { id } = req.body;
  await Reader.deleteOne({ id: id });
  res.json({ message: 'Reader removed!' });
});

app.get('/readers', async (req, res) => {
  const readers = await Reader.find();
  res.json(readers);
});

app.get('/readers/search', async (req, res) => {
  const { id, name } = req.query;
  const readers = await Reader.find({ $or: [{ id: id }, { name: name }] });
  res.json(readers);
});

app.listen(PORT, () => {
  console.log(`Backup server running on http://localhost:${PORT}`);
});
