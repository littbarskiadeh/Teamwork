var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const conn = require('./db-connection');
const db = conn.pool;

const Helper = require('../controllers/helper');

const User = {
    /**
     * Create A User
     * @param {object} req 
     * @param {object} res
     * @returns {object} reflection object 
     */
    async create(req, res) {
        console.log("Create user called")
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ 'message': 'Some values are missing' });
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const hashPassword = Helper.hashPassword(req.body.password);
        console.log("Hashed password: " + hashPassword);
        const id = uuidv4();
        const values = [
            id,
            req.body.name,
            req.body.email,
            req.body.username,
            hashPassword,
            parseInt(req.body.usertype),
            moment(new Date())
        ];

        const createQuery = `INSERT INTO users(user_id, name, email, username, password, usertype, created_date)
            VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;


        try {
            console.log("Running query: ", createQuery)

            const { rows } = await db.query(createQuery, values);

            console.log("Query result: " + rows)

            const user = rows[0];

            const token = Helper.generateToken(user.user_id);
            console.log("Token generated: " + token);

            user.token = token; //send user object with token

            return res.status(201).send({ status: "success", data: user });
        } catch (error) {
            //   if (error.routine === '_bt_check_unique') {
            //     return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
            //   }
            return res.status(400).send(error.message);
        }
    },
    /**
     * Login
     * @param {object} req 
     * @param {object} res
     * @returns {object} user object 
     */
    async login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ 'message': 'Email or Password is missing' });
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const text = 'SELECT * FROM users WHERE email = $1 OR username = $1';
        // const loginQuery = 'UPDATE users SET isloggedin = 1 WHERE email = $1 RETURNING *'
        try {
            console.log(`Running query: ${text}`)
            let { rows } = await db.query(text, [req.body.email ]);
            
            if (!rows[0]) {
                return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
            }
            if (!Helper.comparePassword(rows[0].password, req.body.password)) {
                return res.status(400).send({ 'message': 'The password you provided is incorrect' });
            }
            
            const token = Helper.generateToken(rows[0].user_id);

            //update the login status field
            //  ({ rows } = await db.query(loginQuery, [req.body.email]));

            const user = rows[0];
            user.token = token;

            console.log(`User: ${user.username} logged in successfully!`)

            return res.status(200).send({ status: "success", data: user });
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Delete A User
     * @param {object} req 
     * @param {object} res 
     * @returns {void} return status code 204 
     */
    async delete(req, res) {
        const deleteQuery = 'DELETE FROM users WHERE username=$1 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.body.username]);
            //   const { rows } = await db.query(deleteQuery, [req.user.user_id]);
            if (!rows[0]) {
                return res.status(404).send({ 'message': 'user not found' });
            }
            return res.status(204).send({ status: "success", message: "User has been deleted successfully" });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

module.exports = User;