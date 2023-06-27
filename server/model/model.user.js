const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    display_name : {
        type: String,
        // required : true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type :String,
        required: true,
    },
})

module.exports = userModel = mongoose.model('users', userSchema);
// module.exports = userModel;