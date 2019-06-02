exports.run = (client, message, args, con) => {
  let text = args.join(" ");
  message.delete();
  message.channel.send(text, {tts: true});
}
