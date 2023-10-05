const newData = require("../Model");
const savedData = require("../Model/model");
const db = require("../Model")
const voyNum = db.voyageNum;
const Op = db.Sequelize.Op; 

// Get all data (SELECT *) render for table
exports.findAll = (req, res) => {
    const voyNum = req.query.voyNum;
    var condition = voyNum ? { voyNum: { [Op.like]: `%${voyNum}%`}} : null;

    voyNum.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || "Error occurred"
            });
        });
};

// Add new row of data
exports.postNewData = (req, res, next) => {
    const subData = req.body;
    subData.map((data) => {
        const newData = new newData({
            shipName: data.shipName,
            voyageNum: data.voyageNum,
            date: data.date,
            effyShare: data.effyShare,
            statusPaid: data.statusPaid,
            editor: data.editor,
            revSS: data.revSS,
            revCC: data.revCC,
        });
        newData.save()
               .then((result) => res.json({ message: "saved to db"}))
               .catch((err) => console.log(err));
    });
};
/* Add new row of data
exports.saveData = (req, res, next) => {
    const shipName = req.body.shipName;
    const voyageNum = req.body.voyageNum;
    const date = req.body.date;
    const effyShare = req.body.effyShare;
    const statusPaid = req.body.statusPaid;
    const editor = req.body.editor;
    const revSS = req.body.revSS;
    const revCC = req.body.revCC;

    const savedData = new SavedData({
        shipName: shipName,
        voyageNum: voyageNum,
        date: date,
        effyShare: effyShare,
        statusPaid: statusPaid,
        editor: editor,
        revSS: revSS,
        revCC: revCC,
    });
    savedData.save()
             .then((result) => res.json({ message: "saved to db"}))
             .catch((err) => err);
};*/

exports.getSavedData = (req, res, next) => {
    SavedData.find()
             .then((result) => res.json(result))
             .catch((err) => err);
}

exports.deleteData = (req, res, next) => {
    const voyNum = req.params.voyNum;
    SavedData.findByIdAndRemove(voyNum)
        .then((result) => res.json({message: "deleted from db"}))
        .catch((err) => console.log(err));
};
















// this.shipName = shipName;
// this.voyageNum = voyageNum;
// this.date = date;
// this.effyShare = effyShare;
// this.statusPaid = statusPaid;
// this.editor = editor;
// this.revSS = revSS;
// this.revCC = revCC;