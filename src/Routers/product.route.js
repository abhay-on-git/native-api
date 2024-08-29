const express =  require('express');
const productController = require('../controllers/product.controller')
const isUserAuthenticated = require('../middlewares/userAuthentication')
const isRetailerAuthenticated = require('../middlewares/retailerAuthentication')
const router = express.Router()

router.get('/',isUserAuthenticated,productController.getAllProduct);
router.post('/add-to-cart/:productId',isUserAuthenticated,productController.addToCart);
router.get('/cart',isUserAuthenticated,productController.getCart);
router.post('/createProduct',isRetailerAuthenticated,productController.createProduct);

module.exports = router;