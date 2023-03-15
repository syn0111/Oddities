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
const verificationModel = require("../../Models/Verification");
const jtcModel = require("../../Models/JoinToCreate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("All setup based commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    /******** VERIFICATION *********/
    .addSubcommand((command) =>
      command
        .setName("verification")
        .setDescription("Setup the verification configuration")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel to send the embed in")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("The role a verified user gets")
            .setRequired(true)
        )
    )

    /******** JTC *********/
    .addSubcommand((command) =>
      command
        .setName("vc")
        .setDescription("Setup the join to create configuration")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel to set")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)
        )
    ),

  /******** VERIFICATION *********/
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "verification") {
      const channel = interaction.options.getChannel("channel");
      const role = interaction.options.getRole("role");

      const button = new ButtonBuilder()
        .setCustomId("captcha-btn")
        .setLabel("Verify")
        .setEmoji("✅")
        .setStyle(ButtonStyle.Success);

      const embed = new EmbedBuilder()
        .setTitle(`Verify yourself in ${interaction.guild.name}`)
        .setDescription(
          "Please Click on `Verify` and solve the captcha within 30 seconds!"
        );

      new verificationModel({
        GuildID: interaction.guild.id,
        Role: role.id,
      }).save();

      interaction.reply({
        content: `Sucessfully setup the verification system in ${channel}!`,
        ephemeral: true,
      });
      return channel.send({
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(button)],
      });
    }

    if (interaction.options.getSubcommand() === "vc") {
      const channel = interaction.options.getChannel("channel");

      new jtcModel({
        Guild: interaction.guild.id,
        Channel: channel.id,
      }).save();

      return interaction.reply({
        content: `Sucessfully setup the join to create system in ${channel}!`,
        ephemeral: true,
      });
    }
  },
};
