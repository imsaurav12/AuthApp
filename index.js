require('dotenv').config();
const express = require("express");
const app = express();


const PORT = process.env.PORT || 4000

app.use(express.json()); //parse incoming JSON data from the request body

require("./config/database").connect();

//route import and mount,pahle user.js route folder me bana lo
 //pahle route hi hit hogi, isliye route ko likhte h index.js me
const user = require("./routes/user");
app.use("/api/v1", user);

//activate server

app.listen(PORT, () => {
    console.log(`App suru ho gya mittar on port ${PORT}`)
})