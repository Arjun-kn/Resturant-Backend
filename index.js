const express = require("express");
const cors = require('cors');
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDB = require("./config/db");
//rest object

// dot env configuration
dotenv.config()

// DB Connection

const app = express();

// middleware
connectDB()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/resturant', require('./routes/resturant'))
app.use('/api/v1/category', require('./routes/categoryRoutes'))
app.use('/api/v1/food', require('./routes/foodRoutes'))
app.use('/api/v1/order', require('./routes/orderRoutes'))
// port
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
   console.log(`Server running on port ${PORT}`) ;
})