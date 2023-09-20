class hfcData{
    constructor(shipName, voyageNum, date, effyShare, statusPaid, editor, revSS, revCC){
        this.shipName = shipName;
        this.voyageNum = voyageNum;
        this.date = date;
        this.effyShare = effyShare;
        this.statusPaid = statusPaid;
        this.editor = editor;
        this.revSS = revSS;
        this.revCC = revCC;
    }
}
module.exports = hfcData;