const { model, Schema } = require('mongoose');
const bcryptjs = require('bcryptjs')

const userSchema = new Schema({
    fullName: {
        type: String,
        require: true,
        alias: 'full_name'
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
userSchema.pre("save", async function () {
    console.log(this)
    const user = this
    if (user.isModified('password')) {
        user.password = bcryptjs.hash(user.password, 10)
    }
})

const User = model('User', userSchema)
module.exports = { User, userSchema };