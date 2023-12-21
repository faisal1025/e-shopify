const fs = require('fs')
const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/users');
const slugify  = require('slugify');

// PRODUCT HANDLERS STARTS
async function handleCreateProducts(req, res){
    const { name, subTitle, price, originalPrice, brand, qty, category, description } = req.body;
    const req_category = await Category.find({name: category});
    const cate_id = req_category[0]._id;
    const slug = slugify(name.toLowerCase())
    const thumbnail = req.files['thumbnail'][0]?.path
    const photos = req.files['photos'].map((file)=>{
        return {
            link: file?.path
        }
    })
    try {
        const result = await Product.create({
            name, subTitle, price, originalPrice, slug, brand, qty, category: cate_id, thumbnail, photos, description
        })
        res.status(201).json({
            status: true,
            content: {
                data: result
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: error.message
        })
    }
}

async function handleGetProducts(req, res){
    const page = req.query.page || 0;
    const productPerPage = req.query.row || 5;
    const totalProducts = await Product.count();
    const products = await Product.find()
                            .skip(page*productPerPage)
                            .limit(productPerPage)
                            .populate({path: 'category'})
    return res.status(200).json({
        status: true,
        meta: {
            productsInPage: products.length,
            totalItems: totalProducts
        },
        data: {
            products
        }
    })
}

async function handleDeleteProduct(req, res) {
    const slug = req.query.slug;
    const result = await Product.findOneAndDelete({slug})
    return res.status(200).json({
        status: true,
        content: {
            data: result
        }
    })
}

async function handleUpdateProduct(req, res){
    const { id, name, subTitle, price, originalPrice, brand, qty, category, description } = req.body;
    const req_category = await Category.find({name: category});
    const cate_id = req_category[0]._id;
    const slug = slugify(name.toLowerCase())
    const product = await Product.findOne({_id: id})
    let thumbnail = product.thumbnail;
    let photos = product.photos;
    if(req.files['thumbnail']) {
        thumbnail = req.files['thumbnail'][0]?.path
        fs.unlink(product.thumbnail, (err) => {
            if(err) throw err;
            console.log("file deleted");
        })
    }
    if(req.files['photos']){
        photos = req.files['photos'].map((file)=>{
            return {
                link: file?.path
            }
        })
        product.photos?.forEach(photo => {
            fs.unlink(photo.link, (err) => {
                if(err) throw err;
                console.log("file deleted");
            })
        })
    }
    try {
        const result = await Product.findOneAndUpdate({_id: id}, {
            name, subTitle, price, originalPrice, slug, brand, qty, category: cate_id, thumbnail, photos, description
        })
        res.status(201).json({
            status: true,
            content: {
                data: result
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: error.message
        })
    }
}
// PRODUCT HANDLERS ENDS

// CATEGORY HANDLERS STARTS
async function handleCreateCategory(req, res){
    const {name} = req.body;
    const slug = slugify(name.toLowerCase())
    const thumbnail = req.files['thumbnail'][0]?.path;
    try {
        const category = await Category.create({
            name, slug, thumbnail
        })
        return res.status(201).json({
            status: true,
            content: {
                data: category
            }
        })            
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: error.message
        })            
    }
}

async function handleGetCategories(req, res){
    const page = req.query.page || 0;
    const productPerPage = req.query.row || 5;
    const totalItems = await Category.count();
    const categories = await Category.find()
                            .skip(page*productPerPage)
                            .limit(productPerPage)
    return res.status(200).json({
        status: true,
        meta: {
            productsInPage: categories.length,
            totalItems
        },
        data: {
            categories
        }
    })
}

async function handleDeleteCategory(req, res) {
    const slug = req.query.slug;
    const result = await Category.findOneAndDelete({slug})
    return res.status(200).json({
        status: true,
        content: {
            data: result
        }
    })
}

async function handleUpdateCategory(req, res) {
    const {name, id} = req.body;
    const slug = slugify(name.toLowerCase())
    const category = await Category.findOne({_id: id})
    let thumbnail = category.thumbnail;
    if(req.files['thumbnail']) {
        thumbnail = req.files['thumbnail'][0]?.path;
        // console.log("thumbnail", thumbnail);
        fs.unlink(category.thumbnail, (err) => {
            if(err) throw err;
            console.log("file deleted");
        })
    }
    try {
        const result = await Category.findOneAndUpdate({_id: id}, {name, slug, thumbnail})
        return res.status(201).json({
            status: true,
            content: {
                data: result
            }
        })            
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: error.message
        })            
    }
}
// CATEGORY HANDLERS ENDS

// USERS HANDLERS STARTS
async function handleGetUsers(req, res){
    const page = req.query.page || 0;
    const productPerPage = req.query.row  || 5;
    const totalItems = await User.count();
    const users = await User.find()
                            .skip(page*productPerPage)
                            .limit(productPerPage)
    return res.status(200).json({
        status: true,
        meta: {
            productsInPage: users.length,
            totalItems
        },
        data: {
            users
        }
    })
}
// USERS HANDLERS ENDS

module.exports = {
    handleUpdateProduct,
    handleCreateCategory,
    handleGetProducts,
    handleCreateProducts,
    handleGetCategories,
    handleGetUsers,
    handleDeleteCategory,
    handleUpdateCategory,
    handleDeleteProduct
}