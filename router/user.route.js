const express = require("express");
const { User } = require('./../models/user.model');
const { response } = require('./../helpers/response');
const { isNotEmptyOrUndefineObject } = require("../helpers/isEmptyObject");
const userRouter = express.Router();

// GET 
userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    return response(res, true, { optional: { users: users } })
});
// POST
userRouter.post('/', async function (req, res) {
    let info = await req.body;
    if (isNotEmptyOrUndefineObject(info)) {
        try {
            const user = new User(info);
            await user.save();
            return response(res, true, {
                optional: { user }
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
    const user = await User.findById(_id)
    if (isNotEmptyOrUndefineObject(user)) {
        return response(res, true, {
            optional: { user }
        })
    } else
        return response(res, false, {
            code: 404,
            message: 'User not found'
        })

})
// PUT :id
userRouter.put('/:id', async (req, res) => {
    const _id = req.params.id
    const userInfo = req.body;

    try {
       const user = await User.findById(_id)
        if (!user)
            return response(res, false, {
                code: 404,
                message: 'User not found'
            });
        const keys = Object.keys(userInfo)
        keys.forEach((key) => user[key] = userInfo[key])
        await user.save();
        return response(res, true, { optional: { user } })
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

})
// DELETE :id
userRouter.delete('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        return response(res, true, { optional: { user } })
    } catch (error) {
        return response(res, false, {
            code: 404,
            message: 'User not found'
        })
    }
})

// login user
userRouter.post('/login', async (req, res) => {
    const info = await req.body;
    try {
        const { user, token } = await User.findByCredentials(info);
        return response(res, true, {
            message: 'Login Success',
            optional: { user, token }
        });
    } catch (error) {
        return response(res, false, {
            message: error.message
        });
    }
})

module.exports = userRouter