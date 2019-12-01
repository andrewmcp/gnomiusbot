exports.run = (client, message, args, con) => {
  if (message.author.id !== client.auth.ownerID) {
    message.reply("You are not worthy.")
    return;
  }

  const key = `${message.member.guild.id}-${message.member.id}`;
  const request = require('request');

  let voiceChannel = client.channels.get('177135064092639233')
  let gnomiusjoined = voiceChannel.members.has('575452295509180443');

  if (voiceChannel.joinable && !gnomiusjoined) {
    voiceChannel.join()
      .then(connection => console.log('Connected!'))
      .catch(console.error);
  }

  let conn = client.voiceConnections.get(voiceChannel.guild.id);
  if (!conn) return console.log("fix code");

  //let path = '';
  //conn.playFile(path);
  let entrancesounds = client.entrance.get(key, "sounds")
  if (entrancesounds === undefined || entrancesounds == 0) return;
  variations = entrancesounds.length ;
  variation = Math.floor(Math.random() * (+variations));
  const streamOptions = { seek: 0, volume: 1 };
  let readablestream = request.get(entrancesounds[variation]);
  const dispatcher = conn.playStream(readablestream, streamOptions);
}
