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
   handleUnLikedProduct,
   handleRemoveCartItem,
   handleIsLikedProduct,
   handleChangeQty} = require('../controllers/products')
const multer  = require('multer')
const { isAutheticated } = require('../middlewares/auth;js')

const Product = require('../models/product')


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

router.route('/:id/remove-from-cart')
    .delete(isAutheticated, handleRemoveCartItem)

router.route('/getOrders')
    .get(isAutheticated, handleGetOrderedProduct)

router.route('/add-liked-product')
    .post(isAutheticated, handleAddLikedProducts)

router.route('/un-like-product')
    .post(isAutheticated, handleUnLikedProduct)

router.route('/is-liked-product')
    .post(isAutheticated, handleIsLikedProduct)

router.route('/checkout')
    .post(isAutheticated, handleCheckout)

router.route('/paymentVerification')
    .post(handlePaymentVerification)

router.route('/get-search-result')
    .post(async (req, res) => {
        const page = req.query.page || 0;
        const productPerPage = 3;
        const {searchVal} = req.body

        const totalProducts = await Product.aggregate([
            {$match: {$text: { $search: searchVal }}},
            {$group: {_id: null, count: {$sum: 1}}}
        ])
        // console.log(totalProducts);
        const results = await Product.find({ $text: { $search: searchVal } }).skip(page*productPerPage).limit(productPerPage);
        // console.log(results);
        return res.status(200).json({
            status: true,
            meta:{
                total: totalProducts[0].count,
                totalPages: Math.ceil(totalProducts[0].count/productPerPage),
                productPerPage
            },
            results
        })
    })

router.route('/change-qty')
    .post(isAutheticated, handleChangeQty)


module.exports = router