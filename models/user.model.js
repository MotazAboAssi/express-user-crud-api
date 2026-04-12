const { model, Schema } = require('mongoose');

const userType = new Schema({
    fullName: {
        type: String,
        require: true,
        alias : 'full_name'
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
})

const User = model('User', userType)
module.exports = { User, userType };