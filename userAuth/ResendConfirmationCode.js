const UserModel = require("../models/UserModel")
const SendMail = require("../SendMail")




const ResendConfirmationCode = (app) => {

    app.post("/account/resendConfirmationCode", (req,res) => {
        const {email} = req.body
        console.log(email)

        UserModel.findOne({email: email}).then(doc => {

            const options = "abcdefghijklmnopqrstuvwxyz0123456789"

            let oldCode = doc.confirmationCode.value
            let newCode= ""

            while (newCode.length < 50){
                newCode+= options[Math.floor(Math.random() * options.length)]
                oldCode.split("").splice(0,41).join("")
                if (newCode.length === 40 && newCode === oldCode){
                    newCode = []
                }
            }

            doc.confirmationCode = {
                value: newCode,
                createdAt: new Date().getTime()
            }

            doc.save()

            const mailHtml = `<b><p>This Code Will Expire In 5 Minutes. If The Code Has Expired, Please Request For A New One.</p>
                            <p>Confirmation Code:${newCode}</p></b>`

            SendMail("Confirm Account", email,  mailHtml)
            res.status(200).send({message: "A Confirmation Code Has Been Resent", user:doc})
                
        }).catch(err => console.log(err))

        


    })
}

module.exports = ResendConfirmationCode