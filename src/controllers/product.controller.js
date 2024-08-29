const Product = require('../models/product.model')
const User = require('../models/user.model')

const createProduct  = async (req,res)=>{
    const {title,imageURL,price} = req.body;
   try {
    const product = await Product.create({
        title,
        imageURL,
        price,
    })
    await product.save()
    res.status(200).json(" Product created Succesfully")
   } catch (error) {
    console.log("Error in creating Product",error.message)
    res.status(500).json(" Internal Server error")
   }
}

const getAllProduct  = async (req,res)=>{
   try {
    const products = await Product.find({})
    res.status(200).json(products)
   } catch (error) {
    console.log("Error in fetching Products",error.message)
    res.status(500).json(" Internal Server error")
   }
}

const getCart = async (req, res) => {
  const  userId  = req.user._id; 
  
  try {
    const user = await User.findById(userId).populate('product');
    console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user.product);
    } catch (error) {
      console.error('Error in fetching cart products:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  const addToCart = async (req, res) => {
    const productId = req.params.productId
    const userId = req.user._id; 

    console.log(userId,productId,"oooooooooooooooooo")
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.product.includes(productId)) {
        return res.status(400).json({ message: 'Product already in cart' });
      }
  
      user.product.push(productId);
      await user.save();
  
      res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
      console.error('Error in adding product to cart:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    getCart,
    createProduct,
    getAllProduct,
    addToCart,
  }