// server.js

const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employee.routes');
const authRoutes = require('./routes/auth.routes'); // Nhập route cho đăng nhập và đăng ký
const cors = require('cors');

require('./config/db.config'); // Kết nối đến cơ sở dữ liệu

const app = express();
const PORT = process.env.PORT || 5000;

// Use the cors middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes); // Thêm route cho xác thực

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
