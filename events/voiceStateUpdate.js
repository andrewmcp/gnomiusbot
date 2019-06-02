module.exports = (client, oldMember, newMember) => {
  let oldChannel = oldMember.voiceChannel ? oldMember.voiceChannel.id : null;
  let newChannel = newMember.voiceChannel ? newMember.voiceChannel.id : null;
  if (oldChannel === newChannel) {

    return
  } // If there has been no change, exit

  //Get the voiceChannel where something should happen
  let sendmessageChannel = oldMember.guild.channels.get('177135064092639233').id;
  
  // Here I'm getting the bot's channel (bot.voiceChannel does not exist)
  //let gnomiusMember = oldMember.guild.member(client.user),
    //gnomiusChannel = gnomiusMember ? gnomiusMember.voiceChannel.id : null;

  //var server = servers[gnomiusMember.guild.id];

  // Here I'm getting the channel, just replace VVV this VVV with the channel's ID
  let textChannel = oldMember.guild.channels.get('177135064092639232');
  if (!textChannel) {
    console.log("That channel does not exist.")
    return
  }

  // Here I don't need to check if they're the same, since it would've exit before
  if (newChannel === sendmessageChannel) {
    // console.log("A user joined.");

    //server.dispatcher = gnomiusMember.voiceConnection.playFile('./audiofile.mp3');

    textChannel.send(newMember.displayName + " joined.");

    if (newMember.id === "268464769562968066") {
      for (i = 0; i < 2; i++) {
        textChannel.send("WASA")
      }
      textChannel.send("WASSUP\nBITCONNEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEECT ")
      textChannel.send("<:bitconnect:582219526406537218>")
    }

    if (newMember.id === "260938555071791104") {
      textChannel.send("I'll just be butt ass naked so the wind can be hitting my balls and shit\n\n\n"+
      "ay bro watch yo jet\nwatch you jet bro\n\nWATCH YOU JET")
    }

  } else if (oldChannel === sendmessageChannel) {
    // console.log("A user left.");
    textChannel.send(newMember.displayName + " left.");
  }
}
