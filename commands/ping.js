exports.run = (client, message, args, con) => {
    message.channel.send("pong. " + (new Date().getTime() - message.createdTimestamp) + "ms").catch(console.error);
}
