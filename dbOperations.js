var config = require('./dbConfig');
const sql = require('mssql');

async function getAllData(){
    try{
        let pool = await sql.connect(config);
        let data = await pool.resquest().query("SELECT * FROM HFC_VOYAGES");
        return data.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

async function getData(shipName){
    try{
        let pool = await sql.connect(config);
        let data = await pool.request()
            .input('input_parameter', sql.VarChar(50), shipName)
            .query("SELECT * FROM HFC_VOYAGES WHERE shipName = @input_parameter");
        return data.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function addData(data){
    try{
        let pool = await sql.connect(config);
        let insertData = await pool.request()
            .input('shipName', sql.VarChar(50), data.shipName)
            .input('voyageNum', sql.VarChar(50), data.voyageNum)
            .input('date', sql.Date, data.date)
            .input('effyShare', sql.Decimal, data.effyShare)
            .input('statusPaid', sql.VarChar(50), data.statusPaid)
            .input('editor', sql.VarChar(50), data.editor)
            .input('revSS', sql.Decimal, data.revSS)
            .input('revCC', sql.Decimal, data.revCC)
        return insertData.recordset;
    }
    catch (error){
        console.log(error);
    }
}

module.exports = {
    getAllData: getAllData,
    getData: getData,
    addData: addData
}