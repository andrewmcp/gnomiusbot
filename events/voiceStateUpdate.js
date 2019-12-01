module.exports = (client, oldMember, newMember) => {
  if (newMember.user.bot) return;
  let oldChannelid = oldMember.voiceChannel ? oldMember.voiceChannel.id : null;
  let newChannelid = newMember.voiceChannel ? newMember.voiceChannel.id : null;
  let oldChannel = oldMember.voiceChannel;
  let newChannel = newMember.voiceChannel;
  const key = `${newMember.guild.id}-${newMember.id}`;
  const request = require('request');
  if (oldChannelid === newChannelid) {
    return
  } // If there has been no change, exit

  //Get the voiceChannel where something should happen
  if (oldMember.guild.id !== "177135064092639232") return;
  let sendmessageChannelid = oldMember.guild.channels.get('598591818552049700').id;
  let sendmessageChannel = oldMember.guild.channels.get('598591818552049700');

  let gnomiusjoined = sendmessageChannel.members.has('575452295509180443');


  // Here I'm getting the bot's channel (bot.voiceChannel does not exist)
  //let gnomiusMember = oldMember.guild.member(client.user),
    //gnomiusChannel = gnomiusMember ? gnomiusMember.voiceChannel.id : null;


  // Here I'm getting the channel, just replace VVV this VVV with the channel's ID
  let textChannel = oldMember.guild.channels.get('177135064092639232');
  //let textChannel = oldMember.guild.channels.get(`585772005522145282`);
  if (!textChannel) {
    console.log("That channel does not exist.")
    return
  }

  // Here I don't need to check if they're the same, since it would've exit before
  if (newChannelid === sendmessageChannelid) {
    //join channel if person joins the channel so we can count points when they speak
    if (newChannel.joinable && !newMember.user.bot && !gnomiusjoined) {
      newChannel.join()
        .then(connection => console.log('Connected!'))
        .catch(console.error);
    }


    // console.log("A user joined.");
    if (newMember.id === '173741422313209857') {
      textChannel.send(newMember.displayName + " joined.");
    }

    var variations = 0 ;
    var variation = 0 ;

    //triggers for new users
    client.entrance.ensure(key, {
      user: newMember.id,
      guild: newMember.guild.id,
      sounds: []
    });

    let entrancesounds = client.entrance.get(key, "sounds")
    //console.log(entrancesounds)

    let conn = client.voiceConnections.get(newMember.guild.id);
    if (!conn) throw new Error("The bot is not in a voiceChannel, fix your code.");

    if (newMember.roles.has("585269096019525635")) {
      return;
    }

    if (entrancesounds === undefined || entrancesounds == 0) return;
    variations = entrancesounds.length ;
    variation = Math.floor(Math.random() * (+variations));
    const streamOptions = { seek: 0, volume: 1 };
    let readablestream = request.get(entrancesounds[variation]);
    const dispatcher = conn.playStream(readablestream, streamOptions);

  } else if (oldChannelid === sendmessageChannelid) {
    if (oldChannel.members.size === 1) {
      oldChannel.leave()
    }
    // console.log("A user left.");
    if (newMember.id === '173741422313209857') {
      textChannel.send(newMember.displayName + " left.");
    }
    //textChannel.send(newMember.displayName + " left.");
  }
}
