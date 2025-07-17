// 3 middleware
// auth , isStudent , isAdmin

const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.auth = (req, res, next) => {
    try{
        //extract JWT token
        //PENDING : OTHER ways to fetch token
        const token = req.body.token;
        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            });
        }
        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;


        } catch(error){
            return res.status(401).json({
                success:false,
                message: "Invalid Token",
            });

        }
        next();

    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Something went wrong while generating the token",
        });
    }
}

exports.isStudent = (req, res, next)=> {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for students",
            });
        }
        next(); // ye middleware se agle wale me jane ke liye
    }catch(error){
        return res.status.status(500).json({
            success: false,
            message: "User Role is not matching"
        })

    }

}
exports.isAdmin = (req, res, next)=> {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin",
            });
        }
        next(); // ye middleware se agle wale me jane ke liye
    }catch(error){
        return res.status.status(500).json({
            success: false,
            message: "User Role is not matching"
        })
    }
}