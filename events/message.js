module.exports = (client, message) => {
  // Ignore all bots
  //if (message.author.bot) return;

  //Bully user every time they message
  if (message.author.id == 277504301532708865) {
    var min=0;
    var max=2;
    var random =Math.floor(Math.random() * (+max - +min)) + +min;
    if (random == 0) {
      //let random_emoji_id = message.guild.emojis.random().id;
      //message.react(random_emoji_id);
      let responses = [
        "Voad",
        "Qix",
        "Vafoang",
        "<a:clown:575297966114340874>",
        "<a:popcorn:582244908488851486>",
        "<:drowzee:568892986822492160>",
        "<:dilan2:581823027843563542>"
      ];
      var randomresponse = responses[Math.floor(Math.random()*responses.length)];
      message.channel.send(randomresponse);
    }
  }

  //react to words
  if (message.content.toLowerCase().includes(client.words.react.join("|"))) {
    message.react(client.emojis.get('582279381905571853')).catch(console.error);
  }

  //Point system

  if (message.guild && !message.author.bot) {
    let channel = message.guild.channels.find(c => c.name.includes("general"));

    const key = `${message.guild.id}-${message.author.id}`;

    //triggers for new users
    client.points.ensure(key, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1,
      gp: 0,
      maxgp: 0
    });

    //client.points.delete(`${message.guild.id}-173741422313209857`);

    if (message.channel === channel) {

      //increment points
      client.points.inc(key, "points");
      client.points.math(key, "+", 10, "gp");

      // Calculate the user's current level
      const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
      const curgp = client.points.get(key, "gp")

      // Act upon level up by sending a message and updating the user's level in enmap.
      if (client.points.get(key, "level") < curLevel) {
        channel.send(`${message.author} grew to LV.${curLevel}!`);
        client.points.set(key, curLevel, "level");
      }
      if (client.points.get(key, "maxgp") < curgp) {
        client.points.set(key, curgp, "maxgp");
      }
    }
  }

  //Ignore messages not starting with any of the prefixes in gnomius_auth.json
  const prefixes = client.auth.prefixes
  let prefix = false;
  for (const thisPrefix of prefixes) {
    if (message.content.startsWith(thisPrefix)) {
      prefix = thisPrefix;
    }
  }
  if (!prefix) return;

  // // Ignore messages not starting with the prefix (in auth.json)
  // if (!message.content.startsWith(client.auth.prefix)) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;
  // Run the command
  cmd.run(client, message, args);
};
