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
const randomPuppy = require("random-puppy");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("image")
    .setDescription("Generates an image of your choice")
    .addSubcommand((subcommand) =>
      subcommand
      .setName("meme")
      .setDescription("Generates a meme")
    )
    .addSubcommand((subcommand) =>
    subcommand
    .setName("cat")
    .setDescription("Generates a picture of a cat")
  )
  .addSubcommand((subcommand) =>
  subcommand
  .setName("dog")
  .setDescription("Generates a picture of a dog")
),
  async execute(interaction, client) {
    const { options, user } = interaction;

    if (options.getSubcommand() === "meme") {
      try {
      fetch(
        `https://www.reddit.com/r/memes` + `.json?sort=top&t=week&limit=100`
      )
        .then((res) => res.json())
        .then(async (json) => {
          let i = Math.floor(Math.random() * json.data.children.length);

          let image = json.data.children[i].data.url;
          let caption = json.data.children[i].data.title;
          let author = json.data.children[i].data.author;

          let embed = new EmbedBuilder()
            .setTitle(caption)
            .setImage(image)
            .setColor("Random")
            .setFooter({
              text: `👥 ${author} | 👍 ${json.data.children[i].data.ups} | 💬 ${json.data.children[i].data.num_comments}`,
            });

          interaction.reply({ embeds: [embed] });
        })
    } catch(err) {
      console.log(err)
      return interaction.reply({ content: `Please try agian`, ephemeral: true })
    }
    }

    else if (options.getSubcommand() === 'cat') {
      try {
      fetch(
        `https://www.reddit.com/r/catpics` + `.json?sort=top&t=week&limit=100`
      )
        .then((res) => res.json())
        .then(async (json) => {
          let i = Math.floor(Math.random() * json.data.children.length);

          let image = json.data.children[i].data.url;
          let caption = json.data.children[i].data.title;
          let author = json.data.children[i].data.author;

          let embed = new EmbedBuilder()
            .setTitle(caption)
            .setImage(image)
            .setColor("Random")
            .setFooter({
              text: `👥 ${author} | 👍 ${json.data.children[i].data.ups} | 💬 ${json.data.children[i].data.num_comments}`,
            });

          interaction.reply({ embeds: [embed] });
        })
      } catch(err) {
        console.log(err)
        return interaction.reply({ content: `Please try agian`, ephemeral: true })
      }
    }

    else if (options.getSubcommand() === 'dog') {
      try {
      fetch(
        `https://www.reddit.com/r/DogPics` + `.json?sort=top&t=week&limit=100`
      )
        .then((res) => res.json())
        .then(async (json) => {
          let i = Math.floor(Math.random() * json.data.children.length);

          let image = json.data.children[i].data.url;
          let caption = json.data.children[i].data.title;
          let author = json.data.children[i].data.author;

          let embed = new EmbedBuilder()
            .setTitle(caption)
            .setImage(image)
            .setColor("Random")
            .setFooter({
              text: `👥 ${author} | 👍 ${json.data.children[i].data.ups} | 💬 ${json.data.children[i].data.num_comments}`,
            });

          interaction.reply({ embeds: [embed] });
        })
      } catch(err) {
        console.log(err)
        return interaction.reply({ content: `Please try agian`, ephemeral: true })
      }
    }
  },
};
