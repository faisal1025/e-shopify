const fs = require('fs')
const express = require('express')
const { handleCreateProducts, handleGetProductByCategory, handleGetProductById } = require('../controllers/products')
const multer  = require('multer')
const Cart = require('../models/cart')
const { isAutheticated } = require('../middlewares/auth;js')

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
    .post(isAutheticated, async (req, res)=>{
      const { data } = req.body;
      const userId = req.user.id
      const products = [...data]
      console.log("products", products);
      const updated = await Cart.findOneAndUpdate({userId}, {
        $push: {
          products: {
            $each: products
          }
        }
      })
      if(updated){
        console.log("updated", updated);
        Cart.find({userId}).populate({
          path: 'products.productId'
        }).then((result)=>{
          console.log("update", result);
          return res.json({
            status: true,
            content: {
              meta: {
                total: result[0].products.length,
                totalAmount: 1200
              },
              data: result
            }
          })
        }).catch((error)=>{
          console.log("#error", error.message);
        })
      }else{
        const create = await Cart.create({
          userId: userId,
          products: products
        })
  
        if(create){
          Cart.find({userId}).populate({
            path: 'products.productId',
          }).then((result)=>{
            console.log("create", result);
            return res.json({
              status: true,
              content: {
                meta: {
                  total: result.length,
                  totalAmount: 1200
                },
                data: result.products
              }
            })
          })
        }else{
          return res.json({
            status: true,
            msg: "Something went wrong"
          })
        }
      }

    
        
    })


module.exports = router