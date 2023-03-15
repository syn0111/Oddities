function loadCommands(client) {
    const ascii = require('ascii-table');
    const fs = require('fs')
    const chalk = require('chalk');
    const table = new ascii().setHeading("Commands", "Status")

    let commandArray = [];
    let developerArray = [];

    const commandsFolder = fs.readdirSync("./Source/Commands");

    for (const folder of commandsFolder) {
        const commandFiles = fs
        .readdirSync(`./Source/Commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const commandFile = require(`../Commands/${folder}/${file}`)

            const properties = { folder, ...commandFile };
            client.commands.set(commandFile.data.name, properties);

            if(commandFile.developer) developerArray.push(commandFile.data.toJSON())
            else commandArray.push(commandFile.data.toJSON());

            table.addRow(file, "Loaded")
            continue;
        }
    }

    client.application.commands.set(commandArray);

    const developerGuild = client.guilds.cache.get('1026903220645285908')
    developerGuild.commands.set(developerArray);

    return console.log(chalk.magentaBright(table.toString()))

}

module.exports = { loadCommands }