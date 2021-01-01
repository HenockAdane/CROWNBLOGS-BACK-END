const UserModel = require("../models/UserModel")
const SendMail = require("../SendMail")
const bcrypt = require("bcrypt")

const SignUp = (app) => {

    app.post("/account/signUp", (req, res) =>{
        

        const {
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            gender,
            createdAt} = req.body



            //check if a user with the name email address exists
            UserModel.findOne({email: email}).then(doc => {
                if (doc){
                    //doc already exists so that means there is already a user with this email address
                    res.status(200).send({message: "A User With This Email Address Already Exists"})
                    console.log(1)
                }

                else{
                    //doc doesnt exist so that means there is no user with this email address
console.log(2)
                    //hash the password so that it is secure
                    bcrypt.hash(password, 10).then(hashedPassword => {
                        

                        //creating a secure confirmation code
                        const options = "abcdefghijklmnopqrstuvwxyz0123456789"
                        let code = ""
                        while (code.length < 50){
                            code+= options[Math.floor(Math.random() * options.length)]
                        }
        
                        console.log(code + "=code")


                        //creating a new UserModel to save to the database
                        const newUser = new UserModel({
                            firstName: firstName,
                            lastName: lastName ,
                            email: email,
                            password: hashedPassword,
                            dateOfBirth: dateOfBirth,
                            gender: gender,
                            favouriteBlogs: [],
                            confirmationCode: {
                                value: code,
                                createdAt: new Date().getTime()
                            },
                            confirmed: false,
                            createdAt: createdAt
                        })
                        
                        newUser.save()

                        const mailHtml = `<b><p>This Code Will Expire In 5 Minutes. If The Code Has Expired, Please Request For A New One.</p>
                        <p>Confirmation Code:${code}</p></b>`

                        SendMail("Confirm Account", email,  mailHtml)
                        res.status(200).send({message: "Account Has Been Created. Please Confirm Email To Access Account", newUser:newUser})


                        

                    }).catch(bcryptErr => {
                        console.log(bcryptErr + "bcryptError")
                        res.status(500).send({message: "There Has Been An Unexpected Error, Please Try Again"})
                    })

                }
            }).catch(mongooseErr => {
                console.log(mongoosetErr + "mongooseError")
                res.status(500).send({message: "There Has Been An Unexpected Error, Please Try Again"})
            })

          

    })

}

module.exports = SignUp



