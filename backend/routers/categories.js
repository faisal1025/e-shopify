const express = require('express')
const { handleGetCategories,
    handleGetCategoryProducts } = require('../controllers/categories')
    
const router = express.Router()

router.route('/')
    .get(handleGetCategories)

router.route('/:slug')
    .get(handleGetCategoryProducts)

module.exports = router