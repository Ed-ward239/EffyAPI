var Db = require('./dbOperations');
var hfcData = require('./hfcData');
const dbOperations = require('./dbOperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((req, resp, next) =>{
    console.log('middleware');
    next();
})

router.route('/hfcData').get((req, resp) =>{
    dbOperations.getData().then(res => {
        resp.json(res[0]);
    })
})

router.route('/hfcData/:shipName').get((req, resp) => {
    dbOperations.getData(req.params.shipName).then(res => {
        resp.json(result[0]);
    })
})

router.route('/hfcData').post((req, resp) => {
    let data = {...req.body}
    dbOperations.addData(data).then(res => {
        resp.status(201).json(res);
    })
})

var port = process.env.port || 8081;
app.listen(port);
console.log('HFC Data is running at ' + port);