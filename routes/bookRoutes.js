const express = require('express');
const multer = require('multer');
const bookController = require('../controllers/bookController');

// Configuração de upload de arquivos (imagens)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});
const upload = multer({ storage });

const router = express.Router();

router.post('/books', upload.single('coverImage'), bookController.createBook);
router.put('/books/:id', upload.single('coverImage'), bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);
router.get('/books', bookController.getBooks);

module.exports = router;
