const UserModel = require("../models/UserModel")
const SendMail = require("../SendMail")



const ConfirmAccount = (app) => {

    app.post("/account/confirmation", (req,res) => {
        const {email, attemptedConfirmationCode, attemptedDate} = req.body

        UserModel.findOne({email: email}).then(doc => {


            //checks if the attemptedConfirmationCode is the same as the confirmation code value of the doc and is within 5 minutes or 300000ms of its creation date
            if (attemptedConfirmationCode === doc.confirmationCode.value && (attemptedDate - doc.confirmationCode.createdAt) < 300000){
                
                doc.confirmed = true
                doc.confirmationCode = undefined

                doc.save()

                const mailHtml = `<b><p>Congratulations, Your Account Has Been Confirmed.</p></b>`

                    SendMail("Confirm Account", email,  mailHtml)

                res.status(200).send({
                    message: "Your Account Has Been Confirmed",
                    user: doc
                })
                
            }


            else{
                res.status(200).send({
                    message: "This Code Is Either Incorrect Or Expired"
                })
            }

        })

        


    })
}

module.exports = ConfirmAccount