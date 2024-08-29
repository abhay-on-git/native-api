const express =  require('express');
const authController = require('../controllers/auth.controller')
const router = express.Router()

router.post('/userSignup', authController.userSignup);
router.post('/deliveryBoySignup', authController.deliveryBoySignup);
router.post('/retailerSignup', authController.retailerSignup);
router.post('/signin', authController.login);
router.get('/userRole', authController.getUserRoleFromToken);

module.exports = router;