var hfcData = require('./Model/hfcData');
const dbOperations = require('./Controllers/dbOperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Get Data
app.get('/', async (req, res) => {
    try {
        const data = await dbOperations.getAllData();
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// Add data
app.post('/POST', async (req, res) => {
    try {
        const data = req.body;
        const result = await dbOperations.addData(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update data
app.put('/PUT', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        await dbOperations.updateData(id, data);
        res.status(200).send('Data updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete data
app.delete('/DELETE', async (req, res) => {
    const id = req.params.id;
    try {
        await dbOperations.deleteData(id);
        res.status(200).send('Data deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


var port = process.env.port || 3000;
app.listen(port);
console.log('HFC Data is running at ' + port);