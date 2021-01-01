require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const mongoose = require("mongoose")
const SignUp = require("./userAuth/SignUp")
const SignIn = require("./userAuth/SignIn")
const ConfirmAccount = require("./userAuth/ConfirmAccount")
const ResendConfirmationCode = require("./userAuth/ResendConfirmationCode")


 
const app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())


//
app.use(cors())

const dbURI = process.env.URI

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    console.log("Connected to Database")
    app.listen(3001)
}).catch((err => {
    console.log(err + "THIS IS THE ERROR")
    
}))





SignUp(app)
SignIn(app)
ConfirmAccount(app)
ResendConfirmationCode(app)

const Person = require("./person")


app.get("/", (req,res)=>{
    res.send("Hello World")
})






