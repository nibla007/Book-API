// create a subrouter for authors
import Router from "express"
const authorsRouter = Router()

// import mongoose and Schema so we can create schemas and query our collection
import mongoose, { Schema } from "mongoose"

// create author Schema (field definitions)
const authorSchema = new Schema({
  name: String,
  age: Number,
  email: String,
})

// create collection model
export const Author = mongoose.model('authors', authorSchema)

// POST Request
authorsRouter.post('/', async (request, response) => {
  try {
    const author = new mongoose.models.authors();
    author.name = request.body.name;
    author.age = request.body.age;
    author.email = request.body.email;
    const result = await author.save();
    response.status(201).json(result);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET Request
authorsRouter.get('/', async (request, response) => {
  try {
    const filters = {};
    ['name', 'age', 'email'].forEach(key => {
      if (request.query[key]) {
        filters[key] = request.query[key];
      }
    });
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [authors, totalCount] = await Promise.all([
      mongoose.models.authors.find(filters).limit(limit).skip(skip),
      mongoose.models.authors.countDocuments(filters),
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    response.setHeader('X-Total-Count', totalCount);
    response.setHeader('X-Current-Page', page);
    response.setHeader('X-Total-Pages', totalPages);
    response.status(200).json(authors);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET Request by id
authorsRouter.get('/:id', async (request, response) => {
  try {
    const authorId = request.params.id;
    const author = await mongoose.models.authors.findById(authorId);

    if (!author) {
      return response.status(404).json({ error: 'Author not found' });
    }

    response.status(200).json(author);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT Request
authorsRouter.put('/:id', async (request, response) => {
  try {
    const updatedAuthor = await mongoose.models.authors.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    if (!updatedAuthor) {
      return response.status(404).json({ error: 'Author not found' });
    }
    response.status(200).json({ message: 'Author updated successfully', updatedAuthor });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE Request
authorsRouter.delete('/:id', async (request, response) => {
  try {
    const deletedAuthor = await mongoose.models.authors.findByIdAndDelete(request.params.id);
    if (!deletedAuthor) {
      return response.status(404).json({ error: 'Author not found' });
    }
    response.status(204).json({ message: 'Author deleted successfully', deletedAuthor });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

export default authorsRouter;
