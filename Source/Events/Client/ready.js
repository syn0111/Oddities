const mongoose = require('mongoose');
const chalk = require('chalk');
mongoose.set('strictQuery', false);

module.exports = {
    name: "ready",
    once: true,
    async execute(interaction, client) {
        mongoose.connect(process.env.db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).catch((e) => console.log(e))

        console.log(chalk.cyanBright(`Logged in as ${client.user.tag} and running on ${client.guilds.cache.size} Servers!`))
    }
}