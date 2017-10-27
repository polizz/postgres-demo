require('dotenv').config()
const { init } = require('./program')

Promise.all([ init() ])