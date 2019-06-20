exports.run = (client, message, args, con) => {

  if (args[0] === "help") {
    message.channel.send("*<react 'emotename' 'message_id/@member'*")
  }

  let member = message.mentions.members.first();

  if (member === message.member) return;

  if (member === undefined) {
    message_id = args[1];
  } else {
    message_id = member.lastMessageID;
  }
  let emojiname = args[0];
  let emoji = client.emojis.find(emoji => emoji.name === emojiname);
  if (emoji === null) {
    console.log("Not a valid emoji.");
    message.delete();
    return;
  }
  let emoji_id = emoji.id;

  //let flickemote = "<a:flick:575297417285599232>"
  //let clownemote = "<a:clown:575297966114340874>"

  //message.channel.send(clownemote);
  //message.channel.send(flickemote);

  // let valid_message_id = message.channel.messages.find(m => {
  //   m.id === message_id;
  // });

   if (message_id === undefined || message_id === null) {
     console.log("Could not find message.");
     message.delete();
     return;
   }

  message.channel.fetchMessage(message_id)
    .then(reactmessage => {
      reactmessage.react(client.emojis.get(emoji_id));
      message.delete();
    })
    .catch(error => {
      message.delete();
      console.log(error);
    });
}
