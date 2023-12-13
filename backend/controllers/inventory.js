const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/users');

async function handleGetProducts(req, res){
    const page = req.query.page || 0;
    const productPerPage = 5;
    const products = await Product.find()
                            .skip(page*productPerPage)
                            .limit(productPerPage)
                            .populate({path: 'category'})
    return res.status(200).json({
        status: true,
        meta: {
            productsInPage: products.length,
            productPerPage
        },
        data: {
            products
        }
    })
}

async function handleGetCategories(req, res){
    const page = req.query.page || 0;
    const productPerPage = 5;
    const categories = await Category.find()
                            .skip(page*productPerPage)
                            .limit(productPerPage)
    return res.status(200).json({
        status: true,
        meta: {
            productsInPage: categories.length,
            productPerPage
        },
        data: {
            categories
        }
    })
}

async function handleGetUsers(req, res){
    const page = req.query.page || 0;
    const productPerPage = 5;
    const users = await User.find()
                            .skip(page*productPerPage)
                            .limit(productPerPage)
    return res.status(200).json({
        status: true,
        meta: {
            productsInPage: users.length,
            productPerPage
        },
        data: {
            users
        }
    })
}

module.exports = {
    handleGetProducts,
    handleGetCategories,
    handleGetUsers
}