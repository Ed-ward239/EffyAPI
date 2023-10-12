require('dotenv').config();
const sql = require('mssql');

// sql.connect({
//     // host: process.env.HOST,
//     // port: parseInt(process.env.PORT),
//     server: process.env.DB_SERVER,
//     database: process.env.DB_DATABASE,
//     username: process.env.DB_USER,
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
    user: 'shipacctportaldev',
    password: 'BFXTczfjG+TbeG%!',
    server: 'effysql1.cudlgss5lr6m.us-east-2.rds.amazonaws.com',
    database: 'EffyShipAcctPortalDevDB',
    options: {
        trustedconnection: true,
        enableArithAbort: true, 
        instancename: 'SQLEXPRESS',
        trustServerCertificate: true
    },
}
sql.connect(config)

