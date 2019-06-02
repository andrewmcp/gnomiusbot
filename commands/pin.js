exports.run = (client, message, args, con) => {
  let message_id = args[0];
  message.channel.fetchMessage(message_id)
    .then(message => { message.pin() })
    .catch(console.error);
}
