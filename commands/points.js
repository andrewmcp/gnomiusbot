exports.run = (client, message, args, con) => {

  const key = `${message.guild.id}-${message.author.id}`;
  let channel = client.channels.get(`177135064092639232`);

  switch (args[0]) {
    case undefined :
      return message.reply(`you currently have ${client.points.get(key, "points")} points,` +
      ` and are level ${client.points.get(key, "level")}!`);
      break;
    case "cleanup" :
      if (message.author.id !== client.auth.ownerID) {
        message.reply("You are not worthy.")
        return;
      }
      // Let's clean up the database of all "old" users,
      // and those who haven't been around for... say a month.

      // Get a filtered list (for this guild only).
      const filtered = client.points.filter( p => p.guild === message.guild.id );

      // We then filter it again (ok we could just do this one, but for clarity's sake...)
      // So we get only users that haven't been online for a month, or are no longer in the guild.
      const rightNow = new Date();
      const toRemove = filtered.filter(data => {
        return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
      });

      toRemove.forEach(data => {
        client.points.delete(`${message.guild.id}-${data.user}`);
      });

      message.channel.send(`I've cleaned up ${toRemove.size} old farts.`);

      break;

    case "gamble" :
      if (args[1] === undefined) return;
      if (message.channel.id === "177135064092639232") return;
      let amountstring = args[1];
      let amount = parseInt(args[1]);
      if (isNaN(amount)) return;
      if (amount === null) return;
      let points = client.points.get(key, "points");
      if (amountstring.endsWith("%")) {
        percentage = parseInt(amountstring.replace("%", ""))/100
        amount = Math.floor(points * percentage)
      }
      if (amount > points) return message.reply("you don't have that many points. <a:clown:575297966114340874>");
      var min=0;
      var max=2;
      var random =Math.floor(Math.random() * (+max - +min)) + +min;
      if (random == 0) {

        client.points.math(key, "+", amount-1, "points");

        message.reply(`you gambled ${amount} and won, you now have ${client.points.get(key, "points")} points.`);

        // Calculate the user's current level
        const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));

        // Act upon level up by sending a message and updating the user's level in enmap.
        if (client.points.get(key, "level") < curLevel) {
          channel.send(`${message.author} grew to LV.${curLevel}!`);
          client.points.set(key, curLevel, "level");
        }

      } else {

        client.points.math(key, "-", amount, "points");

        message.reply(`you gambled ${amount} and lost, you now have ${client.points.get(key, "points")} points.`);

        // Calculate the user's current level
        let curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
        if (curLevel === 0) {
          curLevel = 1
        }

        // // Act upon level up by sending a message and updating the user's level in enmap.
        // if (client.points.get(key, "level") > curLevel) {
        //   message.channel.send(`${message.author} returned to LV.${curLevel}!`);
        //   client.points.set(key, curLevel, "level");
        // }

      }

      break;

    // case "refresh" :
    //   if (message.author.id !== client.auth.ownerID) {
    //     message.reply("You are not worthy.")
    //     return;
    //   }
    //
    //   // Get a filtered list (for this guild only).
    //   const filtered1 = client.points.filter( p => p.guild === message.guild.id );
    //
    //   const toRefresh = filtered1.filter(data => {
    //     return message.guild.members.find(data.user).id;
    //   });
    //
    //   toRefresh.forEach(data => {
    //     var forKey = `${message.guild.id}-${data.user.id}`;
    //     var forCurLevel = Math.floor(0.1 * Math.sqrt(client.points.get(forKey, "points")));
    //     client.points.set(forKey, forCurLevel, "level");
    //   });
    //
    //   break;

    case "test" :
      if (message.author.id !== client.auth.ownerID) {
        message.reply("You are not worthy.")
        return;
      }
      //console.log(client.points)
      // client.points.ensure(`${message.guild.id}-userid`, {
      //   user: "173741422313209857",
      //   guild: message.guild.id,
      //   points: 0,
      //   level: 1
      // });

      //client.points.set(`${message.guild.id}-185414973206429696`,2977 , "points")
      //client.points.set(`${message.guild.id}-userid`,5 , "level")

      //client.points.delete(`${message.guild.id}-185414973206429696`);

       break;

  }
}
