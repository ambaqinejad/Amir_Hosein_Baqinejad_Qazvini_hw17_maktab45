const path = require('path');

const express = require('express');

const employeeController = require(path.join(path.dirname(__dirname), 'controllers', 'employee.js'));

const router = express.Router();

router.get('/all', employeeController.getAll);
router.get('/getManagers', employeeController.getManagers);
router.get('/officeAndManager', employeeController.officeAndManager);
router.get('/:id', employeeController.getOne);
router.post('/create', employeeController.create);
router.put('/update', employeeController.update);
router.delete('/delete', employeeController.remove);
router.post('/getEmployeeByOfficeName', employeeController.getEmployeeByOfficeName);
router.post('/getEmployeeByOfficeId', employeeController.getEmployeeByOfficeId);
router.post('/getOfficeManager', employeeController.getOfficeManager);
router.post('/getEmployeeBetweenTwoAges', employeeController.getEmployeeBetweenTwoAges);

module.exports = router;