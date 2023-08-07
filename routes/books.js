// create a subrouter for books
import Router from "express"
const booksRouter = Router()

// import mongoose and Schema so we can create schemas and query our collection
import mongoose, { Schema } from "mongoose"

// create book Schema (field definitions)
const bookSchema = new Schema({
  title: String,
  genre: String,
  released: Number,
  rating: String,
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "authors" }
})

// create collection model
export const Books = mongoose.model('books', bookSchema)

// POST Request
booksRouter.post('/', async (request, response) => {
  try {
    const book = new mongoose.models.books();
    book.title = request.body.title;
    book.genre = request.body.genre;
    book.released = request.body.released;
    book.rating = request.body.rating;
    book.description = request.body.description;
    book.author = request.body.author;
    const result = await book.save();
    response.status(201).json(result);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET Request
booksRouter.get('/', async (request, response) => {
  try {
    const filters = {};
    ['title', 'genre', 'name'].forEach(key => {
      if (request.query[key]) {
        filters[key] = request.query[key];
      }
    });
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [books, totalCount] = await Promise.all([
      mongoose.models.books.find(filters).limit(limit).skip(skip),
      mongoose.models.books.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    response.setHeader('X-Total-Count', totalCount);
    response.setHeader('X-Current-Page', page);
    response.setHeader('X-Total-Pages', totalPages);

    response.status(200).json(books);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET Request by id
booksRouter.get('/:id', async (request, response) => {
  try {
    const bookId = request.params.id;
    const book = await mongoose.models.books.findById(bookId);

    if (!book) {
      return response.status(404).json({ error: 'Book not found' });
    }

    response.status(200).json(book);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT Request
booksRouter.put('/:id', async (request, response) => {
  try {
    const updatedBook = await mongoose.models.books.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );

    if (!updatedBook) {
      return response.status(404).json({ error: 'Book not found' });
    }

    response.status(200).json({ message: 'Book updated successfully', updatedBook });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE Request
booksRouter.delete('/:id', async (request, response) => {
  try {
    const deletedBook = await mongoose.models.books.findByIdAndDelete(request.params.id);

    if (!deletedBook) {
      return response.status(404).json({ error: 'Book not found' });
    }

    response.status(204).json({ message: 'Book deleted successfully', deletedBook });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

export default booksRouter