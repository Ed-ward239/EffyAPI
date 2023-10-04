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
    port: 1433
}
module.exports = config;