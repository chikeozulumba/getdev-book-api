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

You can change the port for the app, although the default is `3000`.

Also to persist the user's data, the default database setup is MongoDB, you can use other databases.

## ENDPOINTS

### Authorization

- Your token is the value of "token" in the json response. This must be included as an Authorization header in all subsequent requests.

  > POST <http://getdev-book-api:3000/v1/auth/login>

Query Parameters:

| Parameters |  Type  |                     Description                     |
| :--------: | :----: | :-------------------------------------------------: |
|   Email    | String | The registered email address of the user (required) |
|   :---:    | :---:  |                        :---:                        |
|  Password  | String |   The registered password of the user (required)    |

```json
{
  "user": { "data": "user" },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjp7InN0cmVldCI6IjE2IEFtb2tlIFNob2RlcnUgU3RyZWV0IEFydW5hIElrb3JvZHUiLCJzdGF0ZSI6IkxhZ29zIiwiY291bnRyeSI6Ik5pZ2VyaWEifSwiaXNBdXRob3JpemVkIjp0cnVlLCJqb2luZWRfZGF0ZSI6IjIwMTgtMDktMThUMTc6NTA6MzUuMDAwWiIsImxhc3RfbG9naW4iOiIyMDE4LTA5LTE4VDE3OjUwOjM1LjAwMFoiLCJib29rcyI6W10sIl9pZCI6IjViYTEzYWVlMTRiOWM3NzY0MzZmMDUxNSIsImZpcnN0X25hbWUiOiJDaGlrZSIsImxhc3RfbmFtZSI6Ik96dWx1bWJhIiwidGVsZXBob25lIjo4MTMxOTc2MzA2LCJlbWFpbCI6IkNoaWtlQGdnZnNzbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRzS2p3U1Vib0ZTYkFUdnp3eGR1S2V1azlPWE45LjdVdVBnNXBGMHJMdXQvODByUGpjT2guSyIsIl9fdiI6MCwiaWF0IjoxNTM3NDQ3ODg0fQ.nZWpUONpSpANEUfWzOnRKjKZv1b1aSYAV2Z3RKKoQLA"
}
```

Authorization Header

> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjp7InN0cmVldCI6IjE2IEFtb2tlIFNob2RlcnUgU3RyZWV0IEFydW5hIElrb....

###
