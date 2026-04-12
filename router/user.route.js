const express = require("express");
const { User } = require('./../models/user.model');

const userRouter = express.Router();

// GET 
userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users)
});
// POST
userRouter.post('/', async (req, res) => {
    let user = await req.body;
    if (user !== undefined) {
        try {
            const newUser = new User(user);
            await newUser.save();
            return res.status(200).json({
                status: 'Success',
                user
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
        res.status(200).json({ status: 'Success', user })
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
        res.status(200).json({ status: 'Success', user })
    } else {
        res.status(400).json({ status: 'Faild', message: error.message })
    }
})
// DELETE :id
userRouter.delete('/:id', async (req, res) => {
    const _id = req.params.id
    if (_id !== undefined) {
        const user = await User.findByIdAndDelete(_id);
        if (user !== null)
            res.status(200).json({ status: 'Success', user })
        else
            res.status(400).json({ status: 'Faild', message: 'User not found' })
    } else {
        res.status(400).json({ status: 'Faild', message: error.message })
    }
})



module.exports = userRouter