const express = require('express');
const cors = require('cors')
// const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())


// const allowedHosts = ["http://localhost:5173"];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedHosts.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true // If you're sending cookies or authentication data with the request
};

app.use(cors(corsOptions));
app.get("/",(req,res,next)=>{
    res.json({message:"Hello World!"})
})

const authRouter = require('./Routers/auth.route')
app.use('/auth',authRouter)

const productRouter = require('./Routers/product.route')
app.use('/product',productRouter)


module.exports = app