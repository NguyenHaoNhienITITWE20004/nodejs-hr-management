// controllers/auth.controller.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký người dùng
exports.registerUser = async (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
    };

    try {
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword; // Thay thế mật khẩu bằng mật khẩu đã mã hóa

        // Gọi phương thức register với user mới đã mã hóa
        User.register(newUser, (err, user) => {
            if (err) {
                return res.status(500).json({ message: "Registration failed!", error: err.message });
            }
            res.status(201).json({ message: "User registered successfully!", user });
        });
    } catch (error) {
        return res.status(500).json({ message: "Registration failed!", error: error.message });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng theo email
        User.login(email, password, (err, user) => {
            if (err) {
                if (err.kind === 'not_found') {
                    return res.status(404).json({ message: 'User not found!' });
                } else if (err.kind === 'invalid_credentials') {
                    return res.status(401).json({ message: 'Invalid email or password!' });
                } else {
                    return res.status(500).json({
                        message: 'Login failed!',
                        error: err.message || err,
                    });
                }
            }

            // Tạo token JWT nếu đăng nhập thành công
            const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
            res.json({ message: 'Login successful!', token });
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Login failed!',
            error: error.message || error,
        });
    }
};

// Lấy tất cả người dùng
exports.getAllUsers = (req, res) => {
    User.findAll((err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to fetch users!', error: err.message });
        }
        res.json(users);
    });
};

// Lấy thông tin người dùng theo ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to fetch user!', error: err.message });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.json({ id: user.id, email: user.email });
    });
};
