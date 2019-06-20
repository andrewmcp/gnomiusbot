exports.run = (client, message, args, con) => {

  //WORKING

  const key = `${message.guild.id}-${message.author.id}`;

  const request = require('request');

  //triggers for new users
  client.entrance.ensure(key, {
    user: message.author.id,
    guild: message.guild.id,
    sounds: []
  });

  let entrancesounds = client.entrance.get(key, "sounds")

    if (args[0] === "test") {
      if (message.author.id !== client.auth.ownerID) {
        message.reply("You are not worthy.")
        return;
      }
      console.log(client.entrance)

      console.log(entrancesounds)

      let conn = client.voiceConnections.get(message.guild.id);
      if (!conn) throw new Error("The bot is not in a voiceChannel, fix your code.");

      if (entrancesounds === undefined || entrancesounds == 0) return;

      variations = entrancesounds.length ;
      variation = Math.floor(Math.random() * (+variations));
      const testOptions = { seek: 0, volume: 1 };
      let teststream = request.get(entrancesounds[variation]);
      const dispatcher = conn.playStream(teststream, testOptions);
      console.log(entrancesounds[variation])

      //client.entrance.remove(key, 'https://instaud.io/_/3Q8v.mp3', "sounds")
    }



  if (args[1] === undefined) return;
  if (args[1].includes("https://instaud.io/")) {
    request(args[1], function(err, res, body) {
      bodysplit = body.split('data-instaudio-player-file=').pop();
      mp3urlwithslashes = bodysplit.split('data-instaudio-player-spectrogram=')[0];
      mp3url = mp3urlwithslashes.split('"')[1];

      if (args[0] === "add") {

        client.entrance.push(key, mp3url, "sounds")
        message.reply(`you added ${mp3url} to your entrance sounds.`)

        const streamOptions = { seek: 0, volume: 1 };
        var voiceChannel = message.member.voiceChannel;
        if (voiceChannel === undefined) return;
        voiceChannel.join().then(connection => {
          console.log("joined channel");
          let readablestream = request.get(mp3url);
          const dispatcher = connection.playStream(readablestream, streamOptions);
          dispatcher.on("end", end => {
          });
        }).catch(err => console.log(err));

        console.log(mp3url);
        console.log(typeof mp3url);
      }

      if (args[0] === "remove") {
        if (entrancesounds.includes(mp3url)) {
          client.entrance.remove(key, mp3url, "sounds")
          message.reply(`you removed ${mp3url} from your entrance sounds.`)
        }
        if (entrancesounds.includes(args[1])) {
          client.entrance.remove(key, args[1], "sounds")
          message.reply(`you removed ${args[1]} from your entrance sounds.`)
        }
      }
    })
  }
}
