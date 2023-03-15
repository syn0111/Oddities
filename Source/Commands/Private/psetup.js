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
      .setName("psetup")
      .setDescription("Setup some systems (private)")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addSubcommand(command =>
        command
        .setName("about")
        .setDescription("Setup the about menu")),
      developer: true,
    async execute(interaction, client) {
      if(interaction.options.getSubcommand() === 'about') {
        const embed = new EmbedBuilder()
        .setTitle("About us")
        .setDescription(`
        Syn's Winterland is a welcoming community for anyone who enjoys winter or just would like to chill out with us.
        
        We offer a variety of channels for you to browse, as well as a variety of individuals to socialize with!
        
        Interact with the buttons below to get started!`)
        .setColor(`#a0bdff`)

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Guidelines')
            .setCustomId('p-guidelines')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel('FAQ')
            .setCustomId('p-faq')
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setLabel('Extra Information')
            .setCustomId('p-information')
            .setStyle(ButtonStyle.Secondary),
        )

        interaction.reply({ content: `✅`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [row] })
      }
   },
};
  