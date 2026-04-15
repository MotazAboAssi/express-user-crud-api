const express = require('express');
const userRouter = require('./router/user.route');
const { connectionDB } = require('./db/mongoos');
const bodyParser = require('body-parser');
const { response } = require('./helpers/response');

const app = express();
const port = 3000;


app.use(express.json())
app.use(async (req, res, next) => {
    try {
        await connectionDB()
    } catch (error) {
        return response(res, false, {
            status: 500,
            message: '❌ Connection MongoDB'
        })
    }
    next()
})
app.use(userRouter)
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})