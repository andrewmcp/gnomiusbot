exports.run = (client, message, args, con) => {
  if (message.member.hasPermission("MANAGE_MESSAGES", true, true, true) == false && message.author.id !== client.auth.ownerID) {
    message.reply("You are not worthy.")
    return;
  }

  let amount = parseInt(args.join(" "));

  if (Number.isInteger(amount) == true) {
    message.channel.bulkDelete(amount+1);
    if (amount == 1) {
      if (args[1] === "sneaky") {
        return;
      }
      message.reply("cleared 1 message.");
    } else {
      if (args[1] === "sneaky") {
        return;
      }
      message.reply("cleared " + amount.toString() + " messages.");
    }
  } else {
    if (args[0] === "sneaky") {
      message.channel.bulkDelete(1);
      return;
    }
    message.reply("You need to specify number of messages to clear: **.clear {number}**");
  }
}
