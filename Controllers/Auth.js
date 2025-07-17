require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");



//signUp route handler
exports.signup = async (req, res) =>{
    try{
        //get data from frontend/postman
        const {name, email, password, role} = req.body;
        //check if the user already exists;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "User already Exists! "
            });
        }
        //secure the password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in Hasing Password"
            });
        }

        //create entry for user in db
        const user = await User.create({
            name, email, password: hashedPassword, role
        })

        return res.status(200).json({
            success: true,
            message: "User Created Successfully "
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message: "Error in hashing Password",
        });

    }
}

//handler for login

exports.login = async (req, res) => {
    try{

        // Data fetch
        const {email, password } = req.body;

        //Validation on email and password
        if(!email || !password ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully! ",
            });
        }

        //DB me user hai ki nahi check kro
        let user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"Beta, Login se pahle regiater kiya jata h, JAO KRKE AAO"
            });
        }

        //sign(payload)
        //payload mtlb jo exact data jo bhezna chahte hai
        const payload = { 
            email: user.email,
            id: user._id,
            role: user.role,
        } 
        //verify password and generate a JWT token
        if(await bcrypt.compare(password, user.password)){
            //password match
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h"
                                }
            );
            user= user.toObject();
            user.token = token;
            user.password = undefined; //user ke object se password hataya, DB se nahi

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,

            }
            res.cookie("cookiesName", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in Successfully",
            });
        }
        else{
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }


    }
    catch(error) {
        console.log('error');
        return res.status(500).json({
                success: false,
                message: "Login Failed!",
            });

    }

}