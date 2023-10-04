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
//app.use('/api', router);

// app.get('/',(req, resp) =>{
//     resp.send('Hello');
//     dbOperations.getData().then(res => {
//         resp.json(res[0]);
//     })
// })

// router.route('/hfcData').get((req, resp) =>{
//     resp.send('Hello');
//     dbOperations.getData().then(res => {
//         resp.json(res[0]);
//     })
// })

app.get('/', (req, resp) => {
    let data = {...req.body}
    dbOperations.getAllData(data).then(res => resp.json(res))
})

app.post('/', (req, resp) => {
    let data = {...req.body}
    dbOperations.addData(data).then(res => {
        resp.status(201).json(res);
    })
})



var port = process.env.port || 8081;
app.listen(port);
console.log('HFC Data is running at ' + port);