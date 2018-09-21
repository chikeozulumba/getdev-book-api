# GETDEV - Book API

This an Rest API for a bookstore, with mobile applications in the pipeline. The purpose of this API is so that Users can view and rate books, whilist allowing the bookstore management view, create, update and remove books as well as apply ratings.

## FEATURES

- Authenticated Users can:

  - Create a book listing
  - Retrieve all book listings
  - Retrieve a single book
  - Update a book
  - Remove a book
  - Modify ratings

- Unauthenticated Users can:
  - View all book listings
  - View a single book
  - Rate a book

## PROJECT STRUCTURE

```.env
Project Root/
│
├── functions/
│   ├── config.js
│   ├── db.js
|   ├── passport.js
│   └── validator.js
│
├── models/
|   ├── Book.js
|   └── User.js
│
├── node_modules/
│
├── routes/
|   ├── auth.js
│   ├── book.js
│   └── user.js
|
├── tests/
|   ├── auth.js
│   ├── book.js
│   └── user.js
|
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

### File Structure

**functions/**  
This folder contains helper functions that runs on the server.

**models/**  
Contains `mongoose` Models

**node_modules/**  
Required dependancies are installed here.

**routes/**  
App routes for user registeration, login, book crud and authorization policies.

**tests/**  
Quality tests for the project.

**.gitignore**  
A standard `.gitignore` file for ignoring files/folders from being added the repo.

**index.js**  
This is the main file for the server.

**package.json**  
Define project settings in this file. All dependancies are listed here too.

**README.md**  
The project readme.

## SETUP

The project was developed using:

- NodeJS - v10.11.1
- NPM - v6.4.1
- ExpressJS
- Passport
- Mongoose
- Morgan
- Body Parser
- CORS
- MongoDB(Using MLAB)

## CONFIGURATION

[NodeJS](https://nodejs.org/en/) ~10.11.1 and [MongoDB](https://www.mongodb.com/) are required.

Clone this repo to your machine. Once complete, you can run `npm i` to install the dependencies.

Create an environment file `.env` for storing variables.

```.env
JWT_SECRET=#############
PORT=3000
MLAB_USERNAME=##########
MLAB_PASSWORD=############
BCRYPT_SALT_ROUNDS=10(default)
```

You can change the port for the app, although the default is `3000`.

Also to persist the user's data, the default database setup is MongoDB, you can use other databases.

## ENDPOINTS

### Authorization

- Your token is the value of "token" in the json response. This must be included as an Authorization header in all subsequent requests.

  > POST <http://localhost:3000/auth/login>

Query Parameters:

| Parameters |  Type  |                     Description                     |
| :--------: | :----: | :-------------------------------------------------: |
|   Email    | String | The registered email address of the user (required) |
|  Password  | String |   The registered password of the user (required)    |

Response data:

```json
{
  "user": { "data": "user" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjp7InN0cmVldCI6IjE2IEFtb2tlIFNob2RlcnUgU3RyZWV0IEFydW5hIElrb3JvZHUiLCJzdGF0ZSI6IkxhZ29zIiwiY291bnRyeSI6Ik5pZ2VyaWEifSwiaXNBdXRob3JpemVkIjp0cnVlLCJqb2luZWRfZGF0ZSI6IjIwMTgtMDktMThUMTc6NTA6MzUuMDAwWiIsImxhc3RfbG9naW4iOiIyMDE4LTA5LTE4VDE3OjUwOjM1LjAwMFoiLCJib29rcyI6W10sIl9pZCI6IjViYTEzYWVlMTRiOWM3NzY0MzZmMDUxNSIsImZpcnN0X25hbWUiOiJDaGlrZSIsImxhc3RfbmFtZSI6Ik96dWx1bWJhIiwidGVsZXBob25lIjo4MTMxOTc2MzA2LCJlbWFpbCI6IkNoaWtlQGdnZnNzbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRzS2p3U1Vib0ZTYkFUdnp3eGR1S2V1azlPWE45LjdVdVBnNXBGMHJMdXQvODByUGpjT2guSyIsIl9fdiI6MCwiaWF0IjoxNTM3NDQ3ODg0fQ.nZWpUONpSpANEUfWzOnRKjKZv1b1aSYAV2Z3RKKoQLA"
}
```

Authorization Header:

> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjp7InN0cmVldCI6IjE2IEFtb2tlIFNob2RlcnUgU3RyZWV0IEFydW5hIElrb....

### User profile

- Your token is the value of "token" in the json response. This must be included as an Authorization header in all subsequent requests.

  > GET <http://localhost:3000/user/profile>

Sample Response:

```json
{
  "address": {
    "street": "10 Radison Blues Victoria Island",
    "state": "Lagos",
    "country": "Nigeria"
  },
  "timestamps": {
    "joined_date": "2018-09-21T11:25:42.000Z",
    "last_login": "2018-09-21T11:25:42.000Z"
  },
  "isAuthorized": true,
  "books": [],
  "_id": "5ba13aee14b9c776436f0515",
  "joined_date": "2018-09-18T17:50:35.000Z",
  "last_login": "2018-09-18T17:50:35.000Z",
  "first_name": "Ahmed",
  "last_name": "Peter",
  "telephone": 08000000000,
  "email": "ahmed@peter.com"
}
```

### Manage Books

- GET /books List Books(s)
- GET /books/:id Get single book by ID
- POST /books/create Add / Create Book
- POST /books/update/:id Edit / Update Book
- DELETE /books/delete/:id Delete Book

#### List Books

Http Request

> GET <http://localhost:3000/books/>

Query Parameters

|  Parameters   |  Type  |         Description |
| :-----------: | :----: | ------------------: |
| Authorization | Header | Authenticated Token |

Sample Response

```json
{
  "books": [
    {
      "timestamps": {
        "date_created": "2018-09-21T09:23:30.000Z",
        "date_updated": "2018-09-21T09:23:30.000Z",
        "date_published": "2016-09-18T17:34:02.000Z"
      },
      "cover": "https://images-na.ssl-images-amazon.com/images/I/51rJBIWvilL._SY445_.jpg",
      "author": ["5ba13aee14b9c776436f0515"],
      "raters": ["5ba13aee14b9c776436f0515", "5ba4b8942d5c7c26e313cd95"],
      "_id": "5ba4b8942d5c7c26e313cd95",
      "title": "Harry Potter",
      "summary": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "rating": 2,
      "genre": "Fantasy",
      "__v": 1
    }
  ]
}
```

#### Get Book By ID

Http Request

> GET <http://localhost:3000/books/:id>

Query Parameters

|  Parameters   |  Type  |         Description         |
| :-----------: | :----: | :-------------------------: |
| Authorization | Header |     Authenticated Token     |
|      id       | String | Unique ID of Book(required) |

Sample Response

```json
{
  "docs": {
    "timestamps": {
      "date_created": "2018-09-21T09:23:30.000Z",
      "date_updated": "2018-09-21T09:23:30.000Z",
      "date_published": "2016-09-18T17:34:02.000Z"
    },
    "cover": "https://images-na.ssl-images-amazon.com/images/I/51rJBIWvilL._SY445_.jpg",
    "author": ["5ba13aee14b9c776436f0515"],
    "raters": ["5ba13aee14b9c776436f0515", "5ba4b8942d5c7c26e313cd95"],
    "_id": "5ba4b8942d5c7c26e313cd95",
    "title": "Harry Potter",
    "summary": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "rating": 2,
    "genre": "Fantasy",
    "__v": 1
  }
}
```

<!-- - POST /books/create Add / Create Book
- PUT /books/update/:id Edit / Update Book
- DELETE /books/delete/:id Delete Book -->

#### Add Book

Http Request

> POST <http://localhost:3000/books/create>

Query Parameters

|   Parameters   |  Type  |          Description           |
| :------------: | :----: | :----------------------------: |
| authorization  | Header |      Authenticated Token       |
|     title      | String |     Book title (required)      |
|    summary     | String | Summary of the Book (required) |
|     cover      | String |   Book Cover(jpg, pdf, png)    |
|     rating     | Number |     Users rating(required)     |
| date_published | String | Publish date of Book(required) |
|     genre      | String |      Book genre(required)      |

Sample Response

```json
{
  "saved": true,
  "message": "Book saved.",
  "docs": {
    "timestamps": {
      "date_created": "2018-09-21T11:25:43.000Z",
      "date_updated": "2018-09-21T11:25:43.000Z",
      "date_published": "2016-09-18T17:34:02.000Z"
    },
    "cover": "https://images-na.ssl-images-amazon.com/images/I/51rJBIWvilL._SY445_.jpg",
    "author": ["5ba4b8942d5c7c26e313cd95"],
    "raters": ["5ba4b8942d5c7c26e313cd95"],
    "_id": "5ba4dd32efc97543dcc59d4a",
    "title": "God is Good",
    "summary": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "rating": 3,
    "genre": "Fantasy",
    "__v": 0
  }
}
```

#### Update a Book

Http Request

> POST <http://localhost:3000/books/update/:id>

Query Parameters

|   Parameters   |  Type  |          Description           |
| :------------: | :----: | :----------------------------: |
| authorization  | Header |      Authenticated Token       |
|       id       | String |  Unique ID of Book (required)  |
|     title      | String |     Book title (required)      |
|    summary     | String | Summary of the Book (required) |
|     cover      | String |    Book Cover(jpg, pdf, png    | required) |
|     rating     | Number |     Users rating(required)     |
| date_published | String | Publish date of Book(required) |
|     genre      | String |      Book genre(required)      |

Sample Response

```json
{
  "updated": true,
  "message": "Book updated.",
  "docs": {
    "timestamps": {
      "date_created": "2018-09-21T11:25:43.000Z",
      "date_updated": "2018-09-21T11:25:43.000Z",
      "date_published": "2016-09-18T17:34:02.000Z"
    },
    "cover": "https://images-na.ssl-images-amazon.com/images/I/51rJBIWvilL._SY445_.jpg",
    "author": ["5ba4b8942d5c7c26e313cd95"],
    "raters": ["5ba4b8942d5c7c26e313cd95", "5ba4b8942d5c7c26e313cd95"],
    "_id": "5ba4dd32efc97543dcc59d4a",
    "title": "God is Good",
    "summary": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "rating": 2,
    "genre": "Fantasy",
    "__v": 1
  }
}
```

#### Delete a Book

Http Request

> DELETE <http://localhost:3000/books/delete/:id>

Query Parameters

|  Parameters   |  Type  |         Description          |
| :-----------: | :----: | :--------------------------: |
| Authorization | Header |     Authenticated Token      |
|      id       | String | Unique ID of Book (required) |

Sample Response

```json
{
  "message": "Book not found.",
  "deleted": false
}
```

## TESTING

Testing was implemeted with `mocha` and `chai` and can be carried out by running `npm test`

## Todo

- Refactoring

## Contributing

Please feel free to fork this package and contribute by submitting a pull request to enhance the functionalities.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
