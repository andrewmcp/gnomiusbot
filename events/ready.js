module.exports = (client) => {
  var joinedGuilds = client.guilds.size;
  console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  client.user.setActivity("you 👀 | " + client.auth.prefixes[0] + "help for help", {type: "WATCHING"});

  //random points lootbox in gnomius server
  var min=0;
  var max=21600000;
  var random =Math.floor(Math.random() * (+max - +min)) + +min;
  let channel = client.channels.get(`177135064092639232`);

  function lootbox() {
    const filter = response => {
      return "open" === response.content.toLowerCase();
    };
    let lbxpoints = 500 + Math.floor(random/43200);
    channel.send("A lootbox has just arrived, to open it send a message saying: open").then(() => {
      channel.awaitMessages(filter, { maxMatches: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        channel.send(`${collected.first().author} opened the lootbox and got ${lbxpoints.toString()} points!`);
        let lbxkey = `${channel.guild.id}-${collected.first().author.id}`;
        //triggers for new users
        client.points.ensure(lbxkey, {
          user: collected.first().author.id,
          guild: channel.guild.id,
          points: 0,
          level: 1
        });

        //increment points
        client.points.math(lbxkey, "+", lbxpoints, "points");

        // Calculate the user's current level
        const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(lbxkey, "points")));

        // Act upon level up by sending a message and updating the user's level in enmap.
        if (client.points.get(lbxkey, "level") < curLevel) {
          channel.send(`${collected.first().author} grew to LV.${curLevel}!`);
          client.points.set(lbxkey, curLevel, "level");
        }
      })
      .catch(collected => {
        channel.send('Too late, the lootbox self-destructed.');
      })
    })
    return;
  }

channel.send(`A new lootbox is on the way, it will arrive within ${max/3600000} hours.`)
setTimeout(lootbox, random)

}
