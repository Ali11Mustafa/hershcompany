const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router
    .route('/')
    .get(productsController.getAllProducts)
    .post(productsController.createProduct);
router
    .route('/:id')
    .get(productsController.getProduct)
    .delete(productsController.deleteProduct);
//.put(productsController.updateProductWithAdminDashboard);

router
    .route('/recentProducts')
    .get(productsController.getRecentProducts);

module.exports = router;