const mongoose = require('mongoose');
async function connectionDB() {
    let connect = null;
    try {
        connect = await mongoose.connect(process.env.MONGO_LOCAL_CONN_URL);
        console.log('✅ Connection MongoDB');
    } catch (error) {
        console.log('❌ Connection MongoDB');
    }
    return connect;
}

module.exports = { connectionDB };



