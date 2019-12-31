const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mymoney', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

mongoose.Promise = global.Promise

module.exports = mongoose