const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.products);
router.get('/admin_dashboard', viewsController.adminDashboard);
router.get('/admin_dashboard/add-product', viewsController.addProductWithAdminDashboard);
router.get('/admin_dashboard/update-product/:id', viewsController.updateProductWithAdminDashboard);
router.get('/single_product', viewsController.sigleProduct);
router.get('/search', viewsController.search);
router.get('/shop', viewsController.shop);
router.get('/500', viewsController.error500);
router.get('/404', viewsController.error404);

module.exports = router;