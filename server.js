const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');
const connect = require('./connection');

app.listen(8080, async () => {
    console.log('[port] opened - http://localhost:8080')
    console.log('...')
    await connect();
})