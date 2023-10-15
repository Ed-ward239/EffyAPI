require('dotenv').config();
const sql = require('mssql');

// sql.connect({
//     // host: process.env.HOST,
//     // port: parseInt(process.env.PORT),
//     server: process.env.DB_SERVER,
//     database: process.env.DB_DATABASE,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//         enableArithAbort: true, 
//         instanceName: 'SQLEXPRESS',
//         trustedConnection: true, 
//     }
// });


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        trustedconnection: true,
        enableArithAbort: true, 
        instancename: 'SQLEXPRESS',
        trustServerCertificate: true
    },
}
sql.connect(config)

