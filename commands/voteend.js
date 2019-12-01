exports.run = async function (client, message, args, con) {
  var Discord = require("discord.js");
  if (message.member.hasPermission("ADMINISTRATOR", true, true, true) == false && message.author.id !== client.auth.ownerID) {
    message.reply("You are not worthy.")
    return;
  }
  const decisionsChannel = message.guild.channels.find(channel => channel.name === "decisions")
  const voteChannel = message.guild.channels.find(channel => channel.name === "poll-booth")
  if (!decisionsChannel) return message.channel.send(`It appears that you do not have a decisions channel.`);
  if (!voteChannel) return message.channel.send(`It appears that you do not have a voting channel.`);
  const finalizedvote = await voteChannel.fetchMessage(args[0]).catch()
  if (!finalizedvote) {
    return
  }
  const votesyay = finalizedvote.reactions.filter(r => r.emoji.name == '✔️').map(reaction => reaction.count)[0];
  const votesnay = finalizedvote.reactions.filter(r => r.emoji.name == '❌').map(reaction => reaction.count)[0];
  if (votesyay == undefined) {
    return
  }
  const image = finalizedvote.attachments.size > 0 ? await extension(finalizedvote.attachments.array()[0].url) : '';
  var colour = 3066993
  if (votesnay > votesyay) {
    colour = 15158332
  }
  if (votesnay == votesyay) {
    colour = 12370112
  }
  if (image === '' && finalizedvote.cleanContent.length < 1) return message.channel.send(`${user}, cannot see what you have decided.`);
  const voteembed = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription(finalizedvote.cleanContent)
    .setAuthor(finalizedvote.member.displayName, finalizedvote.author.displayAvatarURL)
    .setTimestamp(new Date())
    .setFooter(`✔️ ${votesyay} / ❌ ${votesnay} | ${finalizedvote.id}`)
    .setImage(image);
  await decisionsChannel.send( voteembed )
    .then(finalizedvote.delete(5000))
    .catch(console.error);

    function extension(attachment) {
      const imageLink = attachment.split('.');
      const typeOfImage = imageLink[imageLink.length - 1];
      const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
      if (!image) return '';
      return attachment;
    }


}
