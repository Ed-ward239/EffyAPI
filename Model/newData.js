const sql = require('mssql');
const schema = sql.schema;
const newSchema = new schema({
    shipName: { type: sql.VarChar, },
    voyageNum: { type: sql.VarChar, },
    date: { type: sql.Date(YYYY/MM/DD), },
    effyShare: { type: sql.Decimal, }, 
    statusPaid: { type: sql.VarChar, },
    editor: { type: sql.VarChar, },
    revSS: { type: sql.Money},
    revCC: { type: sql.Money },
})
module.exports = sql.model("newData", newSchema);

// this.shipName = shipName;
// this.voyageNum = voyageNum;
// this.date = date;
// this.effyShare = effyShare;
// this.statusPaid = statusPaid;
// this.editor = editor;
// this.revSS = revSS;
// this.revCC = revCC;