const express = require('express');
const userRouter = require('./router/user.route');
const { connectionDB } = require('./db/mongoos');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

connectionDB()
app.use(express.json())
app.use(userRouter)
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})