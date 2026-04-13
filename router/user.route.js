const express = require("express");
const bcrypt = require('bcryptjs');
const { User } = require('./../models/user.model');

const userRouter = express.Router();

// GET 
userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    const secureUsers = users.map((user) => {
        const { __v, password, ...secureUser } = user._doc;
        return secureUser;
    })
    res.status(200).json(secureUsers)
});
// POST
userRouter.post('/', async (req, res) => {
    let user = await req.body;
    if (user !== undefined) {
        try {
            const newUser = new User(user);
             newUser.save();
            const { password, ...secureUser } = user;
            return res.status(200).json({
                status: 'Success',
                user: secureUser
            })
        } catch (error) {
            return res.status(400).json({
                status: 'Faild',
                message: error.message
            })

        }
    }
    else {
        return res.status(400).json({
            status: 'Faild',
            message: 'No user Info'
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
            res.status(200).json({ status: 'Success', user: secureUser })
        } else
            res.status(400).json({ status: 'Faild', message: 'user not found' })
    } else {
        res.status(400).json({ status: 'Faild', message: error.message })
    }
})
// PUT :id
userRouter.put('/:id', async (req, res) => {
    const _id = req.params.id
    const userInfo = req.body;
    if (_id !== undefined) {
        const user = await User.findByIdAndUpdate(_id, { $set: userInfo }, { new: true })
        const { password, __v, ...secureUser } = user._doc
        res.status(200).json({ status: 'Success', secureUser })
    } else {
        res.status(400).json({ status: 'Faild', message: error.message })
    }
})
// DELETE :id
userRouter.delete('/:id', async (req, res) => {
    const _id = req.params.id
    if (_id !== undefined) {
        const user = await User.findByIdAndDelete(_id);
        if (user !== null) {
            const { password, __v, ...secureUser } = user._doc
            res.status(200).json({ status: 'Success', secureUser })
        }
        else
            res.status(400).json({ status: 'Faild', message: 'User not found' })
    } else {
        res.status(400).json({ status: 'Faild', message: error.message })
    }
})



module.exports = userRouter