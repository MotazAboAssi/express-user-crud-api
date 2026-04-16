const express = require("express");
const bcrypt = require('bcryptjs');
const { User } = require('./../models/user.model');
const { response } = require('./../helpers/response')

const userRouter = express.Router();

// GET 
userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    const secureUsers = users.map((user) => {
        const { __v, password, ...secureUser } = user._doc;
        return secureUser;
    })
    return response(res, true, { optional: { users: secureUsers } })
});
// POST
userRouter.post('/', async function (req, res) {
    let user = await req.body;
    if (user !== undefined) {
        try {
            const newUser = new User(user);
            await newUser.save();
            const { password, ...secureUser } = user;
            return response(res, true, {
                optional: {
                    user: secureUser
                }
            })
        } catch (error) {
            return response(res, false, {
                message: error.message
            })
        }
    }
    else {
        return response(res, false, {
            code: 404,
            message: 'No User Info'
        })
    }
});
// GET :id
userRouter.get('/:id', async (req, res) => {
    const _id = req.params.id
    if (_id !== undefined) {
        const user = await User.find({ _id })
        if (user.length !== 0) {
            const { password, __v, ...secureUser } = user['0']._doc
            return response(res, true, {
                optional: {
                    user: secureUser
                }
            })
        } else
            return response(res, false, {
                code: 404,
                message: 'User not found'
            })
    } else {
        return response(res, false, {
            message: error.message
        })
    }
})
// PUT :id
userRouter.put('/:id', async (req, res) => {
    const _id = req.params.id
    const userInfo = req.body;

    let user;
    try {
        user = await User.findById(_id)
        if (!user)
            return response(res, false, {
                code: 404,
                message: 'User not found'
            })
        const keys = Object.keys(userInfo)
        keys.forEach((key) => user[key] = userInfo[key])
        console.log(user)
        await user.save();
    } catch (error) {
        if (error.name === 'CastError') {
            return response(res, false, {
                code: 404,
                message: 'User not found'
            })
        }
        return response(res, false, {
            message: error
        })
    }
    if (!!user) {
        const { password, __v, ...secureUser } = user._doc
        return response(res, true, {
            optional: {
                user: secureUser
            }
        })
    } else {
        return response(res, false, {
            code: 404,
            message: 'User not found'
        })
    }
})
// DELETE :id
userRouter.delete('/:id', async (req, res) => {
    const _id = req.params.id
    let user;
    try {
        user = await User.findByIdAndDelete(_id)
    } catch (error) {
        return response(res, false, {
            code: 404,
            message: 'User not found'
        })
    }
    if (_id !== undefined && !!user) {
        const { password, __v, ...secureUser } = user._doc
        return response(res, true, {
            optional: {
                user: secureUser
            }
        })
    } else {
        return response(res, false, {
            code: 404,
            message: 'User not found'
        })
    }
})



module.exports = userRouter