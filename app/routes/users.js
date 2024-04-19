const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Role = require('../models/role');
const ApiResponse = require('../responses/ApiResponse');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Độ phức tạp của thuật toán băm
const jwt = require('jsonwebtoken');

const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
router.post('/register', async (req, res) => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

 
    const userRole = await Role.findOne({ name: 'user' });

    if (!userRole) {
      const response = new ApiResponse(false, 'Role "user" not found', null);
      return res.status(500).json(response);
    }


    const userRoleId = userRole._id;

    let user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      roles: [userRoleId] 
    });


    user = await user.save();


    const response = new ApiResponse(true, 'Đăng ký tài khoản thành công', user);
    res.status(201).json(response);
  } catch (error) {

    const response = new ApiResponse(false, error.message, null);
    res.status(500).json(response);
  }
});

router.post('/login', async (req, res) => {
  try {

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      const response = new ApiResponse(false, 'User not found');
      return res.status(404).json(response);
    }


    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      const response = new ApiResponse(false, 'Invalid credentials');
      return res.status(401).json(response);
    }


    const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, {
      expiresIn: '5h'
    });

    const response = new ApiResponse(true, 'Đăng nhập thành công', { user: { username: user.username, email: user.email }, token });
    res.json(response);
  } catch (error) {
    const response = new ApiResponse(false, error.message);
    res.status(500).json(response);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('roles');
    if (users.length > 0) {
      res.json({ success: true, count: users.length, data: users});
    } else {
      res.status(404).json({ success: false, message: 'No users found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('No user found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
