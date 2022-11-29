let app = require('../index')
const conn = require('../db/db-connection');
const pool = conn.pool;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Users', () => {

    before('Insert fake data', async function () {
        await pool.query('DELETE FROM users WHERE id != 1')
        await pool.query("INSERT INTO users (name, email) VALUES ('Joe', 'joe@example.com'), ('Ruby', 'ruby@example.com'), ('Test User', 'testuser.domain@mail.com')")
    })
    after('Delete all users but 1', async function () {
        await pool.query('DELETE FROM users WHERE id != 1')
      })

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
                    res.body.length.should.be.gt(1); //review test to something more meaningful
                    done();
                });
        });
    });

    describe('GET user', () => {
        it('it should GET the user with given name', (done) => {
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.gt(1); //review test to something more meaningful
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
                    done();
                });
        });

    });

    describe('/GET/:id users', () => {
        it('it should GET a user by the given id', (done) => {

            let user = { id: 1, name: "Unit Test User", email: "mochatest@mail.com" }

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