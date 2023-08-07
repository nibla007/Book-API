// express web server
import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

const api = express();
api.use(express.json());

// mongoose database connector & ODM for mongodb
const connection = 'mongodb+srv://albin:T9sNnMwhwlLp0MK0@bookcluster.yx5xwk2.mongodb.net/test';

// Set a rate limit middleware with a maximum of 100 requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
});

// Apply the rate limit middleware to all requests
api.use(limiter);

// start web server
api.listen(3456, () => {
  console.log('Connected to http://localhost:3456');
  // and connect to db
  mongoose.connect(connection, { dbName: 'bookcluster' });
});

// ROUTES
import booksRouter from './routes/books.js';
api.use('/api/books', booksRouter);

import authorsRouter from './routes/authors.js';
api.use('/api/authors', authorsRouter);
