const mongoose = require('mongoose');

function connect(){
    const CONN = process.env.CONN;
    mongoose.connect(CONN).then(() => {
        console.log('[db] connected')
    }).catch(console.error);
}

module.exports = connect;