import express from "express";
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/user.js'

const app = express();
app.use(express.json({limit:"30mb",extended : true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());


app.get('/',(req,res) => {
	res.send("this is the stack overflow clone API")
})

app.use('/user' , userRoute)

// Database Connectvity start from here 

const CONNECTION_URL = "mongodb+srv://admin:admin@stack-overflow-clone.62t41kk.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => app.listen(PORT,() => {console.log(`server running in port ${PORT} \nhttp://localhost:${PORT}/` )}))
    .catch((err) => console.log(err.message))

const PORT = process.env.PORT || 5000

// Database Connectvity end here 
