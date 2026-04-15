const { model, Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');
const validatore = require('validator')

const userSchema = new Schema({
    fullName: {
        required: [true, (p) => `${p.path} is required`],
        type: String,
        alias: 'full_name',
        minLength: 6,
        validate: [{
            validator: function (v) {
                return validatore.isAlpha(v.replaceAll(' ', ''));
            },
            message: props => `${props.value} mustn't include number or sympol`
        }],
    },
    email: {
        required: [true, (p) => `${p.path} is required`],
        type: String,
        unique: true,
        validate: [{
            validator: (val) => validatore.isEmail(val),
            message: 'wrong syntax email'
        }]

    },
    password: {
        required: [true, (p) => `${p.path} is required`],
        type: String,
        validate: [{
            validator: (val) => validatore.isStrongPassword(val),
            message: 'Password not Strong'
        }]
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