const {
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    ChannelType,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
    ActionRowBuilder,
    BitField,
} = require("discord.js");
  
module.exports = {
    data: new SlashCommandBuilder()
      .setName("developer")
      .setDescription("Shows all the developer commands")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addSubcommand(subcommand =>
        subcommand
        .setName("servers")
        .setDescription("Shows all the servers Oddities is in")),
      developer: true,
    async execute(interaction, client) {
      if (interaction.options.getSubcommand() === 'servers') {

    const list = client.guilds.cache.map(g => `Guild Name: ${g.name}\nTotal Users: ${g.memberCount}\nGuild ID: ${g.id}`).join('\n\n')

      const serverlist = new EmbedBuilder()
        .setTitle(`Currently in ${client.guilds.cache.size} guilds!`)
        .setDescription(list)

    if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;

    interaction.reply({ embeds: [serverlist], ephemeral: true })
      }
   },
};
  