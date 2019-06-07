module.exports = async function(client, reaction, user) {
  var Discord = require("discord.js");
  var Enmap = require("enmap");
  var fs = require("fs");

  const message = reaction.message;
  let channel = message.guild.channels.find(c => c.name.includes("general"));

  if (reaction.emoji.name !== '⭐') {
    if (channel === null) return;
    if (message.guild && message.author.id !== user.id && !message.author.bot && !user.bot) {

      const messagekey = `${message.guild.id}-${message.author.id}`;
      const reactionkey = `${message.guild.id}-${user.id}`;

      if (reaction.emoji.name === '💉') {

        //triggers for new users
        client.points.ensure(messagekey, {
          user: message.author.id,
          guild: message.guild.id,
          points: 0,
          level: 1,
          gp: 0,
          maxgp: 0
        });
        client.points.ensure(reactionkey, {
          user: user.id,
          guild: message.guild.id,
          points: 0,
          level: 1,
          gp: 0,
          maxgp: 0
        });

        if (message.channel === channel) {

          //increment points
          client.points.math(messagekey, "+", 10, "points");
          client.points.math(reactionkey, "+", 2, "points");

          // Calculate the user's current level
          const curLevelmessage = Math.floor(0.1 * Math.sqrt(client.points.get(messagekey, "points")));
          const curLevelreaction = Math.floor(0.1 * Math.sqrt(client.points.get(reactionkey, "points")));

          // Act upon level up by sending a message and updating the user's level in enmap.
          if (client.points.get(messagekey, "level") < curLevelmessage) {
            channel.send(`${message.author} grew to LV.${curLevelmessage}!`);
            client.points.set(messagekey, curLevelmessage, "level");
          }
          if (client.points.get(reactionkey, "level") < curLevelreaction) {
            channel.send(`${message.author} grew to LV.${curLevelreaction}!`);
            client.points.set(messagekey, curLevelreaction, "level");
          }
        }
      }

      if (reaction.emoji.name === '💰') {

        //triggers for new users
        client.points.ensure(messagekey, {
          user: message.author.id,
          guild: message.guild.id,
          points: 0,
          level: 1,
          gp: 0,
          maxgp: 0
        });
        client.points.ensure(reactionkey, {
          user: user.id,
          guild: message.guild.id,
          points: 0,
          level: 1,
          gp: 0,
          maxgp: 0
        });

        //increment points
        client.points.math(messagekey, "+", 100, "gp");
        //client.points.math(reactionkey, "+", 0, "gp");

        // Calculate the user's current level
        const curgpmessage = client.points.get(messagekey, "gp");
        const curgpreaction = client.points.get(reactionkey, "gp");

        // Act upon level up by sending a message and updating the user's level in enmap.
        if (client.points.get(messagekey, "maxgp") < curgpmessage) {
          client.points.set(messagekey, curgpmessage, "maxgp");
        }
        if (client.points.get(reactionkey, "maxgp") < curgpreaction) {
          client.points.set(messagekey, curgpreaction, "maxgp");
        }
      }
    }
    return;
  }
  //starboard code:
  if (message.author.id === user.id) return message.channel.send(`${user}, you cannot star your own messages.`);

  //if (message.author.bot) return message.channel.send(`${user}, you cannot star bot messages.`);
  //const { starboardChannel } = this.client.settings.get(message.guild.id);
  const starChannel = message.guild.channels.find(channel => channel.name === "starboard")
  if (!starChannel) return message.channel.send(`It appears that you do not have a starboard channel.`);
  const fetchedMessages = await starChannel.fetchMessages({limit: 100});
  const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
  if (stars) {
    const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
    const foundStar = stars.embeds[0];
    const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
    const embed = new Discord.RichEmbed()
      .setColor(foundStar.color)
      .setDescription(foundStar.description)
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .setTimestamp()
      .setFooter(`⭐ ${parseInt(star[1])+1} | ${message.id}`)
      .setImage(image);
    const starMsg = await starChannel.fetchMessage(stars.id);
    await starMsg.edit({ embed });
  }
  if (!stars) {
    if (message.channel == starChannel) return;
    const image = message.attachments.size > 0 ? await extension(reaction, message.attachments.array()[0].url) : '';
    if (image === '' && message.cleanContent.length < 1) return message.channel.send(`${user}, you cannot star an empty message.`);
    const embed = new Discord.RichEmbed()
      .setColor(15844367)
      .setDescription(message.cleanContent + `\n\n[Jump to message](${message.url})`)
      .setAuthor(message.member.displayName, message.author.displayAvatarURL)
      .setTimestamp(new Date())
      .setFooter(`⭐ 1 | ${message.id}`)
      .setImage(image);
    await starChannel.send({ embed });
  }


  // Here we add the this.extension function to check if there's anything attached to the message.
  function extension(reaction, attachment) {
    const imageLink = attachment.split('.');
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return '';
    return attachment;
  }
};




// module.exports = (client, messageReaction) => {
//     let emoji = messageReaction.emoji;
//     let message = messageReaction.message;
//     message.react(emoji);
// }
