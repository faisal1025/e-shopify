const express = require('express')
const { handleCreateCategory } = require('../controllers/categories')

const router = express.Router()

router.route('/')
    .post(handleCreateCategory)

module.exports = router