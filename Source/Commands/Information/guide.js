const {
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    ChannelType,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
    ActionRowBuilder,
} = require("discord.js");
  
module.exports = {
    data: new SlashCommandBuilder()
      .setName("guide")
      .setDescription("Shows you how to use Oddities!"),
    async execute(interaction, client) {
      interaction.reply({ content: `coming soon`, ephemeral: true })
   },
};
  