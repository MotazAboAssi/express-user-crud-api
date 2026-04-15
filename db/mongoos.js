const mongoose = require('mongoose');
async function connectionDB() {
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/express-user-crud-api', { serverSelectionTimeoutMS: 2000 });
        console.log('✅ Connection MongoDB');
    } catch (error) {
        console.log('❌ Connection MongoDB');
        throw new Error('❌ Connection MongoDB');
    }
    return;
}

module.exports = { connectionDB };



