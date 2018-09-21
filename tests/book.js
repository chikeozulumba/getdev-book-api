let mongoose = require("mongoose");
let Book = require("../models/Book");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index.js");
require("../functions/db");
let should = chai.should();

const expect = chai.expect;

// Connect to DB for this test
const db_string_query = `mongodb://${process.env.MLAB_USERNAME}:${
  process.env.MLAB_PASSWORD
}@ds161092.mlab.com:61092/getdev`;

const authKey = process.env.JWT;
chai.use(chaiHttp);

//PARENT WRAPPER
describe("Books", () => {
  beforeEach(function(done) {
    mongoose.connect(
      db_string_query,
      {
        useNewUrlParser: true,
        keepAlive: 300000,
        connectTimeoutMS: 30000
      },
      function(error) {
        if (error) console.error("Error while connecting:\n%\n", error);
        done(error);
      }
    );
  });
  /*
  * Test the /GET route
  */
  describe("/GET books", () => {
    it("it should GET all the books", done => {
      chai
        .request(server)
        .get("/books")
        .set("authorizarion", authKey)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.books).to.be.a("array");
          done();
        });
    });
  });

  describe("/GET single book", () => {
    it("it should get a single book by id", done => {
      chai
        .request(server)
        .get("/books/5ba4b8942d5c7c26e313cd95")
        .set("authorizarion", authKey)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
  });

  describe("/POST add a book", () => {
    it("it add a single book by id", done => {
      // create a new book
      let book = {
        title: "God is Good",
        summary:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        rating: 3,
        date_published: "2016-09-18T17:34:02.666Z",
        genre: "Fantasy",
        cover: `https://images-na.ssl-images-amazon.com/images/I/51rJBIWvilL._SY445_.jpg`
      };
      chai
        .request(server)
        .post("/books/create")
        .send(book)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
  });

  describe("/POST update a book", () => {
    it("it update a single book by id", done => {
      // update a book
      let book = {
        title: "God is Good",
        summary:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        rating: 3,
        date_published: "2016-09-18T17:34:02.666Z",
        genre: "Fantasy",
        cover: `https://images-na.ssl-images-amazon.com/images/I/51rJBIWvilL._SY445_.jpg`
      };
      chai
        .request(server)
        .post("/books/update/5ba4b8942d5c7c26e313cd95")
        .send(book)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
  });
});
