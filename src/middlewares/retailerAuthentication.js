const jwtProvider = require('../config/jwtProvider')
const Retailer = require('../models/retailer.model')
const isRetailerAuthenticated = async (req,res,next)=>{
    try {
        // Bearer token...
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'Unauthorized'})
        }
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await Retailer.findById(userId)
        if(!user){
            return res.status(404).json({message: 'User Not Found'})
        }
        req.user = user;
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
    next()
}

module.exports = isRetailerAuthenticated