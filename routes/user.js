const express = require("express");
const router = express.Router();

//handlers ko import kro controllers se

const {login, signup} = require("../Controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth")

router.post("/login", login);
router.post("/signup", signup);

//Testing Protected Route for single middleware
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for Test",
    });
} );

// Protected Route
router.get("/students", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for Students",
    });
} );

router.get("/admin", auth, isAdmin, (req, res)=> {
    res.json({
        success: true,
        message: "Welcome to the Protected route for Admin"
    });
} );



//export 
module.exports = router;
 
