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
const base_ui_url = process.env.NODE_ENV === 'production' ? process.env.base_ui_url_prod : process.env.base_ui_url_local
const connection_string = process.env.NODE_ENV === 'production' ? process.env.connection_string_prod : process.env.connection_string_local

connectToMongoDb(connection_string).then(()=>{
    console.log("MongoDb Connected");
})


// middlewares
app.use(cors({
    origin: base_ui_url,
    optionsSuccessStatus: 200,
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true
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