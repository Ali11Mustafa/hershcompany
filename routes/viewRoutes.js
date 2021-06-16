const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.products);
router.get('/admin_dashboard', viewsController.adminDashboard);
router.get('/admin_dashboard/add-product', viewsController.addProductWithAdminDashboard);
router.get('/single_product', viewsController.sigleProduct);
router.get('/search', viewsController.search);
router.get('/shop', viewsController.shop);


module.exports = router;