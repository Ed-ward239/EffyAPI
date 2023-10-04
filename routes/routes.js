const express = require('express')
const router = express.Router();
const Controllers = require('../Controllers/Controllers')

router.get('/findAll', Controllers.findAll);
router.post('/postNewData', Controllers.postNewData);
router.post('/saveData', Controllers.saveData);
router.get('/getSavedData', Controllers.getSavedData);
router.delete('/deleteData/:voyNum', Controllers.deleteData);

module.exports = router;