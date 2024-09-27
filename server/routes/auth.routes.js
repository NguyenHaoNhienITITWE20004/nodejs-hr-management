// // routes/auth.routes.js

// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Giả định bạn đã có mô hình User

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const newUser = { email: req.body.email, password: hashedPassword };

//     User.register(newUser, (err, user) => {
//       if (err) {
//         return res.status(500).json({ message: 'Registration failed!', error: err.message });
//       }
//       res.status(201).json({ message: 'User registered successfully!', user });
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error in registration!', error: error.message });
//   }
// });


// // Route đăng nhập
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;
  
//     User.login(email, password, (err, user) => {
//       if (err) {
//         if (err.kind === 'not_found') {
//           return res.status(404).json({ message: 'User not found!' });
//         } else if (err.kind === 'invalid_credentials') {
//           return res.status(401).json({ message: 'Invalid email or password!' });
//         } else {
//           return res.status(500).json({
//             message: 'Login failed!',
//             error: err.message || err,
//           });
//         }
//       }
  
//       // Tạo token JWT nếu đăng nhập thành công
//       const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
//       res.json({ message: 'Login successful!', token });
//     });
//   });
  

// // Route fetch thông tin người dùng theo ID
// router.get('/user/:id', (req, res) => {
//     const userId = req.params.id;

//     User.findById(userId, (err, user) => {
//         if (err) {
//             if (err.kind === 'not_found') {
//                 return res.status(404).json({ message: 'User not found!' });
//             } else {
//                 return res.status(500).json({
//                     message: 'Failed to fetch user!',
//                     error: err.message,
//                 });
//             }
//         }

//         // Trả về thông tin người dùng (chỉ email, không bao gồm password)
//         res.json({ id: user.id, email: user.email });
//     });
// });


// // Route lấy tất cả người dùng
// router.get('/users', (req, res) => {
//     User.findAll((err, users) => {
//       if (err) {
//         return res.status(500).json({ message: 'Failed to fetch users!', error: err.message });
//       }
//       res.json(users);
//     });
//   });
  
// module.exports = router;

const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/users', authController.getAllUsers);
router.get('/user/:id', authController.getUserById);

module.exports = router;

