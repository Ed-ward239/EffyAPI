class hfcData{
    constructor(shipName, voyageNum, date, effyShare, statusPaid, editor, revSS, revCC, euVAT, carnivalShare, officeSup, discounts, execFolio, ssFee, ccFee, mealCharge, paroleFee, cashAdv, cashPaid){
        this.shipName = shipName;
        this.voyageNum = voyageNum;
        this.date = date;
        this.effyShare = effyShare;
        this.statusPaid = statusPaid;
        this.editor = editor;
        this.revSS = revSS;
        this.revCC = revCC;
        this.euVAT = euVAT;
        this.carnivalShare = carnivalShare;
        this.officeSup = officeSup;
        this.discounts = discounts;
        this.execFolio = execFolio;
        this.ssFee = ssFee;
        this.ccFee = ccFee;
        this.mealCharge = mealCharge;
        this.paroleFee = paroleFee;
        this.cashAdv = cashAdv;
        this.cashPaid = cashPaid;
    }
}
module.exports = hfcData;
