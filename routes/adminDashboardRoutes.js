const express = require('express');
const adminDashboardController = require('../controllers/adminDashboardController');

const router = express.Router();

router.route('/').post(adminDashboardController.createProductWithAdminDashboard);
// router.route('/delete/:id').get(adminDashboardController.deleteProductWithAdminDashboard);
router.route('/delete-product').post(adminDashboardController.deleteProductWithAdminDashboard);
router.route('/update/:id').post(adminDashboardController.updateProductWithAdminDashboard);
router.route('/delete-sub-image1/:id').get(adminDashboardController.deleteSubImage1);


module.exports = router;