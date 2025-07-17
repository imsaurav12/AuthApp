const express = require("express");
const router = express.Router();

//handlers ko import kro controllers se

const {login, signup} = require("../Controllers/Auth");

router.post("/login", login);
router.post("/signup", signup);

//export 
module.exports = router;
 
