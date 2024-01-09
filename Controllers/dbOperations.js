var config = require('../config/dbConfig');
const sql = require('mssql');
const express = require('express');
const app = express();
app.use(express.json());

async function getAllData(){
    try{
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM DBO.HFC_VOYAGES_DEV");
        
        let data = result.recordsets[0]; // Assuming you want the first recordset

        // Format each date in the recordset
        data.forEach(record => {
            if (record.date) { // Replace 'date' with your actual date field name
                let date = new Date(record.date);

                // Extract month, day, and year
                let month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero
                let day = ('0' + date.getDate()).slice(-2); // Adding leading zero
                let year = date.getFullYear();

                // Update the date in the record
                record.date = `${year}-${month}-${day}`;
            }
        });

        return data;
    } catch (error) {
        console.log(error);
    }
}

async function addData(data){
    // if (!data.shipName) {
    //     throw new Error("ship_name is required");
    // }
    try {
        let pool = await sql.connect(config);
        let insertQuery = `INSERT INTO DBO.HFC_VOYAGES_DEV 
                           (ship_name, voyage_num, date, effy_share, status_paid, editor, rev_ss, rev_cc, eu_vat, carnival_share, office_supp, discounts, exec_folio, ss_fee, cc_fee, meal_charge, parole_fee, cash_adv, cash_paid) 
                           VALUES (@ship_name, @voyage_num, @date, @effy_share, @status_paid, @editor, @rev_ss, @rev_cc, @eu_vat, @carnival_share, @office_supp, @discounts, @exec_folio, @ss_fee, @cc_fee, @meal_charge, @parole_fee, @cash_adv, @cash_paid)`;

        await pool.request()
            .input('ship_name', sql.VarChar(50), data.ship_name)
            .input('voyage_num', sql.VarChar(50), data.voyage_num)
            .input('date', sql.Date, data.date)
            .input('effy_share', sql.Money, data.effy_share)
            .input('status_paid', sql.VarChar(50), data.status_paid)
            .input('editor', sql.VarChar(50), data.editor)
            .input('rev_ss', sql.Money, data.rev_ss)
            .input('rev_cc', sql.Money, data.rev_cc)
            .input('eu_vat', sql.Money, data.eu_vat)
            .input('carnival_share', sql.Money, data.carnival_share)
            .input('office_supp', sql.Money, data.office_supp)
            .input('discounts', sql.Money, data.discounts)
            .input('exec_folio', sql.Money, data.exec_folio)
            .input('ss_fee', sql.Money, data.ss_fee)
            .input('cc_fee', sql.Money, data.cc_fee)
            .input('meal_charge', sql.Money, data.meal_charge)
            .input('parole_fee', sql.Money, data.parole_fee)
            .input('cash_adv', sql.Money, data.cash_adv)
            .input('cash_paid', sql.Money, data.cash_paid)
            .query(insertQuery);

        return { success: true, message: 'Data added successfully' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error adding data', error: error };
    }
}

async function updateData(data){
    try {
        let pool = await sql.connect(config);
        let updateQuery = `UPDATE DBO.HFC_VOYAGES_DEV SET 
                           ship_name = @ship_name, 
                           voyage_num = @voyage_num, 
                           date = @date, 
                           effy_share = @effy_share, 
                           status_paid = @status_paid, 
                           editor = @editor, 
                           rev_ss = @rev_ss, 
                           rev_cc = @rev_cc, 
                           eu_vat = @eu_vat, 
                           carnival_share = @carnival_share, 
                           office_supp = @office_supp, 
                           discounts = @discounts, 
                           exec_folio = @exec_folio, 
                           ss_fee = @ss_fee, 
                           cc_fee = @cc_fee, 
                           meal_charge = @meal_charge, 
                           parole_fee = @parole_fee, 
                           cash_adv = @cash_adv, 
                           cash_paid = @cash_paid 
                           WHERE id = @id`;

        await pool.request()
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
            .query(updateQuery);

        return { success: true, message: 'Data updated successfully' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error updating data', error: error };
    }
}

async function deleteData(data){
    try {
        let pool = await sql.connect(config);
        let deleteQuery = `DELETE FROM DBO.HFC_VOYAGES_DEV WHERE voyage_num = @voyage_num`;

        await pool.request()
            .input('voyage_num', sql.VarChar(50), voyageNum)
            .query(deleteQuery);

        return { success: true, message: 'Data deleted successfully' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error deleting data', error: error };
    }
}

module.exports = {
    getAllData: getAllData,
    addData: addData,
    updateData: updateData,
    deleteData: deleteData,
};