const {mongoose } = require("mongoose")

const MONGO_URL = "mongodb+srv://abhayagnihotri1585:wWoLH7T4vOat6aZU@cluster0.csjcb77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = ()=>{
    mongoose.connect(MONGO_URL)
}

module.exports = {connectDB}