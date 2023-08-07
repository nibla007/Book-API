// faker random data api
import { faker } from '@faker-js/faker';

// mongoose database connector & ODM for mongodb
import mongoose from 'mongoose'
const connection = "mongodb+srv://albin:T9sNnMwhwlLp0MK0@bookcluster.yx5xwk2.mongodb.net/test"

import { Author } from './routes/authors.js'

let authorArray = []
let books = []

async function run() {
  // connect to db
  mongoose.connect(connection, { dbName: 'bookcluster' })

  // run generators
  await generateAuthors()
  await generateBooks()
  // await Author.deleteMany()
  // await Books.deleteMany()
  // shut down
  process.exit()
}
run()


// books
import { Books } from './routes/books.js';

async function generateBooks(clear = true) {
  if (!clear) {
    return books = await Books.find()
  }

  // delete all
  // await booksRouter.deleteMany()

  var genreArray = ["Adventure", "Romance", "Fantasy", "Horror", "Mystery", "Historical Fiction"]

  for (let i = 0; i < 20; i++) {
    // create book
    const book = new Books()
    book.title = faker.random.words()
    book.genre = genreArray[~~(Math.random() * genreArray.length)]
    book.released = Math.floor(Math.random() * (2000 - 1900 + 1)) + 1900
    book.rating = faker.datatype.number({ min: 1, max: 10 }) + "/10"
    book.description = faker.lorem.sentence(10)
    const author = authorArray[~~(Math.random() * authorArray.length)]
    book.author = author._id
    try {
      const result = await book.save()
      books.push(result)
      // console.log(books)
    } catch (e) {
      console.error(e)
    }
  }
}


// authors

async function generateAuthors(clear = true) {
  if (!clear) {
    return authorArray = await Author.find()
  }
  // generate authors
  for (let i = 0; i < 10; i++) {
    const author = new Author()
    author.name = faker.name.fullName()
    author.age = faker.datatype.number({ min: 20, max: 80 })
    author.email = faker.internet.email()
    try {
      const result = await author.save()
      authorArray.push(result)
    } catch (e) {
      console.error(e)
    }
  }
}