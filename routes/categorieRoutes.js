const express = require('express');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router
    .route('/')
    .get(categoriesController.getAllCategories)
    .post(categoriesController.createCategorey);

router
    .route('/:id')
    .get(categoriesController.getOneCategorey)
    .delete(categoriesController.deleteCategorey);



module.exports = router;