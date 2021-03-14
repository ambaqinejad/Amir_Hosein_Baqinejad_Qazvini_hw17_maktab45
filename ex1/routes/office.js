const path = require('path');

const express = require('express');

const router = express.Router();

const officeController = require(path.join(path.dirname(__dirname), 'controllers', 'office.js'));

router.get('/all', officeController.getAll);
router.get('/:id', officeController.getOne);
router.post('/create', officeController.create);
router.delete('/delete', officeController.remove);
router.put('/update', officeController.update);
router.put('/updateAll', officeController.updateAll);
router.post('/getOfficeWithSpecificAge', officeController.getOfficeWithSpecificAge)

module.exports = router;