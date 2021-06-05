const express = require('express');
const profilesController = require('../controllers/profilesController');

const router = express.Router();

router.post('/createNewProfile', profilesController.createNewProfile);

router.delete('/deleteOneProfile/:id', profilesController.deleteOneProfile);

module.exports = router;
