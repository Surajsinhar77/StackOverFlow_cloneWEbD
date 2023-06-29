const express = require('express');
const path = require('path');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require('./db/connection')


app.listen(5000, ()=>{
    console.log("http://localhost:5000")
})

require(path.join(__dirname, './routers/router.user.js'))(app);