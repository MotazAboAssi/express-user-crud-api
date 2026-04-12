const mongoose = require('mongoose');
async function connection() {
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/express-user-crud-api');
        console.log('✅ Connection MongoDB');
    } catch (error) {
        console.log('❌ Connection MongoDB');
    }
}

module.exports = { connection };