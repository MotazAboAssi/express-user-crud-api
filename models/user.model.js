const { model, Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new Schema({
    fullName: {
        required: true,
        type: String,
        alias: 'full_name',
        minLength: 6,
        validate(val) {
            if (!validator.isAlpha(val)) {
                return "Full Name mustn't number or sympol"
            }
            return null;
        }
    },
    email: {
        required: true,
        type: String,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val))
                return 'wrong syntax email'
            return null;
        }

    },
    password: {
        required: true,
        type: String,
        validate(val) {
            if (!validator.isStrongPassword(val))
                return 'Password not Strong';
            return null;
        }
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