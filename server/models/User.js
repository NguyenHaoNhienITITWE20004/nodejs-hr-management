const db = require('../config/db.config');
const bcrypt = require('bcrypt');

const User = function(user) {
  this.email = user.email;
  this.password = user.password;
};

// Đăng ký người dùng
User.register = (newUser, result) => {
  db.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

// Đăng nhập người dùng
User.login = (email, password, result) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
      if (err) {
        result({ kind: 'database_error', message: 'Database query failed!' }, null);
        return;
      }
  
      if (res.length) {
        const user = res[0];
  
        // So sánh mật khẩu được nhập với mật khẩu đã mã hóa
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            result({ kind: 'hashing_error', message: 'Error comparing password!' }, null);
            return;
          }
  
          if (isMatch) {
            result(null, user); // Mật khẩu khớp, trả về thông tin người dùng
          } else {
            result({ kind: 'invalid_credentials' }, null); // Mật khẩu không khớp
          }
        });
      } else {
        result({ kind: 'not_found' }, null); // Không tìm thấy người dùng
      }
    });
  };
// Lấy tất cả người dùng
User.findAll = (callback) => {
    db.query('SELECT id, email FROM users', (err, res) => {
      if (err) {
        if (typeof callback === 'function') {
          callback(err, null);
        }
        return;
      }
      if (typeof callback === 'function') {
        callback(null, res);
      }
    });
  };
  

// Tìm người dùng theo ID
User.findById = (id, result) => {
    db.query('SELECT id, email FROM users WHERE id = ?', [id], (err, res) => {
        if (err) {
            console.log('Error during query:', err); // Thêm log để kiểm tra lỗi
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]); // Trả về thông tin người dùng nếu tìm thấy
        } else {
            result({ kind: 'not_found' }, null); // Không tìm thấy người dùng
        }
    });
};

module.exports = User;
