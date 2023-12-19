const express = require('express')
const fs = require('fs')
const {handleGetProducts, 
    handleGetCategories, 
    handleGetUsers, 
    handleDeleteCategory, 
    handleUpdateCategory,
    handleCreateCategory,
    handleDeleteProduct,
    handleCreateProducts,
    handleUpdateProduct} = require('../controllers/inventory')
const multer = require('multer');
const router = express.Router();

const productStorage = multer.diskStorage({
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

const categoryStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads/categories`)
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix + '-' + file.originalname)
    }
})

const uploadCategory = multer({storage: categoryStorage})

const uploadProduct = multer({storage: productStorage})

router.route('/products')
    .post(uploadProduct.fields([{name: 'thumbnail', maxCount: 1}, {name: 'photos', maxCount: 5}]), handleCreateProducts)
    .get(handleGetProducts)
    .delete(handleDeleteProduct)
    .put(uploadProduct.fields([{name: 'thumbnail', maxCount: 1}, {name: 'photos', maxCount: 5}]), handleUpdateProduct)

router.route('/categories')
    .post(uploadCategory.fields([{name: 'thumbnail', maxCount: 1}]), handleCreateCategory)
    .get(handleGetCategories)
    .delete(handleDeleteCategory)
    .put(uploadCategory.fields([{name: 'thumbnail', maxCount: 1}]), handleUpdateCategory)

router.route('/users')
    .get(handleGetUsers);

module.exports = router