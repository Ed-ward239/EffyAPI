require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustedconnection: true,
        enableArithAbort: true, 
        instancename: 'SQLEXPRESS',
        trustServerCertificate: true
    },
}
sql.connect(config)