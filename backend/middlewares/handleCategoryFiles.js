const multer = require('multer');
const Category = require('../models/category');
const fs = require('fs')

const updateCategoryThumbnail = async (req, res, next) => {
    const {id, name, thumbnail} = req.body;
    console.log(id, name, thumbnail);
    if(thumbnail){
        const category = await Category.findOne({_id: id})
        fs.unlink(category[0].thumbnail, (err) => {
            if(err) throw err;
            console.log("file deleted");
        })
    }
    next();
}

module.exports = {
    updateCategoryThumbnail
}