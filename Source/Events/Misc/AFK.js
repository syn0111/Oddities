const afkModel = require('../../Models/AFK')

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    try {
    afkModel.findOne({ GuildID: message.guild.id, UserID: message.author.id }, async(err, data) => {
        if(!data) return;
        if (message.content.includes("[afk]")) return;
        if (data.Afk) {
            data.Afk = false;
            data.delete();
            message.reply({ content: `${message.author}, Welcome back! You left <t:${data.Time}:R>.`}).then((m) => {
                setTimeout(() => {
                    m.delete()
                }, 7500);
             })
        }
        return;
    });

    const taggedMembers = message.mentions.members.map(msg => msg.id);

    if (taggedMembers.length > 0) {
        taggedMembers.forEach(m => {
            afkModel.findOne({ GuildID: message.guild.id, UserID: m }, async(err, data) => {
                if(!data) return;
                if (data.Afk) {
                   message.reply({ content: `<@${m}> went AFK <t:${data.Time}:R>.\n> **Status:** ${data.Status}` }).then((m) => {
                    setTimeout(() => {
                        m.delete()
                    }, 7500);
                 })
                }
                return;
            })
        })
    }
} catch(e) {
    return
}
  }
}