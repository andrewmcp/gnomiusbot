exports.run = (client, message, args, con) => {
  if (message.member.hasPermission("MANAGE_EMOJIS", true, true, true) == false && message.author.id !== client.auth.ownerID) {
    message.reply("You are not worthy.")
    return;
  }
  let emojiname = args[0];
  let reason = args[1];

  let emoji = message.guild.emojis.find(e => e.name === emojiname);

  if (emoji === null) {
    message.reply("not valid emote.")
    return;
  }
    message.guild.deleteEmoji(emoji, reason)
    .then(emoji => {
      console.log(`Deleted emoji with name ${emojiname}.`);
      message.reply(`deleted emoji with name **${emojiname}**.`);
    })
    .catch(error => {
      console.log(error);
      message.reply(`emojiname invalid. \n Command should look like: *<delemote "emojiname" "reason"(optional)*`);
    });
}
