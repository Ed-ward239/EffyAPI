var config = require('../config/dbConfig');
const sql = require('mssql');
const express = require('express');
const app = express();
app.use(express.json());

async function getAllData(){
    try{
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM DBO.NCLVOYAGESDEV");
        
        let data = result.recordsets[0];

        return data;
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error performing the operation', error: error.message });
    }
}

async function addData(data){
    try {
        let pool = await sql.connect(config);
        // First, check if the voyage_num already exists
        const checkQuery = `SELECT COUNT(*) as count FROM DBO.NCLVOYAGESDEV WHERE voyage_num = @voyage_num`;
        const checkResult = await pool.request()
            .input('voyage_num', sql.VarChar(50), data.voyage_num)
            .query(checkQuery);

        if (checkResult.recordset[0].count > 0) {
            // If the voyage_num already exists, return an error message
            return { success: false, message: `${voyage_num} already Exists in the Database` };
        }

        let insertQuery = `INSERT INTO DBO.NCLVOYAGESDEV 
                           (voyage_num, ship_name, start_date, end_date, revenue, vip_sales, plcc, dpa, plcc_dpa, vat, reg_commission, vip_commission, discounts, food, beverages, cc_fee, supplies, misc_charges, cash_adv, medical_charges, printing, prize_voucher, effy_rev, status_paid, editor) 
                           VALUES (@voyage_num, @ship_name, @start_date, @end_date, @revenue, @vip_sales, @plcc, @dpa, @plcc_dpa, @vat, @reg_commission, @vip_commission, @discounts, @food, @beverages, @cc_fee, @supplies, @misc_charges, @cash_adv, @medical_charges, @printing, @prize_voucher, @effy_rev, @status_paid, @editor)`;

        await pool.request()
            .input('voyage_num', sql.VarChar(50), data.voyage_num)
            .input('ship_name', sql.VarChar(50), data.ship_name)
            .input('start_date', sql.Date, data.start_date)
            .input('end_date', sql.Date, data.end_date)
            .input('revenue', sql.Money, data.revenue !== '' ? data.revenue : null)
            .input('vip_sales', sql.Money, data.vip_sales !== '' ? data.vip_sales : null)
            .input('plcc', sql.Money, data.plcc !== '' ? data.plcc : null)
            .input('dpa', sql.Money, data.dpa !== '' ? data.dpa : null)
            .input('plcc_dpa', sql.Money, data.plcc_dpa !== '' ? data.plcc_dpa : null)
            .input('vat', sql.Money, data.vat !== '' ? data.vat : null)
            .input('reg_commission', sql.Money, data.reg_commission !== '' ? data.reg_commission : null)
            .input('vip_commission', sql.Money, data.vip_commission !== '' ? data.vip_commission : null)            
            .input('discounts', sql.SmallMoney, data.discounts !== '' ? data.discounts : null)
            .input('food', sql.SmallMoney, data.food !== '' ? data.food : null)
            .input('beverages', sql.SmallMoney, data.beverages !== '' ? data.beverages : null)
            .input('cc_fee', sql.SmallMoney, data.cc_fee !== '' ? data.cc_fee : null)
            .input('supplies', sql.SmallMoney, data.supplies !== '' ? data.supplies : null)
            .input('misc_charges', sql.SmallMoney, data.misc_charges !== '' ? data.misc_charges : null)
            .input('cash_adv', sql.SmallMoney, data.cash_adv !== '' ? data.cash_adv : null)
            .input('medical_charges', sql.SmallMoney, data.medical_charges !== '' ? data.medical_charges : null)
            .input('printing', sql.SmallMoney, data.printing !== '' ? data.printing : null)
            .input('prize_voucher', sql.SmallMoney, data.prize_voucher !== '' ? data.prize_voucher : null)
            .input('effy_rev', sql.Money, data.effy_rev)
            .input('status_paid', sql.VarChar(50), data.status_paid)
            .input('editor', sql.VarChar(50), data.editor)
            .query(insertQuery);

        return { success: true, message: 'Data added successfully' };
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error performing the operation', error: error.message });
    }
}

