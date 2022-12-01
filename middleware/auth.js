// import jwt from 'jsonwebtoken';
// import db from '../db';
const jwt = require('jsonwebtoken');
const conn = require('../db/db-connection');
const db = conn.pool;

const Auth = {
  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE user_id = $1';
      const { rows } = await db.query(text, [decoded.user_id]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = { id: decoded.user_id };
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  async isAdmin(req, res, next) { //check if the user calling the function is admin
    // let {username} = req.body;
    let userID = req.user.id;
    let adminType = 1;
    // username = username.toLowerCase();

    if(!userID) {
      return res.status(400).send({ 'message': 'LoggedIn user ID is not provided in request body' });
    }
    try {
      const text = 'SELECT * FROM users WHERE usertype = $1 AND user_id = $2';
      const { rows } = await db.query(text, [adminType,userID]);

      if(!rows[0]) {
        return res.status(400).send({ 'message': 'User is not an admin' });
      }

      req.user = { ...req.user, usertype: rows[0].usertype };//admin=1
      
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

module.exports = Auth;