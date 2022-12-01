const Pool = require('pg').Pool
require('dotenv').config()

const pass = process.env.PASSWORD;
const dbUser = process.env.DBUSER;

const pool = new Pool({
    user: dbUser,
    host: 'localhost',
    database: 'user_db',
    password: pass,
    port: 5432,
    max: 1,
    connectionTimeoutMillis: 1000,
    idleTimeoutMillis: 1000,
    debug: true,
    logging: true,
    synchronize: true,
})


module.exports = {
    pool
}