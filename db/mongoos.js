const mongoose = require('mongoose');
async function connectionDB() {
    let connect = null;
    try {
        connect = await mongoose.connect('mongodb://localhost:27017/express-user-crud-api', { serverSelectionTimeoutMS: 2000 });
        console.log('✅ Connection MongoDB');
    } catch (error) {
        console.log('❌ Connection MongoDB');
    }
    return connect;
}

module.exports = { connectionDB };



