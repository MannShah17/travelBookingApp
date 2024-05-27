const User = require('../models/userModel');
const { hashPassword } = require('../helpers/authHelper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(200).send('Already Registered Please Login');
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    res.status(201).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password',
        status: 'Error',
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Innvalid email or Password',
        status: 'Error',
      });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({
        message: 'Innvalid email or Password',
        status: 'Error',
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );
    res.status(200).send({
      status: 'Success',
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: 'false',
      message: error.message,
    });
  }
};

const testController = (req, res) => {
  res.status(200).send('Protected Route');
};

module.exports = { registerController, loginController, testController };
