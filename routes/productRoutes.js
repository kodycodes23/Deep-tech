const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
//router.post('/', ProductController.createProduct);
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);


module.exports = router;
