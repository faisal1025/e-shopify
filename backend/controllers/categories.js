const slugify  = require('slugify');
const Category = require('../models/category')
const Product = require('../models/product')

async function handleGetCategories(req, res) {
    const result = await Category.find();
    res.status(200).json({
        status: true,
        data: result
    })
}

async function handleGetCategoryProducts(req, res){
    const slug = req.params.slug;
    const page = req.query.page
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
        }},
        {$match: {
            category: {$ne: []}
        }},
        {$group: {
            _id: null,
            total: {$sum: 1}
        }}
    ])

    const products = await Product.aggregate([
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
    ]).skip(page*productPerPage).limit(productPerPage)

    const totalProduct = result[0]?.total;
    res.status(200).json({
        status: true,
        meta: {
            name: category[0].name,
            totalPages: Math.ceil(totalProduct/productPerPage)
        },
        data: products
    })
}

module.exports = {
    handleGetCategories,
    handleGetCategoryProducts
}