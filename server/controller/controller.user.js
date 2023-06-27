const userModel = require('../model/model.user');
const bcrypt = require('bcrypt')

const register = async (req, res)=>{
    const {display_name, email, password } = req.body;
    const userData = await userModel.findOne({email: email});
    if(userData){
        res.status(409).json({message: "Email Already exist ", emailExist: true});
    }
    const data = new userModel({
        display_name : display_name,
        email : email , 
        password : bcrypt.hashSync(password, 10)
    });

    data.save().then((data)=>{
        console.log(data);
        res.send({message: "User is Registerd", data, userExist: true});
    })
    .catch((err)=>{
        console.error(err);
        res.status(402).send({message: err.message ,err, userExist: false});
    })
}


// Login Function
const login = async(req, res)=>{
    const{email, password} = req.body;
    try{
        const userData = await userModel.findOne({email:email});
        if(!userData){
            res.send({message: "User Doesn't Exist", userExist: false});
        }else{
            const isValid = bcrypt.compareSync(password, userData.password);
            res.status((isValid)? 200 : 401).send({
                message: (isValid)? "User Sucessfull Login": "Password is Invalid",
                userExist : (isValid)? true : false,
            })
        }
        console.log("You Hit the Url correct")
    }catch(err){
        console.log("You Hit the Url correct but ans is False")
        res.send({message: err.message, Error: err});
    }
}

module.exports = {
    register,
    login,
}