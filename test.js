exports.run = (client, message, args, con) => {
  if (message.author.id !== client.auth.ownerID) {
    message.reply("You are not worthy.")
    return;
  }

  let voiceChannel = client.channels.get('177135064092639233')
  let gnomiusjoined = voiceChannel.members.has('575452295509180443');

  if (voiceChannel.joinable && !gnomiusjoined) {
    voiceChannel.join()
      .then(connection => console.log('Connected!'))
      .catch(console.error);
  }

  let conn = client.voiceConnections.get(voiceChannel.guild.id);
  if (!conn) throw new Error("The bot is not in a voiceChannel, fix your code.");

  let path = 'D:/Programs/bot/gnomius/sounds/aliintro3.mp3';
  conn.playFile(path);

}
