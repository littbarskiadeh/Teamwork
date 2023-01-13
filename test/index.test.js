let app = require('../index')
const conn = require('../db/db-connection');
const pool = conn.pool;

var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
// const uuid = uuidv4();
// const auth = require('../db/auth-queries');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

//import personas, sample articles/gifs for test
const { testAdmin, testEmployee, testArticle, testGif, image, testComment,testArticleUpdate } = require('./resources');
var fs = require('fs'),
    path = require('path'),  
            filePath = path.join(__dirname, image);

chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
    // before('Insert fake data', async function () {
    //     await pool.query('DELETE FROM users WHERE id != 1')
    //     await pool.query("INSERT INTO users (name, email) VALUES ('Joe', 'joe@example.com'), ('Ruby', 'ruby@example.com'), ('Test User', 'testuser.domain@mail.com')")
    // })

    after('Delete testusers from DB', async function () {
        await pool.query('DELETE FROM users WHERE username in ($1,$2)', [testEmployee.username, testAdmin.username])
    })

    describe('Test User routes (POST, GET)', () => {
        it('it should Create an admin user', (done) => {

            chai.request(app)
                .post('/auth/create-testuser')
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
                .set('x-access-token', testAdmin.token)
                .send(testEmployee)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.data.should.have.property('message').eql('User account successfully created');
                    res.body.data.should.have.property('token');

                    testEmployee.token = res.body.data.token;
                    testEmployee.uuid = res.body.data.uuid;

                    done();
                });
        });

        it('non-admin should NOT Create an employee', (done) => {
            chai.request(app)
                .post('/auth/create-user')
                .set('x-access-token', testEmployee.token)
                .send(testEmployee)
                .end((err, res) => {
                    console.debug(res.body)
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User is not an admin');

                    done();
                });
        });

        it('it should GET all the users', (done) => {
            chai.request(app)
                .get('/users')
                .set('x-access-token', testEmployee.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.least(1); //review test to something more meaningful
                    done();
                });
        });
    });

    describe('Test Article routes', () => {
        it('it should let an employee Create an Article', (done) => {
            chai.request(app)
                .post('/articles/')
                .set('x-access-token', testEmployee.token)
                .send(testArticle)
                .end((err, res) => {
                    res.body.should.be.a('object');

                    res.body.data.should.have.property('message').eql('Article successfully posted');
                    res.body.data.should.have.property('ownerID').eql(testEmployee.uuid);

                    testArticle.articleId = res.body.data.articleId;
                    testArticle.createdOn = res.body.data.createdOn;
                    testArticle.ownerID = res.body.data.ownerID;

                    done();
                });
        });

        it('it should let an employee add a comment to created Article', (done) => {
            chai.request(app)
                .post(`/articles/:${testArticle.articleId}/comment`)
                .set('x-access-token', testEmployee.token)
                .send(testComment)
                .end((err, res) => {
                    res.body.should.be.a('object');

                    res.body.data.should.have.property('message').eql('Comment successfully added');
                    res.body.data.should.have.property('commentBy').eql(testEmployee.uuid);

                    done();
                });
        });

        it('it should get an article by the articleId', (done) => {
            chai.request(app)
                .get(`/articles/${testArticle.articleId}`)
                .set('x-access-token', testEmployee.token)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    // console.debug(res.body.data)
                    res.body.should.have.property('status').eql('success');
                    res.body.data.should.have.property('authorId').eql(testArticle.ownerID);
                    res.body.data.should.have.property('title').eql(testArticle.title);

                    done();
                });
        });

        it('it should GET all the articles', (done) => {
            chai.request(app)
                .get('/articles')
                .set('x-access-token', testEmployee.token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.least(1);
                    done();
                });
        });

        it('it should NOT get all the articles. No token passed', (done) => {
            chai.request(app)
                .get('/articles')
                .end((err, res) => {
                    // console.debug(res.body )
                    res.body.should.have.property('message').eql('Token is not provided');

                    done();
                });
        });

        it('it should let an employee update the Article', (done) => {
            chai.request(app)
                .patch(`/articles/${testArticle.articleId}`)
                .set('x-access-token', testEmployee.token)
                .send(testArticleUpdate)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    // console.debug(res.body);
                    res.body.data.should.have.property('message').eql('Article successfully updated');
                    res.body.data.should.have.property('title').eql("Test Title");

                    done();
                });
        });

    });

    describe('Test GIF routes', () => {
        it('it should let an employee Create a GIF post', (done) => {

            chai.request(app)
                .post('/gifs/')
                .set('Content-Type', 'multipart/form-data')
                .set('x-access-token', testEmployee.token)
                .field('file', testGif.file)
                .field('title', testGif.title)
                .attach('file',filePath)
                .end((err, res) => {
                    res.body.should.be.a('object');

                    res.body.data.should.have.property('message').eql('GIF image successfully posted');
                    res.body.data.should.have.property('ownerID').eql(testEmployee.uuid);
                    res.body.data.should.have.property('title').eql(testGif.title);

                    // console.debug(res.body.data)
                    //Set fields for Gif object
                    testGif.gifID = res.body.data.gifID;
                    testGif.createdOn = res.body.data.createdOn;
                    testGif.ownerID = res.body.data.ownerID;

                    console.debug(testGif)
                    done();
                });
        });

        it('it should let an employee add a comment to a GIF', (done) => {
            chai.request(app)
                .post(`/gifs/${testGif.gifID}/comment`)
                .set('x-access-token', testEmployee.token)
                .send(testComment)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    
                    console.debug(res.body.data)
                    
                    res.body.data.should.have.property('message').eql('comment successfully added');
                    res.body.data.should.have.property('commentBy').eql(testEmployee.uuid);

                    done();
                });
        });

        it('it should get a GIF by the gifId', (done) => {
            
            chai.request(app)
                .get(`/gifs/${testGif.gifID}`)
                .set('x-access-token', testEmployee.token)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    console.debug(res.body.data)
                    // res.body.should.have.property('status').eql('success');
                    // res.body.data.should.have.property('authorId').eql(testGif.ownerID);
                    // res.body.data.should.have.property('title').eql(testGif.title);

                    done();
                });
        });


    });

});