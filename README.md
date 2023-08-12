# Book-API Documentation

 An API for information about authors and their books.
 The API provides endpoints for managing authors and books, including creating, retrieving, updating, and deleting records.
 
### Other links

Mongodb link: mongodb+srv://albin:T9sNnMwhwlLp0MK0@bookcluster.yx5xwk2.mongodb.net/test

[Test report](https://docs.google.com/document/d/1x4Jv219DfUpUFjp8COsTb1DKOXVv3siy8yfbr5mtVvc/edit?usp=sharing)

# Endpoint Structure

The base URL for all API requests is: `http://localhost:3456/api`

### Author Methods:

- Returns a list of authors: `GET /authors`

- Returns the selected author listing by id: `GET /authors/{id}`

- Create a new author listing: `POST /authors`

- Update an existing author listing: `PUT /authors/{id}`

- Delete an existing author listing: `DELETE /authors/{id}`

### Book Methods:

- Returns a list of books: `GET /books`

- Returns the selected book listing by id: `GET /books/{id}`

- Create a new book listing: `POST /books`

- Update an existing book listing: `PUT /books/{id}`

- Delete an existing book listing: `DELETE /books/{id}`

# Request Parameters

### `/authors` Parameters

| Parameter  | Value | Description | Default |
| -------------- | ------------- | ------------- | ------------- |
| name | {author name} | Query by author name | none |
| age | {author age}  | Query by author age | none |
| email | {author email}  | Query by author email | none |
| :id | {author id} | Query by author id | none |
| limit  | 1-100  | The max number of author listings per page | 10 |
| skip  | {offset} | The number of authors to skip | 0 |
| page  | 1-5  | Select which page to go to | 1 |

### `/books` Parameters

| Parameter  | Value | Description  | Default |
| ------------- | ------------- | -------------| ------------- |
| title  | {book title}  | Query by book title | none |
| genre  | {book genre}  | Query by book genre | none |
| name  | {author name} | Query by author name | none |
| :id | {book id} | Query by book id | none |
| limit  | 1-100  | The max number of book listings per page | 10 |
| skip  | {offset} | The number of books to skip | 0 |
| page  | 1-5  | Select which page to go to | 1 |



# Request Headers
Headers for pagination

    - `X-Total-Count`: Total number of listings
    - `X-Current-Page`: Current page number
    - `X-Total-Pages`: Total number of pages
    
Other

    - `X-Powered-By`: Shows you what framework was used.


# Request Examples

### Query by book title

**Request:**

```
GET /books?title=Market
```

**Response:**

```json
[
    {
        "_id": "64a75f41689778bf24f31c32",
        "title": "Market",
        "genre": "Adventure",
        "released": 1973,
        "rating": "6/10",
        "description": "Rem at repudiandae id vero earum ullam tenetur facilis veniam.",
        "author": {
            "_id": "64a75f41689778bf24f31c20",
            "name": "John Doe",
            "age": 35,
            "email": "john@example.com",
            "__v": 0
        },
        "__v": 0
    }
]
```

### Query by author name

**Request:**

```
GET /authors?name=Freda Klein
```

**Response:**

```json
[
    {
        "_id": "64a75f41689778bf24f31c2a",
        "name": "Freda Klein",
        "age": 45,
        "email": "Ari25@yahoo.com",
        "__v": 0
    }
]
```

### Create a new author

"name" "age" and "email" are required fields.

- **URL:** `/api/authors`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "Author Name",
    "age": 30,
    "email": "author@example.com"
  }

# Error Handling

### This API uses the following status codes:

- `200 OK`: The request was succesful.
- `201 Created`: The POST request was succesful and created a new listing.
- `204 Deleted`: The requested listing was deleted.
- `400 Bad Request`: The request was malformed or missing required parameters.
- `404 Not Found`: The requested resource was not found.
- `429 Too Many Requests`: Requests exceeding the configured rate limit
- `500 Internal Server Error`: An unexpected error occurred on the server.

# Rate Limiting and Throttling

Current rate-limit is set to 100 request per minute, if exceeded just wait for a minute and try again.
