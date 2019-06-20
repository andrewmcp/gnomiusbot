exports.run = (client, message, args, con) => {
  let imageurl = args[0];
  let emojiname = args[1];

  console.log(imageurl);

    message.guild.createEmoji(imageurl, emojiname)
    .then(emoji => {
      console.log(`Created new emoji with name ${emojiname}.`);
      message.reply(`created emoji with name **${emojiname}**.`);
    })
    .catch(error => {
      console.log(error);
      message.reply(`image url or emojiname invalid or file too large. \n Command should look like: *<newemote "imageurl" "emojiname"*`);
    });
}
