var hfcData = require('./Model/hfcData');
const dbOperations = require('./Controllers/dbOperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var http = require('http');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Get Data
app.get('/GET', async (req, res) => {
    try {
        const data = await dbOperations.getAllData();
        res.json(data);
    } catch (error) {
        res.status(500).send(error.alert);
    }
});
// Add data
app.post('/POST', async (req, res) => {
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

// Update data
app.put('/PUT/:voyage_num', async (req, res) => {
    const voyageNum = req.params.voyage_num;
    const data = req.body;
    try {
        const result = await dbOperations.updateData(voyageNum, data);
        res.status(200).json({ alert: 'Data updated successfully', result });
    } catch (error) {
        res.status(500).send(error.alert);
    }
});

// Delete data
app.delete('/DEL/:voyage_num', async (req, res) => {
    const voyageNum = req.params.voyage_num;
    try {
        const result = await dbOperations.deleteData(voyageNum);
        res.status(200).json({ alert: 'Data deleted successfully', result });
    } catch (error) {
        res.status(500).send(error.alert);
    }
});


// var port = process.env.port || 8081;
// app.listen(port);
// console.log('HFC Data is running at ' + port);

http.createServer(app).listen(8081, function () {
    console.log('Server is running on port 8081');
});