let app = require('../index')
const conn = require('../db/db-connection');
const pool = conn.pool;

var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const auth = require('../db/auth-queries');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

//import personas, sample articles/gifs for test
const {testAdmin, testEmployee, testArticle, testGif, image} = require('./resources');

chai.use(chaiHttp);

//Our parent block
describe('Users', () => {

    // before('Insert fake data', async function () {
    //     await pool.query('DELETE FROM users WHERE id != 1')
    //     await pool.query("INSERT INTO users (name, email) VALUES ('Joe', 'joe@example.com'), ('Ruby', 'ruby@example.com'), ('Test User', 'testuser.domain@mail.com')")
    // })

    after('Delete testuser from DB', async function () {
        await pool.query('DELETE FROM users WHERE username in ($1,$2)',[testEmployee.username, testAdmin.username])
    })

    describe('/POST users', () => {
        it('it should Create an admin user', (done) => {

            chai.request(app)
                .post('/auth/create-user')
                .send(testAdmin)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('message').eql('User account successfully created');
                    res.body.data.should.have.property('token');
                    testAdmin.token = res.body.data.token;                    
                    done();
                });
        });

        it('admin should Create an employee', (done) => {
            chai.request(app)
                .post('/auth/create-user')
                .set('x-access-token',testAdmin.token)
                .send(testEmployee)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('message').eql('User account successfully created');
                    res.body.data.should.have.property('token');
                    testEmployee.token = res.body.data.token;
                    
                    done();
                });
        });

    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(app)
                .get('/users')
                .set('x-access-token',testEmployee.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.gt(1); //review test to something more meaningful
                    done();
                });
        });
    });

    // describe('GET user', () => {
    //     it('it should GET the article with given id', (done) => {
    //         chai.request(app)
    //             .get('/articles/'+ testEmployee.id)
    //             .set('x-access-token',testEmployee.token)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('array');
    //                 res.body.length.should.be.gt(1); //review test to something more meaningful
    //                 done();
    //             });
    //     });
    // });

    // describe('/GET/:id users', () => {
    //     it('it should GET a user by the given id', (done) => {
    //         chai.request(app)
    //             .get('/users/' + user.id)
    //             .end((err, res) => {
    //                 res.should.have.status(201);
    //                 res.body.should.be.a('object');
    //                 res.body.data.should.have.property('name');
    //                 res.body.data.should.have.property('id').eql(user.id);
    //                 done();
    //             });
    //     });
    // });

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