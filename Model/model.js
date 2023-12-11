const sql = require('mssql');
module.exports = (sequelize, Sequelize) => {
    const HFCdata = sequelize.define("hfcData", {
        //id: { type: Sequelize.INTEGER },
        shipName: { type: Sequelize.STRING },
        voyageNum: { type: Sequelize.STRING },
        date: { type: Sequelize.DATEONLY },
        effyShare: { type: Sequelize.DECIMAL(11, 10) },
        statusPaid: { type: Sequelize.STRING },
        editor: { type: Sequelize.STRING },
        revSS: { type: Sequelize.DECIMAL(11, 10) },
        revCC: { type: Sequelize.DECIMAL(11, 10) },
        euVAT: { type: Sequelize.DECIMAL(11, 10) },
        carnivalShare: { type: Sequelize.DECIMAL(11, 10) },
        officeSup: { type: Sequelize.DECIMAL(11, 10) },
        discount: { type: Sequelize.DECIMAL(11, 10) },
        execFolio: { type: Sequelize.DECIMAL(11, 10) },
        ssFee: { type: Sequelize.DECIMAL(11, 10) },
        ccFee: { type: Sequelize.DECIMAL(11, 10) },
        mealCharge: { type: Sequelize.DECIMAL(11, 10) },
        paroleFee: { type: Sequelize.DECIMAL(11, 10) },
        cashAdv: { type: Sequelize.DECIMAL(11, 10) },
        cashPaid: { type: Sequelize.DECIMAL(11, 10) }
    });
    return HFCdata;
};