async function updateData(voyageNum, data){
    try {
        let pool = await sql.connect(config);
        let updateQuery = `UPDATE DBO.NCLVOYAGESDEV SET 
                           ship_name = @ship_name, 
                           start_date =  @start_date, 
                           end_date = @end_date, 
                           revenue = @revenue, 
                           vip_sales = @vip_sales, 
                           plcc = @plcc, 
                           dpa = @dpa, 
                           plcc_dpa = @plcc_dpa, 
                           vat = @vat, 
                           reg_commission = @reg_commission, 
                           vip_commission = @vip_commission, 
                           discounts = @discounts, 
                           food = @food, 
                           beverages = @beverages, 
                           cc_fee = @cc_fee, 
                           supplies = @supplies, 
                           misc_charges = @misc_charges, 
                           cash_adv = @cash_adv, 
                           medical_charges = @medical_charges, 
                           printing = @printing, 
                           prize_voucher = @prize_voucher, 
                           effy_rev = @effy_rev, 
                           status_paid = @status_paid, 
                           editor = @editor
                           WHERE voyage_num = @voyage_num`; // after connected with frontend change to @identifyingVoyageNum
        console.log(`Executing update query for voyageNum: ${voyageNum}`);

        let request = await pool.request()
        request.input('voyage_num', sql.VarChar(50), voyageNum)  // after connected with frontend change to @identifyingVoyageNum
        request.input('ship_name', sql.VarChar(50), data.ship_name)
        request.input('start_date', sql.Date, data.start_date)
        request.input('end_date', sql.Date, data.end_date)
        request.input('revenue', sql.Money, data.revenue !== '' ? data.revenue : null)
        request.input('vip_sales', sql.Money, data.vip_sales !== '' ? data.vip_sales : null)
        request.input('plcc', sql.Money, data.plcc !== '' ? data.plcc : null)
        request.input('dpa', sql.Money, data.dpa !== '' ? data.dpa : null)
        request.input('plcc_dpa', sql.Money, data.plcc_dpa !== '' ? data.plcc_dpa : null)
        request.input('vat', sql.Money, data.vat !== '' ? data.vat : null)
        request.input('reg_commission', sql.Money, data.reg_commission !== '' ? data.reg_commission : null)
        request.input('vip_commission', sql.Money, data.vip_commission !== '' ? data.vip_commission : null)            
        request.input('discounts', sql.SmallMoney, data.discounts !== '' ? data.discounts : null)
        request.input('food', sql.SmallMoney, data.food !== '' ? data.food : null)
        request.input('beverages', sql.SmallMoney, data.beverages !== '' ? data.beverages : null)
        request.input('cc_fee', sql.SmallMoney, data.cc_fee !== '' ? data.cc_fee : null)
        request.input('supplies', sql.SmallMoney, data.supplies !== '' ? data.supplies : null)
        request.input('misc_charges', sql.SmallMoney, data.misc_charges !== '' ? data.misc_charges : null)
        request.input('cash_adv', sql.SmallMoney, data.cash_adv !== '' ? data.cash_adv : null)
        request.input('medical_charges', sql.SmallMoney, data.medical_charges !== '' ? data.medical_charges : null)
        request.input('printing', sql.SmallMoney, data.printing !== '' ? data.printing : null)
        request.input('prize_voucher', sql.SmallMoney, data.prize_voucher !== '' ? data.prize_voucher : null)
        request.input('effy_rev', sql.Money, data.effy_rev)
        request.input('status_paid', sql.VarChar(50), data.status_paid)
        request.input('editor', sql.VarChar(50), data.editor)
        await request.query(updateQuery);
        let result = await request.query(updateQuery);

        console.log(`Update query result: `, result);

        if (result.rowsAffected[0] === 0) {
            console.log(`No rows updated for voyageNum: ${voyageNum}`);
            return { success: false, message: 'No rows updated' };
        }
        return { success: true, message: 'Data updated successfully' };
    } catch (error) {
        console.error(`Error updating data for voyageNum: ${voyageNum}`, error);
        return { success: false, message: 'Error updating data', error: error };
    }
}

async function deleteData(voyageNum){
    try {
        let pool = await sql.connect(config);
        let deleteQuery = `DELETE FROM DBO.NCLVOYAGESDEV WHERE voyage_num = @voyage_num`;

        await pool.request()
            .input('voyage_num', sql.VarChar(50), voyageNum)
            .query(deleteQuery);

        let result = await request.query(updateQuery);

        console.log(`Deleted query result: `, result);
    
        if (result.rowsAffected[0] === 0) {
            console.log(`No rows deleted for voyageNum: ${voyageNum}`);
            return { success: false, message: 'No rows updated' };
        }
        return { success: true, message: 'Data deleted successfully' };
    } catch (error) {
        console.error(`Error deleting data for voyageNum: ${voyageNum}`, error);
        return { success: false, message: 'Error deleting data', error: error };
    }
}

module.exports = {
    getAllData: getAllData,
    addData: addData,
    updateData: updateData,
    deleteData: deleteData,
};