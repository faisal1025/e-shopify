const slugify  = require('slugify');
const Category = require('../models/category')
const Product = require('../models/product')

async function handleCreateCategory(req, res){
    const {name} = req.body;
    const slug = slugify(name.toLowerCase())

    try {
        const category = await Category.create({
            name, slug
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

async function handleGetCategories(req, res) {
    const result = await Category.find();
    res.status(200).json({
        status: true,
        data: result
    })
}

async function handleGetCategoryProducts(req, res){
    const slug = req.params.slug;
    const productPerPage = 3
    const category = await Category.find({slug});
    const result = await Product.aggregate([
        {$lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categories'
        }},
        {$project: {
            category: {
                $filter: {
                    input: '$categories',
                    as: 'category',
                    cond: { $eq: ['$$category.slug', slug]  }
                }
            },
            name: 1, price: 1, originalPrice: 1, slug: 1, qty: 1, thumbnail: 1, subTitle: 1, _id: 1
        }},
        {$match: {
            category: {$ne: []}
        }}
    ])
    console.log('category', result);
    res.status(200).json({
        status: true,
        meta: {
            name: category[0].name,
            totalPages: Math.ceil(result.length/productPerPage)
        },
        data: result
    })
}

module.exports = {
    handleCreateCategory,
    handleGetCategories,
    handleGetCategoryProducts
}