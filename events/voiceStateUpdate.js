module.exports = (client, oldMember, newMember) => {
  let oldChannelid = oldMember.voiceChannel ? oldMember.voiceChannel.id : null;
  let newChannelid = newMember.voiceChannel ? newMember.voiceChannel.id : null;
  let oldChannel = oldMember.voiceChannel;
  let newChannel = newMember.voiceChannel;
  if (oldChannelid === newChannelid) {
    return
  } // If there has been no change, exit

  //Get the voiceChannel where something should happen
  if (oldMember.guild.id !== "177135064092639232") return;
  let sendmessageChannelid = oldMember.guild.channels.get('177135064092639233').id;
  let sendmessageChannel = oldMember.guild.channels.get('177135064092639233');

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

    textChannel.send(newMember.displayName + " joined.");

    var variations = 0 ;
    var variation = 0 ;
    var intros = [] ;

    let conn = client.voiceConnections.get(newMember.guild.id);
    if (!conn) throw new Error("The bot is not in a voiceChannel, fix your code.");

    switch (newMember.id) {
      case "268464769562968066" :
        intros = [
          'D:/Programs/bot/gnomius/sounds/Wassap.mp3',
          'D:/Programs/bot/gnomius/sounds/alexintro.mp3',
          'D:/Programs/bot/gnomius/sounds/alexintro2.mp3',
          'D:/Programs/bot/gnomius/sounds/alexintro3.mp3',
          'D:/Programs/bot/gnomius/sounds/alexintro4.mp3',
          'D:/Programs/bot/gnomius/sounds/alexintro5.mp3',
          'D:/Programs/bot/gnomius/sounds/arminintro.mp3',
          'D:/Programs/bot/gnomius/sounds/arminintro2.mp3',
          'D:/Programs/bot/gnomius/sounds/alexintro8.mp3',
          'D:/Programs/bot/gnomius/sounds/alexintro9.mp3'
        ]
        variations = intros.length ;
        variation = Math.floor(Math.random() * (+variations));

        conn.playFile(intros[variation]);

        break;

      case "260938555071791104" :
        intros = [
          'D:/Programs/bot/gnomius/sounds/watchyojet.mp3',
          'D:/Programs/bot/gnomius/sounds/aliintro.mp3',
          'D:/Programs/bot/gnomius/sounds/aliintro3.mp3'
        ]
        variations = intros.length ;
        variation = Math.floor(Math.random() * (+variations));

        conn.playFile(intros[variation]);

        break;

      case "173741422313209857" :
        intros = [
          'D:/Programs/bot/gnomius/sounds/meladintro.mp3',
          'D:/Programs/bot/gnomius/sounds/meladintro2.mp3'
        ]
        variations = intros.length ;
        variation = Math.floor(Math.random() * (+variations));

        conn.playFile(intros[variation]);

        break;

      case "185414973206429696" :
        intros = [
          'D:/Programs/bot/gnomius/sounds/andrewintro.mp3'
        ]
        variations = intros.length ;
        variation = Math.floor(Math.random() * (+variations));

        conn.playFile(intros[variation]);

        break;

      case "277504301532708865" :
        intros = [
          'D:/Programs/bot/gnomius/sounds/dilanintro.mp3'
        ]
        variations = intros.length ;
        variation = Math.floor(Math.random() * (+variations));

        conn.playFile(intros[variation]);

        break;

      case "268188229000232961" :
        intros = [
          'D:/Programs/bot/gnomius/sounds/arminintro3.mp3',
          'D:/Programs/bot/gnomius/sounds/arminintro4.mp3',
          'D:/Programs/bot/gnomius/sounds/arminintro5.mp3'
        ]
        variations = intros.length ;
        variation = Math.floor(Math.random() * (+variations));

        conn.playFile(intros[variation]);

        break;

      case "178304347816329217" :
        intros = [
          'D:/Programs/bot/gnomius/sounds/kaveintro.mp3'
        ]
        variations = intros.length ;
        variation = Math.floor(Math.random() * (+variations));

        conn.playFile(intros[variation]);

        break;

    // case "memberid" :
    //   conn.playFile('D:/Programs/bot/gnomius/sounds/file.mp3');
    //   break;
  }

  } else if (oldChannelid === sendmessageChannelid) {
    if (oldChannel.members.size === 1) {
      oldChannel.leave()
    }
    // console.log("A user left.");
    textChannel.send(newMember.displayName + " left.");
  }
}
