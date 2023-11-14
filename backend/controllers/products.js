const slugify  = require('slugify');
const Product = require('../models/product')
const Category = require('../models/category')
const Cart = require('../models/cart');
const Order = require('../models/order');
const crypto = require('crypto')
const instance = require('../services/payment');
const LikedProduct = require('../models/likedProduct');


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

async function handleAddToCart(req, res) {
    const { data } = req.body;
    const userId = req.user.id
    const products = [...data]
    // console.log("products", products);
    const updated = await Cart.findOneAndUpdate({userId}, {
        $push: {
            products: {
                $each: products
            }
        }
    })
    if(updated){
        // console.log("updated", updated);
        Cart.find({userId}).populate({
        path: 'products.productId'
        }).then((result)=>{
        // console.log("update", result);
        let sum =  0;
        result[0].products.forEach(product => {
            sum += (product.qty*product.productId.price);
        });
        return res.json({
            status: true,
            content: {
            meta: {
                total: result[0].products.length,
                totalAmount: sum
            },
            data: result
            }
        })
        }).catch((error)=>{
            console.log("#error", error.message);
        })
    }else{
        const create = await Cart.create({
        userId: userId,
        products: products
        })

        if(create){
        Cart.find({userId}).populate({
            path: 'products.productId',
        }).then((result)=>{
            console.log("create", result);
            return res.json({
            status: true,
            content: {
                meta: {
                total: result.length,
                totalAmount: 1200
                },
                data: result.products
            }
            })
        })
        }else{
        return res.json({
            status: true,
            msg: "Something went wrong"
        })
        }
    }    
} 

const handlePaymentVerification = async (req, res) => {
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
    const body = razorpay_order_id+'|'+razorpay_payment_id;
    const expected_signature = crypto.createHmac('sha256', process.env.razorpay_key_secret)
               .update(body.toString())
               .digest('hex');

    if (expected_signature === razorpay_signature) {
      // database work
      const {userId, products} = await Cart.findOneAndDelete({userId : req.query.id});
      const result = await Order.create({
        userId, 
        products,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      })
      
      res.redirect(
        `${process.env.base_ui_url}/paymentsuccess?reference=${razorpay_payment_id}`
      )
    }else{
      return res.status(400).json({
        status: false
      })
    }
}

const handleCheckout = async (req, res) => {
    var options = {
      amount: Number(req.body?.amount*100),  // amount in the smallest currency unit
      currency: "INR"
    };
    const order = await instance.orders.create(options);
   
    return res.json({
      msg: 'Order created successfully.',
      order,
      key: process.env.razorpay_key_id
    })
}

async function handleAddLikedProducts(req, res){
    const {data} = req.body;
    const userId = req.user.id;
    // console.log("#products ", data);
    const updated = await LikedProduct.findOneAndUpdate({userId}, {
        $push: {
            products: {
                $each: data
            }
        }
    });

    if(updated !== null){
        const result = await LikedProduct
                .find({userId})
                .populate({path: 'products.productId'});
        // console.log('liked Product', result);
        return res.status(200).json({
            status: true,
            products: result[0].products
        })
    }

    const created = await LikedProduct.create({
        userId,
        products
    })

    if(created !== null){
        const result = await LikedProduct
                .find({userId})
                .populate({path: 'products.productId'});
        return res.status(200).json({
            status: true,
            products: result.products
        })
    }else{
        return res.status(400).json({
            status: false,
            msg: 'failed',
        })
    }
}

async function handleGetLikedProduct(req, res){
    const userId = req.user.id;
   
}

async function handleGetOrderedProduct(req, res){
    const result  = await Order.find({
        userId : req.user.id
    }).populate({
        path: 'products.productId'
    })
    return res.json({
        status: true,
        result
    })
}

module.exports = {
    handleCreateProducts,
    handleGetProductByCategory,
    handleGetProductById,
    handleAddToCart,
    handlePaymentVerification,
    handleCheckout,
    handleGetOrderedProduct,
    handleAddLikedProducts,
    handleGetLikedProduct
}