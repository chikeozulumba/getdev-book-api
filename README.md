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

```
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

- NodeJS - v10.4.1
- NPM - v6.4.1
- ExpressJS
- Passport
- Mongoose
- Morgan
- Body Parser
- CORS
- MongoDB(Using MLAB)

## CONFIGURATION

[NodeJS](https://nodejs.org/en/) ~10.4.1 and [MongoDB](https://www.mongodb.com/) are required.

Clone this repo to your machine. Once complete, you can run `npm i` to install the dependencies.

Create an environment file `.env` for storing variables.

```
.env
JWT_SECRET=#############
PORT=3000
MLAB_USERNAME=##########
MLAB_PASSWORD=############
BCRYPT_SALT_ROUNDS=10(default)
```

You can change the port for the app default is `3000`.

Also to persist the user's data, the default database setup is MongoDB, you can use other databases.
