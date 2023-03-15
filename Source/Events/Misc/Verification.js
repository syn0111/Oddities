const { Client, CommandInteraction, InteractionType, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const { Captcha } = require('captcha-canvas')
const verificationModel = require('../../Models/Verification')

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.customId === 'captcha-btn') {
        interaction.reply({ content: `Check your direct messages`, ephemeral: true })
    verificationModel.findOne({ GuildID: interaction.guild.id }, async(err, data) => {
        if (!data) return;

        const { member, guild } =  interaction;

        const captcha = new Captcha();
        captcha.async = true;
        captcha.addDecoy();
        captcha.drawTrace();
        captcha.drawCaptcha();

        const captchaAttachment = new AttachmentBuilder(await captcha.png)
        .setName("captcha.png");

        const captchaEmbed = new EmbedBuilder()
        .setDescription("Please complete this captcha within 30 seconds!")
        .setImage('attachment://captcha.png')

        try {
            const msg = await member.user.send({files: [captchaAttachment], embeds: [captchaEmbed]})
            
            const wrongCaptchaEmbed = new EmbedBuilder()
            .setDescription("🚫 Wrong Captcha");

            const filter_ = (message) => {
                if(message.author.id !== member.id) return;
                if (message.author.bot) return;
                if(message.content === captcha.text) {
                    return true;
                } else {
                    member.send({ embeds: [wrongCaptchaEmbed] })
                }
            }

            try {
                const response = await msg.channel.awaitMessages({
                    filter: filter_,
                    max: 1,
                    time: 30*1000,
                    errors: ["time"]});

                if(response) {
                    verificationModel.findOne({ GuildID: member.guild.id }, async (err, data) => {
                        if(!data) return;
                        if(!data.Role) return;

                        const role = member.guild.roles.cache.get(data.Role)
                        member.roles.add(role)
                        member.user.send("`✅ You have been successfully verified!`");
                    })
                } else {
                    member.user.send("`❌ You didn't verify!`");
                }

            } catch (error) {
                console.log(error)
                return member.user.send("I cannot verify you as I don't have permission to give the role, please contact a Server Administrator to fix this.")
            }

        } catch (error) {
            return console.log(error)
        }
    })
   }
  }
}