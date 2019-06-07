exports.run = (client, message, args, con) => {

  if (message.guild) {
    if (message.member.roles.has("585269096019525635")) {
      message.reply("You are not worthy.")
      return;
    }
  }

  for (argnumber = 0; argnumber < args.length; argnumber++) {

    let arg = args[argnumber];

    let emojiname = args[argnumber];
    let emoji = client.emojis.find(emoji => emoji.name === emojiname);
    if (emoji !== null) {
      let emoji_id = emoji.id;
      let isanimated = ""
      if (emoji.animated === true) {
        isanimated = "a"
      }
      args[argnumber] = `<${isanimated}:${emojiname}:${emoji_id}>`
    }
  }



  let text = args.join(" ");
  message.delete();
  message.channel.send(text).catch(console.error);
}
