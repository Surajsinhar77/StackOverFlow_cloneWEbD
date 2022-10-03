import  jwt  from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import users from '../models/auth.js'

export const signup = async (req, res) => {
	const {name, email, password } =  req.body;
    try{
        const existinguser = await users.findOne({email})
        if(existinguser){
            res.status(404).json({ message : "user already exist "})
        }
        const hasedPassword = await bcrypt.hash(password, 12)
        const newUser = await users.create({name, email, password:hasedPassword})
        const token = jwt.sign({email:newUser.email , id:newUser._id}, 'text', {expiresIn:'1h'})
        res.status(200).json({result: newUser, token})
    }catch(error){
        res.status(500).json('Something went worng ')
    }
}
export const login = async (req, res) => {
    const {email, password } =  req.body;
    try {
        const existinguser = await users.findOne({email})
        
        if(!existinguser){
            res.status(404).json({massage: "User Don't Exist"})
        }

        const isPasswordcrt = await bcrypt.compare(password, existinguser.password)
        if(!isPasswordcrt){
            return res.status(400).json({massge : "Invalid Credential"})
        }
        const token = jwt.sign({email : existinguser.email , id : existinguser._id}, "text", {expiresIn:'1h'})
        res.status(200).json({result: existinguser, token})

    } catch (error) {
        res.status(500).json('Something went worng ')
    }
}

