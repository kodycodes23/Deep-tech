const express = require('express');
//const { protect } = require('../middlewares/authMiddleware');
const { register, login, getMe } = require('../controllers/authcontroller');

const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me',authMiddleware, getMe);

module.exports = router;
  