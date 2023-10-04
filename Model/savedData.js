const sql = require('mssql');
const schema = sql.schema;
const savedSchema = new schema({
    shipName: { type: sql.VarChar, },
    voyageNum: { type: sql.VarChar, },
    date: { type: sql.Date(YYYY/MM/DD), },
    effyShare: { type: sql.Decimal, }, 
    statusPaid: { type: sql.VarChar, },
    editor: { type: sql.VarChar, },
    revSS: { type: sql.Money},
    revCC: { type: sql.Money },
})
module.exports = sql.model("SavedData", savedSchema);