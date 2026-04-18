const { model, Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');
const validatore = require('validator');
const { isEmptyOrUndefineObject } = require("../helpers/isEmptyObject");
const { response } = require('./../helpers/response');
const jsonwebtoken = require('jsonwebtoken');


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
            message: 'Password must include uppercases, lowercases, numbers, sympols at one latest'
        }]
    },
    tokens: [
        {
            type: String,
            required: true,
        }
    ]
})
userSchema.pre("save", async function () {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 10)
    }
})

userSchema.statics.findByCredentials = async (infoUser) => {
    if (!isEmptyOrUndefineObject(infoUser)) {
        const user = await User.findOne({ email: infoUser.email });
        if (user && user.isMatchPassword(infoUser.password)) {
            const token = user.generateToken()
            await user.save();
            return { user: infoUser, token };
        }
        else
            throw new Error("password or email is wrong")
    } else
        throw new Error('No user Info')
}

userSchema.methods.generateToken = function () {
    const user = this;
    const token = jsonwebtoken.sign({
        _id: user._id.toString(),
        email: user.email,
    }, 'secret123');
    user.tokens = user.tokens.concat(token)
    return token;
}

userSchema.methods.isMatchPassword = async function (password) {
    return await bcryptjs.compare(password ?? '', this.password)
}


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;
    delete userObject.tokens;

    return userObject
}

const User = model('User', userSchema)
module.exports = { User, userSchema };