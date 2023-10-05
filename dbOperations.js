var config = require('./config/dbConfig');
const sql = require('mssql');

async function getAllData(){
    try{
        let pool = await sql.connect(config);
        let data = await pool.request().query("SELECT * FROM DBO.HFC_VOYAGES");
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
            .input('effyShare', sql.Money, data.effyShare)
            .input('statusPaid', sql.VarChar(50), data.statusPaid)
            .input('editor', sql.VarChar(50), data.editor)
            .input('revSS', sql.Money, data.revSS)
            .input('revCC', sql.Money, data.revCC)
            // .input('euRev', sql.Money, data.euRev)
            // .input('carnivalShare', sql.Money, data.carnivalShare)
            // .input('officeSup', sql.Money, data.officeSup)
            // .input('discount', sql.Money, data.discount)
            // .input('execFolio', sql.Money, data.execFolio)
            // .input('ssFee', sql.Money, data.ssFee)
            // .input('ccFee', sql.Money, data.ccFee)
            // .input('mealCharge', sql.Money, data.mealCharge)
            // .input('paroleFee', sql.Money, data.paroleFee)
            // .input('cashAdv', sql.Money, data.cashAdv)
            // .input('cashPaid', sql.Money, data.cashPaid)
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