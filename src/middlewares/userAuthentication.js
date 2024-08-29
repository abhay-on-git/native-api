const jwtProvider = require('../config/jwtProvider')
const User = require('../models/user.model')
const isUserAuthenticated = async (req,res,next)=>{
    try {
        // Bearer token...
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'Unauthorized'})
        }
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message: 'User Not Found'})
        }
        req.user = user;
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
    next()
}

module.exports = isUserAuthenticated