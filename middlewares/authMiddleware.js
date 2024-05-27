const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Authentication failed: Missing token.',
        status: 'Error',
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({
          message: 'Authentication failed: Missing token.',
          status: 'error',
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Authentication failed: Invalid token.',
      status: 'error',
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).json({
        message: 'Unauthorised Access',
        status: 'error',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isLoggedIn, isAdmin };
