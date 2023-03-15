const { ChannelType, GuildVoice, Collection, EmbedBuilder } = require('discord.js');
const schema = require('../../Models/JoinToCreate');
let voiceManager = new Collection()

module.exports = {
    name: "voiceStateUpdate",
    async execute(oldState, newState, client) {
    try {
    const { member, guild } = oldState;
    const newChannel = newState.channel;
    const oldChannel = oldState.channel;

    const data = await schema.findOne({ Guild: guild.id })
    if (!data) return;

    if (data) {
        const channelid = data.Channel;
        const channel = client.channels.cache.get(channelid)

        if (oldChannel !== newChannel && newChannel && newChannel.id === channel.id) {
            const voiceChannel = await guild.channels.create({
                name: `${member.user.tag}`, 
                type: ChannelType.GuildVoice,
                parent: newChannel.parent,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: ["Connect", "ManageChannels"],
                    },
                    {
                        id: guild.id,
                        allow: ["Connect"],
                    },
                ],
            })/*.then(async (channel) => {
                const embed = new EmbedBuilder()
                .setTitle(`Guide for Custom VC's`)
                .setDescription(`
Hey there! I see that you've made a custom vc, below will be some things to help you customise this voice channel.

__Customization__
> To customise your voice channel, I have given you permission to edit the channel fully. This means you can rename it, change the bitrate and anything else that you would like.
    `)
            })*/

            voiceManager.set(member.id, voiceChannel.id);

            await newChannel.permissionOverwrites.edit(member, {
                Connect: false
            });
            setTimeout(() => {
                newChannel.permissionOverwrites.delete(member)
            }, 30000)

            return setTimeout(() => {
                member.voice.setChannel(voiceChannel)
            }, 500)
        }

        const jointocreate = voiceManager.get(member.id);
        const members = oldChannel?.members
        .filter((m) => !m.user.bot)
        .map((m) => m.id)

        if (
            jointocreate &&
            oldChannel.id === jointocreate &&
            (!newChannel || newChannel.id !== jointocreate)
        ) {
            if (members.length > 0) {
                let randomID = members(Math.floor(Math.random() * members.length));
                let randomMember = guild.members.cache.get(randomID);
                randomMember.voice.setChannel(oldChannel).then((v) => {
                    oldChannel.setName(randomMember.user.username).catch((e) => null);
                    oldChannel.permissionOverwrites.edit(randomMember, {
                        Connect: true,
                        ManageChannels: true
                    })
                })
                voiceManager.set(member.id, null)
                voiceManager.set(randomMember.id, oldChannel.id)
            } else {
                voiceManager.set(member.id, null)
                oldChannel.delete().catch((e) => null)
            }
        }
    }
 } catch(err) {
    return console.log(err);
   }
 }
}