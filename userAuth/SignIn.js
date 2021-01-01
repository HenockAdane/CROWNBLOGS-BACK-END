const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")



const SignIn = (app) => {

    app.post("/account/signIn", (req,res)=>{

        const {email, password} = req.body
        

        UserModel.findOne({email: email}).then(doc => {

            if (doc){
                bcrypt.compare(password, doc.password).then(data => {
                    if (data){
                        res.status(200).send({message: `Welcome ${doc.firstName} ${doc.lastName}`, user: doc})
                    }

                    else{
                        res.status(200).send({message: "The Email or Password Is Incorrect"})
                    }
                })
            }

            else{
                res.status(200).send({message: "The Email or Password Is Incorrect"})
            }
            
               

        })    
    
    })
}

module.exports = SignIn
