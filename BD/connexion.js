//importing mongoose module
const mongoose=require('mongoose')

// importing dotenv module
require('dotenv').config()

// connecting to database 
const connexion=()=>
mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
    .then(()=> console.log("Database connection successful")) 
    .catch((err)=>console.error("Failed to connect to Database"))

module.exports=connexion