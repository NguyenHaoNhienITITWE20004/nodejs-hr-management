const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

router.post('/', employeeController.create);
router.get('/', employeeController.findAll);
router.get('/:id', employeeController.findById);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete);

module.exports = router;
