const express = require('express')
const {handleGetProducts, handleGetCategories, handleGetUsers} = require('../controllers/inventory')
const router = express.Router();

router.route('/products')
    .get(handleGetProducts);

router.route('/categories')
    .get(handleGetCategories);

router.route('/users')
    .get(handleGetUsers);

module.exports = router