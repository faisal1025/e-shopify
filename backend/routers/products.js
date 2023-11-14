const fs = require('fs')
const express = require('express')
const { handleCreateProducts,
   handleGetProductByCategory,
   handleGetProductById,
   handleAddToCart, 
   handleCheckout, 
   handlePaymentVerification,
   handleGetOrderedProduct, 
   handleAddLikedProducts,
   handleGetLikedProduct} = require('../controllers/products')
const multer  = require('multer')
const { isAutheticated } = require('../middlewares/auth;js')
const Order = require('../models/order')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdir(`./uploads/${req.body?.name}`, (err) => {
        if(err){
            console.log(err);
        }
        console.log("dir created successfully");
      }) 
      cb(null, `./uploads/${req.body?.name}`)
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrefix + '-' + file.originalname)
    }
})
const upload = multer({ storage })
const router = express.Router();

router.route('/')
    .post(upload.fields([{name: 'thumbnail', maxCount: 1}, {name: 'photos', maxCount: 5}]), handleCreateProducts)

router.route('/:category/products')
    .get(handleGetProductByCategory)

router.route('/:slug/product')
    .get(handleGetProductById)

router.route('/add-to-cart')
    .post(isAutheticated, handleAddToCart)

router.route('/getOrders')
    .get(isAutheticated, handleGetOrderedProduct)

router.route('/add-liked-product')
    .post(isAutheticated, handleAddLikedProducts)

router.route('/get-liked-product')
    .get(isAutheticated, handleGetLikedProduct)

router.route('/checkout')
    .post(isAutheticated, handleCheckout)

router.route('/paymentVerification')
    .post(handlePaymentVerification)


module.exports = router