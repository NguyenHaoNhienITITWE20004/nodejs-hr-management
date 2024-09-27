import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployees, deleteEmployee, updateEmployee } from './../services/employeeService'; // Đảm bảo bạn import đúng
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const EmployeeManagement = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    salary: '',
    hire_date: '',
  });

  const [employees, setEmployees] = useState([]); // State để lưu danh sách nhân viên
  const [editingEmployee, setEditingEmployee] = useState(null); // State để lưu nhân viên đang chỉnh sửa
  const [openDialog, setOpenDialog] = useState(false); // State để quản lý dialog

  const fetchEmployees = async () => {
    const response = await getEmployees();
    setEmployees(response.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employee.hire_date || isNaN(new Date(employee.hire_date).getTime())) {
      alert('Please provide a valid hire date.');
      return;
    }

    const formattedEmployee = {
      ...employee,
      salary: parseFloat(employee.salary).toFixed(2), // Định dạng mức lương với hai chữ số thập phân
      hire_date: new Date(employee.hire_date).toISOString().split('T')[0],
    };

    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, formattedEmployee); // Cập nhật nhân viên
        setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? formattedEmployee : emp)));
      } else {
        await createEmployee(formattedEmployee); // Thêm nhân viên
        setEmployees([...employees, formattedEmployee]);
      }

      setEmployee({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        position: '',
        salary: '',
        hire_date: '',
      });
      setOpenDialog(false);
      setEditingEmployee(null); // Reset state
    } catch (error) {
      console.error('Error saving employee:', error.response ? error.response.data : error.message);
      alert('Failed to save employee. Please check the console for more details.');
    }
  };

  const handleEdit = (emp) => {
    setEmployee(emp);
    setEditingEmployee(emp);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id); // Xóa nhân viên
        setEmployees(employees.filter(emp => emp.id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
    setEmployee({ first_name: '', last_name: '', email: '', phone: '', position: '', salary: '', hire_date: '' });
    setEditingEmployee(null); // Reset state khi mở dialog
  };

  return (
    <Paper>
      <Button variant="contained" color="primary" onClick={handleDialogOpen}>
        Add Employee
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            variant="outlined"
            value={employee.first_name}
            onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            variant="outlined"
            value={employee.last_name}
            onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="outlined"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="outlined"
            value={employee.phone}
            onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Position"
            fullWidth
            variant="outlined"
            value={employee.position}
            onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Salary"
            fullWidth
            variant="outlined"
            type="number"
            value={employee.salary}
            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Hire Date"
            fullWidth
            variant="outlined"
            type="date"
            value={employee.hire_date}
            onChange={(e) => setEmployee({ ...employee, hire_date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingEmployee ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.first_name}</TableCell>
                <TableCell>{emp.last_name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.phone}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{parseFloat(emp.salary).toFixed(2)}</TableCell> {/* Định dạng mức lương với hai chữ số thập phân */}
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(emp)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(emp.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EmployeeManagement;
