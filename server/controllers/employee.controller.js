const Employee = require('../models/employee.model');

exports.create = (req, res) => {
  const employee = new Employee(req.body);
  Employee.create(employee, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while creating the employee.' });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  Employee.findAll((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'Some error occurred while retrieving employees.' });
    } else {
      res.send(data);
    }
  });
};

exports.findById = (req, res) => {
  Employee.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error retrieving employee with id ' + req.params.id });
    } else {
      res.send(data);
    }
  });
};



exports.update = (req, res) => {
  Employee.updateById(req.params.id, req.body, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error updating employee with id ' + req.params.id });
    } else {
      res.send(data);
    }
  });
};

exports.delete = (req, res) => {
  Employee.remove(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Could not delete employee with id ' + req.params.id });
    } else {
      res.send({ message: `Employee was deleted successfully!` });
    }
  });
};
