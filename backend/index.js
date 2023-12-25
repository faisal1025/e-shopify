const express = require('express')
const cors = require('cors')
const connectToMongoDb = require('./connextion')
const userRoute = require('./routers/users')
const productRoute = require('./routers/products')
const categoryRoute = require('./routers/categories')
const inventoryRoute = require('./routers/inventory')
require('dotenv').config()

const app = express()
const PORT = 8001

connectToMongoDb(process.env.connection_string).then(()=>{
    console.log("MongoDb Connected");
})

// middlewares
app.use(cors({
    origin: process.env.base_ui_url,
    optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static(__dirname + '/uploads'))

// api-routes
app.get('/', (req, res) => {
    const apiRoutes = {
        "user-register": "api/user/register",
        "user-login": "api/user/login"
    }
    res.status(200).json(apiRoutes)
})

app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/category', categoryRoute)
app.use('/api/inventory', inventoryRoute)

global.__basedir = __dirname;
app.listen(PORT, ()=>{console.log(`Server is running on ${PORT} port`);})