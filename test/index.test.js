// const users = require('../routes/users.routes');
// // DB Queries
// const db = require('../db/user-queries');

//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
// let Book = require('../app/models/book');

let app = require('../index')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');

let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
    
    // beforeEach((done) => { //Before each test we empty the database and create XX users + posts
    //     Book.remove({}, (err) => { 
    //        done();           
    //     });        
    // });
/*
  * Test the /GET route
  */
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.gt(10); //review test to something more meaningful
                //   res.body.length.should.be.eql(30);
              done();
            });
      });
  });

  /*
  * Test the /POST route
  */
  describe('/POST users', () => {
    it('it should POST a user', (done) => {
        let user = {
            name: "Unit Test User",
            email: "mochatest@mail.com"
        }
      chai.request(app)
          .post('/users')
          .send(user)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                res.body.data.should.have.property('email');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('status').eql('success');
            done();
          });
    });

});

describe('/GET/:id users', () => {
    it('it should GET a user by the given id', (done) => {
       
        let user = {id: 35, name:"Unit Test User", email:"mochatest@mail.com"}

        chai.request(app)
          .get('/users/' + user.id)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('id').eql(user.id);
            done();
          });
    });
});

// describe('/PUT/:id users', () => {
//     it('it should UPDATE a book given the id', (done) => {
//         let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
//         book.save((err, book) => {
//               chai.request(server)
//               .put('/book/' + book.id)
//               .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('message').eql('Book updated!');
//                     res.body.book.should.have.property('year').eql(1950);
//                 done();
//               });
//         });
//     });
// });

/*
* Test the /DELETE/:id route
*/
// describe('/DELETE/:id users', () => {
//     it('it should DELETE a book given the id', (done) => {
//         let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
//         book.save((err, book) => {
//               chai.request(server)
//               .delete('/book/' + book.id)
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('message').eql('Book successfully deleted!');
//                     res.body.result.should.have.property('ok').eql(1);
//                     res.body.result.should.have.property('n').eql(1);
//                 done();
//               });
//         });
//     });
// });

});