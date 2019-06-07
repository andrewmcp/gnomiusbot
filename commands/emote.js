exports.run = (client, message, args, con) => {

  if (args[0] === "help") {
    message.channel.send("*<emote emotename*")
    return;
  }

  let emojis = ``;

  for (emojinumber = 0; emojinumber < args.length; emojinumber++) {

    let emojiname = args[emojinumber];
    let emoji = client.emojis.find(emoji => emoji.name === emojiname);
    if (emoji === null) {
      console.log("Not a valid emoji.");
      message.delete();
      return;
    }
    let emoji_id = emoji.id;
    let isanimated = ""
    if (emoji.animated === true) {
      isanimated = "a"
    }
    emojis += `<${isanimated}:${emojiname}:${emoji_id}> `
  }

  message.channel.send(emojis).catch(console.error)
    .then(message.delete());

}
