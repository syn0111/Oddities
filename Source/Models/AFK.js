const mongoose = require("mongoose");
const schm = new mongoose.Schema({
    GuildID: String,
    UserID: String,
    Status: String,
    Time: String,
    Afk: Boolean,
});

module.exports = mongoose.model("afk", schm);