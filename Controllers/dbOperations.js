var config = require('../config/dbConfig');
const sql = require('mssql');
const express = require('express');
const app = express();
app.use(express.json());

async function getAllData(){
    try{
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM DBO.HFC_VOYAGES_DEV");
        
        let data = result.recordsets[0];
        // Format each date in the recordset
        data.forEach(record => {
            if (record.date) { 
                let date = new Date(record.date);

                // Extract month, day, and year
                let month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero
                let day = ('0' + date.getDate()).slice(-2); // Adding leading zero
                let year = date.getFullYear();

                // Update the date in the record
                record.date = `${month}/${day}/${year}`;
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

async function updateData(voyageNum, data){
    try {
        let pool = await sql.connect(config);
        let updateQuery = `UPDATE DBO.HFC_VOYAGES_DEV SET 
                           ship_name = @ship_name, 
                            
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
                           WHERE voyage_num = @identifyingVoyageNum`;

        let request = await pool.request()
        request.input('ship_name', sql.VarChar(50), data.ship_name)
            //.input('voyage_num', sql.VarChar(50), data.voyage_num)
        request.input('identifyingVoyageNum', sql.VarChar(50), voyageNum)
        request.input('date', sql.Date, data.date)
        request.input('effy_share', sql.Money, data.effy_share)
        request.input('status_paid', sql.VarChar(50), data.status_paid)
        request.input('editor', sql.VarChar(50), data.editor)
        request.input('rev_ss', sql.Money, data.rev_ss)
        request.input('rev_cc', sql.Money, data.rev_cc)
        request.input('eu_vat', sql.Money, data.eu_vat)
        request.input('carnival_share', sql.Money, data.carnival_share)
        request.input('office_supp', sql.Money, data.office_supp)
        request.input('discounts', sql.Money, data.discounts)
        request.input('exec_folio', sql.Money, data.exec_folio)
        request.input('ss_fee', sql.Money, data.ss_fee)
        request.input('cc_fee', sql.Money, data.cc_fee)
        request.input('meal_charge', sql.Money, data.meal_charge)
        request.input('parole_fee', sql.Money, data.parole_fee)
        request.input('cash_adv', sql.Money, data.cash_adv)
        request.input('cash_paid', sql.Money, data.cash_paid)
        await request.query(updateQuery);

        return { success: true, message: 'Data updated successfully' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Error updating data', error: error };
    }
}

async function deleteData(voyageNum){
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