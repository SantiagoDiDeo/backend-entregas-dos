const dotenv = require('dotenv').config();
const cluster = require('cluster');
const PORT = process.argv.slice(2)[0] ?? 8080;
const mongoUrl = process.env.MONGO_URI;


module.exports =  {mongoUrl, PORT};
