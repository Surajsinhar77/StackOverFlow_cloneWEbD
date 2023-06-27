const express = require('express');
const path = require('path')
const app = express();
app.use(express.json());

require('./db/connection')


app.listen(5000, ()=>{
    console.log("http://localhost:5000")
})

require(path.join(__dirname, './routers/router.user.js'))(app);