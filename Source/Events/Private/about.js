const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.customId === 'p-guidelines') {
        const embed = new EmbedBuilder()
        .setTitle("<:sw_guidelines:1084217809728458873> Syn's Winterland Guidelines")
        .setDescription(`
        **Common Sense**
        ˪ Think before you act. Take into account the effects of your choices and behave maturely.
        
        **Respect All Individuals**
        ˪ Refrain from discrimination based on age, gender, race, ethnicity, hobby, religion, sexual orientation, or any other characteristic.
        
        **Avoid Drama**
        ˪ If needing to address a problem, do so in a respectful and constructive manner. Avoid attacking or blaming others, and focus on finding a solution.`)
        .setColor(`#a0bdff`)

        interaction.reply({ embeds: [embed], ephemeral: true })
    }

    if (interaction.customId === 'p-faq') {
        const embed = new EmbedBuilder()
        .setTitle("<:sw_faq:1084221238114779158> Frequently Asked Questions")
        .setDescription(`
        Q: How can I obtain colour roles or ping roles?
        ˪ You may find all the obtainable roles within this tab: <id:customize>
        
        Q: How can I become a staff member?
        ˪ Staff applications will be announced in <#1083661074110353479> when they become available; be sure to have the announcements role so that you get alerted`)
        .setColor(`#a0bdff`)

        interaction.reply({ embeds: [embed], ephemeral: true })
    }

    if (interaction.customId === 'p-information') {
        const embed = new EmbedBuilder()
        .setTitle("<:sw_info:1084245086163972209> Extra Information")
        .setDescription(`
        This menu contains other useful information you won't find elsewhere in the server.

        We encourage you to explore these resources to help with any other things you may come across.`)
        .setColor(`#a0bdff`)

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Moderation System')
            .setCustomId('p-modsystem')
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setLabel('Leveling System')
            .setCustomId('p-levelingsystem')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel('Role Information')
            .setCustomId('p-roleinfo')
            .setStyle(ButtonStyle.Secondary),
        )

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
    }
    //EXTRA INFORMATION SECTION
    if (interaction.customId === 'p-modsystem') {
        const embed = new EmbedBuilder()
        .setTitle('<:sw_mod:1084246093535125534> Moderation System')
        .setDescription(`
        When you recieve X amount of warnings then the following will happen:
        
        __1 Warning__
        ˪ 5 minute timeout.

        __2 Warnings__
        ˪ 30 minute timeout.
        
        __3 Warnings__
        ˪ Kick from the server.
        
        __5 Warnings__
        ˪ 1 day timeout.
        
        __6 Warnings__
        ˪ Ban from the server (appeal decided by the moderation team).
        
        Also note that the punishment may vary depending on the timespan between each warning.`)
        .setColor(`#a0bdff`)

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Moderation System')
            .setCustomId('p-modsystem')
            .setDisabled(true)
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setLabel('Leveling System')
            .setCustomId('p-levelingsystem')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel('Role Information')
            .setCustomId('p-roleinfo')
            .setStyle(ButtonStyle.Secondary),
        )

        interaction.update({ embeds: [embed], components: [row] })
    }

    if (interaction.customId === 'p-levelingsystem') {
        const embed = new EmbedBuilder()
        .setTitle('<:sw_leveling:1084320663260639292> Leveling System')
        .setDescription(`
        In order to encourage you to participate in conversation, we've decided to include leveling rewards, which are as follows:
        
        __Level 5__
        ˪ Level 5 Role
        
        __Level 10__
        ˪ Level 10 Role, Access to <#1084227737163661444>

        __Level 15__
        ˪ Level 15 Role, Ability to send links in all channels
        
        __Level 20__
        ˪ Level 20 Role, 2x Chance to win in Giveaways
        
        __Level 25__
        ˪ Level 25 Role, Anomalous perks
        
        More rewards will be added as more people achieve Level 25`)
        .setColor(`#a0bdff`)

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Moderation System')
            .setCustomId('p-modsystem')
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setLabel('Leveling System')
            .setCustomId('p-levelingsystem')
            .setDisabled(true)
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel('Role Information')
            .setCustomId('p-roleinfo')
            .setStyle(ButtonStyle.Secondary),
        )

        interaction.update({ embeds: [embed], components: [row] })
    }

    if (interaction.customId === 'p-roleinfo') {
        const embed = new EmbedBuilder()
        .setTitle('<:sw_members:1084321450560864356> Role Information')
        .setDescription(`
        Interact with the buttons below to view each category and get a brief description of each role and how you can obtain them.`)
        .setColor(`#a0bdff`)

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Back')
            .setCustomId('p-back')
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setLabel('Staff Roles')
            .setCustomId('p-rolestaff')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel('Member Roles')
            .setCustomId('p-rolesmember')
            .setStyle(ButtonStyle.Secondary),
        )

        interaction.update({ embeds: [embed], components: [row] })
    }
    //ROLE INFORMATION SECTION

    if (interaction.customId === 'p-rolestaff') {
        const embed = new EmbedBuilder()
        .setTitle('<:sw_staff:1084245656518004776> Staff Roles')
        .setDescription(`
        <@&1084230491894460546>
        ˪ This role is only avaliable to syn himself and cannot be obtained by anyone else.
        
        <@&1084232151677026405>
        ˪ Everyone who has this role manage staff and the community to make sure both sides are functioning well.

        <@&1084232035725488178>
        ˪ Staff that have this role do exeedingly well in their field and are able to train new staff.
        
        <@&1084231970978017390>
        ˪ Staff with this role have been a moderator for a while now and do well moderating the server.
        
        <@&1083710406092128308>
        ˪ Staff with this role are most likely new and have just been trained.

        <@&1084231623668662382>
        ˪ Anyone with this role are awaiting training to be promoted to <@&1083710406092128308>.`)
        .setColor(`#a0bdff`)

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Back')
            .setCustomId('p-back')
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setLabel('Staff Roles')
            .setCustomId('p-rolestaff')
            .setDisabled(true)
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel('Member Roles')
            .setCustomId('p-rolesmember')
            .setStyle(ButtonStyle.Secondary),
        )

        interaction.update({ embeds: [embed], components: [row] })
    }

    if (interaction.customId === 'p-rolesmember') {
        const embed = new EmbedBuilder()
        .setTitle('<:sw_members:1084321450560864356> Member Roles')
        .setDescription(`
        <@&1084238686222299136>
        ˪ Individuals who either are well known, have a high follower/subscriber count or are a popular bot developer.
        
        <@&1084237679266381824>
        ˪ People who have befriended syn either digitally or in real life.

        <@&1084244742054871130>
        ˪ Every bot that are made by friends or that the developers in the server.

        <@&1083682812231692318>
        ˪ All the amazing people who've joined this server, like you 💙.
        
        <@&1083710194858594446>
        ˪ All other bots that aren't owned by syn.`)
        .setColor(`#a0bdff`)

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Back')
            .setCustomId('p-back')
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setLabel('Staff Roles')
            .setCustomId('p-rolestaff')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel('Member Roles')
            .setCustomId('p-rolemember')
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
        )

        interaction.update({ embeds: [embed], components: [row] })
    }

    if (interaction.customId === 'p-back') {
        const embed = new EmbedBuilder()
        .setTitle("<:sw_info:1084245086163972209> Extra Information")
        .setDescription(`
        This menu contains other useful information you won't find elsewhere in the server.

        We encourage you to explore these resources to help with any other things you may come across.`)
        .setColor(`#a0bdff`)

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Moderation System')
            .setCustomId('p-modsystem')
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setLabel('Leveling System')
            .setCustomId('p-levelingsystem')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setLabel('Role Information')
            .setCustomId('p-roleinfo')
            .setStyle(ButtonStyle.Secondary),
        )

        interaction.update({ embeds: [embed], components: [row] })
    }
  },
};
