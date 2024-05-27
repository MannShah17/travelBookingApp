const express = require('express');
const {
  registerController,
  loginController,
  testController,
} = require('../controllers/authController');
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/test', isLoggedIn, isAdmin, testController);

module.exports = router;
