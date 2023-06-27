const mongoose = require('mongoose');
const url = require('./config');
mongoose.connect(url.localDatabaseUrl).then(()=>{
    console.log("Connection Done SuccessFull");
}).catch((err)=>{
    console.log(err);
    console.error(err);
})
