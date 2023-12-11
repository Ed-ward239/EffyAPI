var config = require('./config/dbConfig');
const sql = require('mssql');

async function getAllData(){
    try{
        let pool = await sql.connect(config);
        let data = await pool.request().query("SELECT * FROM DBO.HFC_VOYAGES_DEV");
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
            .input('input_parameter', sql.VarChar(50), voyageNum)
            .query("SELECT * FROM HFC_VOYAGES_DEV WHERE shipName = @input_parameter");
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
            .input('ship_name', sql.VarChar(50), data.shipName)
            .input('voyage_num', sql.VarChar(50), data.voyageNum)
            .input('date', sql.Date, data.date)
            .input('effy_share', sql.Money, data.effyShare)
            .input('status_paid', sql.VarChar(50), data.statusPaid)
            .input('editor', sql.VarChar(50), data.editor)
            .input('rev_ss', sql.Money, data.revSS)
            .input('rev_cc', sql.Money, data.revCC)
            .input('eu_vat', sql.Money, data.euVAT)
            .input('carnival_share', sql.Money, data.carnivalShare)
            .input('office_supp', sql.Money, data.officeSup)
            .input('discounts', sql.Money, data.discounts)
            .input('exec_folio', sql.Money, data.execFolio)
            .input('ss_fee', sql.Money, data.ssFee)
            .input('cc_fee', sql.Money, data.ccFee)
            .input('meal_charge', sql.Money, data.mealCharge)
            .input('parole_fee', sql.Money, data.paroleFee)
            .input('cash_adv', sql.Money, data.cashAdv)
            .input('cash_paid', sql.Money, data.cashPaid)
        return insertData.recordset;
    }
    catch (error){
        console.log(error);
    }
}

async function update(data){

}

module.exports = {
    getAllData: getAllData,
    getData: getData,
    addData: addData
}