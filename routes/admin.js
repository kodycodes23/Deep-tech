const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.get('/users', AdminController.getAllUsers);
router.get('/products', AdminController.getAllProducts);

module.exports = router;
