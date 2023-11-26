const express = require('express')
const { handleCreateCategory, 
    handleGetCategories,
    handleGetCategoryProducts } = require('../controllers/categories')

const router = express.Router()

router.route('/')
    .post(handleCreateCategory)
    .get(handleGetCategories)

router.route('/:slug')
    .get(handleGetCategoryProducts)

module.exports = router