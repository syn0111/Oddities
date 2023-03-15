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
      .setName("moderation")
      .setDescription("All the moderation commands!")
      .addSubcommandGroup(group => 
        group
        .setName('warnings')
        .setDescription('All commands to do with warnings')
        
      .addSubcommand(subcomand =>
        subcomand
        .setName('add')
        .setDescription('Warn a user')
        .addUserOption(option =>
            option
            .setName('user')
            .setDescription('The user to warn')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName('reason')
            .setDescription('Reason to warn them (Not Required)')
            )
        )
      ),
    async execute(interaction, client) {
      if (interaction.options.getSubcommand() == 'add') {
        interaction.reply(`${client.new_set}`)
      }
   },
};
  