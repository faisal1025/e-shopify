const express = require('express')
const cors = require('cors')
const connectToMongoDb = require('./connextion')
const userRoute = require('./routers/users')


const app = express()
const PORT = 8001

connectToMongoDb("mongodb://127.0.0.1:27017/shopyfi-db").then(()=>{
    console.log("MongoDb Connected");
})

// middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// api-routes
app.get('/', (req, res) => {
    const apiRoutes = {
        "user-register": "api/user/register",
        "user-login": "api/user/login"
    }
    res.status(200).json(apiRoutes)
})

app.use('/api/user', userRoute)


app.listen(PORT, ()=>{console.log(`Server is running on ${PORT} port`);})