const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'students',
    password: 'password',
    port: 5432,
});
module.export = pool;