# GETDEV - Book API

This an Rest API for a bookstore, with mobile applications in the pipeline. The purpose of this API is so that Users can view and rate books, whilist allowing the bookstore management view, create, update and remove books as well as apply ratings.

## Features

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

## SETUP

The project was developed using:

- NodeJS - v10.4.1
- NPM - v6.4.1
- ExpressJS - 4.16.3
- Passport - 0.4.0

## CONFIGURATION

```
eg
username: sunny
password:123456
password2: 123456
email:test2@test2.com
user_role:admin
```

-to sign in put the token in header and pass the username and password to the body

```
header eg
x-access-token : jdjdskdbskdbsksbdk
```
