const {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const afkModel = require("../../Models/AFK");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("utility")
    .setDescription("All utility based commands")
    .addSubcommand((command) =>
      command
        .setName("afk")
        .setDescription("Make yourself go AFK")
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("The reason as to why your going to be AFK")
        )
    ),
  async execute(interaction, client) {

    if (interaction.options.getSubcommand() === 'afk') {
          const afkStatus = interaction.options.getString("reason");

          await afkModel.findOne({ GuildID: interaction.guild.id, UserID: interaction.user.id }, async (err, data) => {
            try {
                if (data) return interaction.reply({ content: `❌ You are already AFK - **${afkStatus}**.`, ephemeral: true });
                if (!data) {
                await afkModel.create({
                    GuildID: interaction.guild.id,
                    UserID: interaction.user.id,
                    Status: afkStatus,
                    Time: parseInt(interaction.createdTimestamp / 1000),
                    Afk: true
                  });
                } else if (data.Afk) {
                    data.Afk = false;
                    data.save();
                } else {
                    data.Afk = true;
                    data.save();
                }
                return interaction.reply(`✅ You are now AFK - **${afkStatus}**`);
                } catch(e) {
                    console.log(e)
                }
            }).clone();
        }
  },
};
