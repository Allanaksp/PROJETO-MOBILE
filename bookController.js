const bookService = require('../services/bookService');

exports.createBook = async (req, res) => {
  try {
    const { title, author, description, status } = req.body;
    const coverImage = req.file ? req.file.path : null;  // Imagem da capa do livro
    const newBook = await bookService.createBook({ title, author, description, status, coverImage });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, status } = req.body;
    const coverImage = req.file ? req.file.path : null;  // Novo arquivo de imagem
    const updatedBook = await bookService.updateBook(id, { title, author, description, status, coverImage });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await bookService.deleteBook(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await bookService.getBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};
