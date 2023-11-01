const slugify  = require('slugify');
const Category = require('../models/category')

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

module.exports = {
    handleCreateCategory
}