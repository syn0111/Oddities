const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (!interaction.guild) {
      return interaction.reply({ content: `Commands cannot be used in Direct Messages!`, ephemeral: true });
    }


    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return client.command.delete(command.commandName);

      await command.execute(interaction, client);
    }
  },
};
