const db = require('../config/db.config');

const Employee = function(employee) {
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.email = employee.email;
  this.phone = employee.phone;
  this.position = employee.position;
  this.salary = employee.salary;
  this.hire_date = employee.hire_date;
};

Employee.create = (newEmployee, result) => {
  db.query('INSERT INTO employees SET ?', newEmployee, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findAll = result => {
  db.query('SELECT * FROM employees', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Employee.findById = (id, result) => { 
    db.query('SELECT * FROM employees WHERE id = ?', [id], (err, res) => {  // Truyền tham số id dưới dạng mảng
      if (err) {
        // console.log("Error during query:", err); // Log lỗi để kiểm tra
        result(null, err);
        return;
      }

      if (res.length) {
        // console.log("Employee found:", res[0]); // Log kết quả nếu tìm thấy
        result(null, res[0]);
      } else {
        // console.log("Employee not found with id:", id); // Log nếu không tìm thấy
        result({ kind: 'not_found' }, null);
      }
    });
};


Employee.updateById = (id, employee, result) => {
  db.query('UPDATE employees SET ? WHERE id = ?', [employee, id], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res.affectedRows === 0 ? null : { id: id, ...employee });
  });
};

Employee.remove = (id, result) => {
  db.query('DELETE FROM employees WHERE id = ?', id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res.affectedRows === 0 ? null : res);
  });
};

module.exports = Employee;
