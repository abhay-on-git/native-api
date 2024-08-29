const app = require('./index');
const { connectDB } = require('./config/db');
const PORT = 3000;
app.listen(PORT,async ()=>{
    await connectDB();
    console.log('Native API is running on PORT',PORT)
})