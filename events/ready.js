module.exports = (client) => {
  var joinedGuilds = client.guilds.size;
  console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  client.user.setActivity("you 👀 | " + client.auth.prefixes[0] + "help for help", {type: "WATCHING"});

  //random points lootbox in gnomius server
  var Discord = require("discord.js");
  var min=0;
  var max=10800000;
  var random =Math.floor(Math.random() * (+max - +min)) + +min;
  let channel = client.channels.get(`177135064092639232`);
  let announcementchannel = client.channels.get(`585772005522145282`)

  function lootbox() {
    const filter = response => {
      return "open" === response.content.toLowerCase();
    };
    let lbxgp = 5000 + Math.floor(random/2160);
    let lootboxarrival = new Discord.RichEmbed()
      .setDescription(`A lootbox has just arrived, to open it send a message saying: open`)
      .setColor("#8c8b30")
      .setFooter("© qix", client.user.avatarURL)
      .setTimestamp()
    let lootboxdestroyed = new Discord.RichEmbed()
      .setDescription('The lootbox self-destructed.')
      .setColor("#8c8b30")
      .setFooter("© qix", client.user.avatarURL)
      .setTimestamp()
    channel.send(lootboxarrival).then(() => {
      channel.awaitMessages(filter, { maxMatches: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const lootboxopened = new Discord.RichEmbed()
          .setDescription(`${collected.first().author} opened the lootbox and got ${lbxgp.toString()} gp!`)
          .setColor("#8c8b30")
          .setFooter("© qix", client.user.avatarURL)
          .setTimestamp()
        channel.send(lootboxopened);
        let lbxkey = `${channel.guild.id}-${collected.first().author.id}`;
        //triggers for new users
        client.points.ensure(lbxkey, {
          user: collected.first().author.id,
          guild: channel.guild.id,
          points: 0,
          level: 1,
          gp: 0,
          maxgp: 0
        });


        //increment points
        client.points.math(lbxkey, "+", lbxgp, "gp");

        // Calculate the user's current gp
        const curgp = client.points.get(lbxkey, "gp");

        // Act upon level up by sending a message and updating the user's level in enmap.
        if (client.points.get(lbxkey, "maxgp") < curgp) {
          client.points.set(lbxkey, curgp, "maxgp");
        }
        setTimeout(lootboxcall, 60000)
      })
      .catch(collected => {
        channel.send(lootboxdestroyed);
      })
    })
    return;
  }

  function lootboxcall() {
    let lootboxsent = new Discord.RichEmbed()
      .setDescription(`A new lootbox is on the way, it will arrive within ${max/3600000} hours.`)
      .setColor("#8c8b30")
      .setFooter("© qix", client.user.avatarURL)
      .setTimestamp()
    announcementchannel.send(lootboxsent)
    random = Math.floor(Math.random() * (+max - +min)) + +min;
    setTimeout(lootbox, random)
  }


setTimeout(lootboxcall, 60000)

}
