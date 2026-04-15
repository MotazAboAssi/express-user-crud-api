const { model, Schema } = require('mongoose');
const bcryptjs = require('bcryptjs')

const userSchema = new Schema({
    fullName: {
        required: true,
        type: String,
        alias: 'full_name'
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
    }
})
userSchema.pre("save", async function () {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 10)
    }
})

const User = model('User', userSchema)
module.exports = { User, userSchema };