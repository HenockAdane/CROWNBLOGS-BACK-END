const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    favouriteBlogs: {
        type: Array,
        required: true
    },
    confirmationCode: {
        type: Object,
        required: false
    },
    confirmed:{
        type: Boolean,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    }
}, {timestamps: true})


const UserModel = mongoose.model("User", userSchema) //para1 = collection Name, para2 = schema

module.exports = UserModel