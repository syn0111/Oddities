const { model, Schema } = require('mongoose');

const sch = new Schema({
    Guild: String,
    Channel: String,
})

module.exports = model('join-to-create', sch)