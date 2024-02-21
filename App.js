var hfcData = require('./Model/hfcData');
const dbOperations = require('./Controllers/dbOperations');
const dbOp_NCL = require('./Controllers/dbOp_NCL');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var http = require('http');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

// CCL Get Data
app.get('/CCL_GET', async (req, res) => {
    try {
        const data = await dbOperations.getAllData();
        res.json(data);
    } catch (error) {
        res.status(500).send(error.alert);
    }
});
// NCL Get Data
app.get('/NCL_GET', async (req, res) => {
    try {
        const data = await dbOp_NCL.getAllData();
        res.json(data);
    } catch (error) {
        res.status(500).send(error.alert);
    }
});


// CCL Add Data
app.post('/CCL_POST', async (req, res) => {
    try {
        const data = req.body;
        const result = await dbOperations.addData(data);
        if (!result.success) {
            // If the addition was not successful, send the corresponding message
            return res.status(409).json({ alert: result.message }); // 409 Conflict
        }
        res.status(201).json({ alert: 'Data added successfully', result });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// NCL Add Data
app.post('/NCL_POST', async (req, res) => {
    try {
        const data = req.body;
        const result = await dbOp_NCL.addData(data);
        if (!result.success) {
            // If the addition was not successful, send the corresponding message
            return res.status(409).json({ alert: result.message }); // 409 Conflict
        }
        res.status(201).json({ alert: 'Data added successfully', result });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// CCL Update Data
app.put('/CCL_PUT/:voyage_num', async (req, res) => {
    const voyageNum = req.params.voyage_num;
    const data = req.body;
    try {
        const result = await dbOperations.updateData(voyageNum, data);
        res.status(200).json({ alert: 'Data updated successfully', result });
    } catch (error) {
        res.status(500).send(error.alert);
    }
});
// NCL Update Data
app.put('/NCL_PUT/:voyage_num', async (req, res) => {
    const voyageNum = req.params.voyage_num;
    const data = req.body;
    try {
        const result = await dbOp_NCL.updateData(voyageNum, data);
        res.status(200).json({ alert: 'Data updated successfully', result });
    } catch (error) {
        res.status(500).send(error.alert);
    }
});



// CCL Delete Data
app.delete('/CCL_DEL/:voyage_num', async (req, res) => {
    const voyageNum = req.params.voyage_num;
    try {
        const result = await dbOperations.deleteData(voyageNum);
        res.status(200).json({ alert: 'Data deleted successfully', result });
    } catch (error) {
        res.status(500).send(error.alert);
    }
});
// NCL Delete Data
app.delete('/NCL_DEL/:voyage_num', async (req, res) => {
    const voyageNum = req.params.voyage_num;
    try {
        const result = await dbOp_NCL.deleteData(voyageNum);
        res.status(200).json({ alert: 'Data deleted successfully', result });
    } catch (error) {
        res.status(500).send(error.alert);
    }
});


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

http.createServer(app).listen(3000, function () {
    console.log('Server is running on port 3000');
});

module.exports = app;