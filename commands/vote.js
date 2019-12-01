exports.run = async function(client, message, args, con) {
  const voteChannel = message.guild.channels.find(channel => channel.name === "poll-booth")
  if (message.channel == voteChannel) {
    const fetchVoteMessages = await voteChannel.fetchMessages({limit: 100});
    const numberofvotes = fetchVoteMessages.array().length
    const maxvotes = 3
    if (numberofvotes > maxvotes) {
      message.delete()
      return
    }
  }

  message_id = message.channel.lastMessageID
  message.channel.fetchMessage(message_id)
    .then(async reactmessage => {
      await reactmessage.react("✔️");
      await reactmessage.react("❌");
    })
    .catch(error => {
    console.log(error);
    });
}
