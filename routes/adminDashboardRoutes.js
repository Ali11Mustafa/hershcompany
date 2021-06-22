const express = require('express');
const adminDashboardController = require('../controllers/adminDashboardController');

const router = express.Router();

router.route('/').post(adminDashboardController.createProductWithAdminDashboard);
router.route('/delete/:id').get(adminDashboardController.deleteProductWithAdminDashboard);
router.route('/update/:id').post(adminDashboardController.updateProductWithAdminDashboard);

module.exports = router;