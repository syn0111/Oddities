const mongoose = require("mongoose");
const schm = new mongoose.Schema({
    GuildID: String,
    Role: String
});

module.exports = mongoose.model("verification", schm);