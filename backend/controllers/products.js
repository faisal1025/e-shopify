const slugify  = require('slugify');
const Product = require('../models/product')
const Category = require('../models/category')


async function handleCreateProducts(req, res){
    const { name, subTitle, price, originalPrice, brand, qty, category, description } = req.body;
    const slug = slugify(name.toLowerCase())
    const thumbnail = req.files['thumbnail'][0]?.path
    const photos = req.files['photos'].map((file)=>{
        return {
            link: file?.path
        }
    })
    try {
        const result = await Product.create({
            name, subTitle, price, originalPrice, slug, brand, qty, category, thumbnail, photos, description
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

async function handleGetProductByCategory(req, res){
    const slug = req.params.category

    try {
        const category = await Category.findOne({slug});
        const products = await Product.find({category: category._id});
        return res.status(200).json({
            status: true,
            content: {
                data: products
            }
        })
    } catch (error) {
        return res.json({
            status: false,
            msg: error.message
        })
    }
}

async function handleGetProductById(req, res){
    const slug = req.params.slug;
    try {
        const product = await Product.findOne({slug});
        return res.status(200).json({
            status: true,
            content: {
                data: product
            }
        })
    } catch (error) {
        return res.json({
            status: false,
            msg: error.message
        })
    }

}

module.exports = {
    handleCreateProducts,
    handleGetProductByCategory,
    handleGetProductById
}