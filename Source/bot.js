const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
require('dotenv').config();

const { loadCommands } = require('./Handlers/commands')
const { loadEvents } = require('./Handlers/events')
const { loadVariables } = require('./Handlers/variables')

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
      },
})

client.commands = new Collection();
client.devcommands = new Collection();

process.on("unhandledRejection", async (err, promise) => {
    console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`);
    console.error(promise);
});

client.login(process.env.token).then(() => {
    loadCommands(client);
    loadEvents(client);
    loadVariables(client);
})