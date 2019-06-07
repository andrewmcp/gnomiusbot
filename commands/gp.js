exports.run = (client, message, args, con) => {

    const key = `${message.guild.id}-${message.author.id}`;
    let channel = message.guild.channels.find(c => c.name.includes("general"));
    if (channel === null) return message.channel.send("There needs to be a text channel with general in the name for gp to work.");

    switch (args[0]) {
      case undefined :
        return message.reply(`you currently have ${client.points.get(key, "gp")} gp,` +
        ` your highest was ${client.points.get(key, "maxgp")} gp!`);
        break;

      case "help" :
        message.reply("")
        break;

      case "swish" :
        let recipient = message.mentions.members.first();

        let swishamount = Math.floor(parseInt(args[2]));
        if (recipient === undefined || isNaN(swishamount)) return message.reply("you need to specify recipient and amount.");
        if (swishamount < 1) return message.reply("invalid amount.")
        let sendergp = client.points.get(key, "gp");
        if (swishamount > sendergp) return message.reply("you don't have that much gp.")
        let recipientkey = `${message.guild.id}-${recipient.id}`
        //triggers for new users
        client.points.ensure(recipientkey, {
          user: recipient.id,
          guild: message.guild.id,
          points: 0,
          level: 1,
          gp: 0,
          maxgp: 0
        });
        //ajust gp
        client.points.math(recipientkey, "+", swishamount, "gp");
        client.points.math(key, "-", swishamount, "gp");

        message.reply(`you have sent ${swishamount} gp to ${recipient}.`)
        break;

      case "credit" :
        let credit = client.points.get(key, "credit");
        message.reply(`you have ${credit} credit.`)
        break;

      case "gamble" :
        if (args[1] === undefined) return;
        if (message.channel.id === "177135064092639232") return;
        let amountstring = args[1];
        let amount = parseInt(args[1]);
        if (isNaN(amount)) return;
        if (amount === null) return;
        let gp = client.points.get(key, "gp");
        if (amountstring.endsWith("%")) {
          percentage = parseInt(amountstring.replace("%", ""))/100
          amount = Math.floor(gp * percentage)
        }
        if (amount > gp) return message.reply("you don't have that much gp. <a:clown:575297966114340874>");
        if (amount < 1) return message.reply("not valid amount.")
        var min=0;
        var max=2;
        var gamblerandom = Math.floor(Math.random() * (+max - +min)) + +min;
        if (gamblerandom == 0) {

          client.points.math(key, "+", amount, "gp");

          message.reply(`you gambled ${amount} and won, you now have ${client.points.get(key, "gp")} gp.`);

          // Calculate the user's current level
          const curgp = client.points.get(key, "gp");

          // Act upon level up by sending a message and updating the user's level in enmap.
          if (client.points.get(key, "maxgp") < curgp) {
            client.points.set(key, curgp, "maxgp");
          }

        } else {

          client.points.math(key, "-", amount, "gp");

          message.reply(`you gambled ${amount} and lost, you now have ${client.points.get(key, "gp")} gp.`);

          // Calculate the user's current level
          // let curgp = client.points.get(key, "gp");

          // if (curgp === 0) {
          //   curgp = 1
          // }
          // // Act upon level up by sending a message and updating the user's level in enmap.
          // if (client.points.get(key, "level") > curLevel) {
          //   message.channel.send(`${message.author} returned to LV.${curLevel}!`);
          //   client.points.set(key, curLevel, "level");
          // }

        }
        break;

      case "numguess" :
        if (message.channel.id === "177135064092639232") return;
        var lowestnum = 1
        var highestnum = 100
        var randomnumtoguess = Math.floor(Math.random() * (+highestnum+1 - +lowestnum)) + +lowestnum;
        let randomnumtoguessstring = randomnumtoguess.toString()
        let numguessprize = 10000
        const numguessfilter = guessresponse => {
          return message.author === guessresponse.author;
        };
        message.reply(`guess the number between ${lowestnum} and ${highestnum} I'm thinking of.`)
        .then(() => {
          message.channel.awaitMessages(numguessfilter, { maxMatches: 1, time: 15000, errors: ['time'] })
          .then(collected => {
            if (randomnumtoguessstring === collected.first().content.toLowerCase()) {
              message.reply(`HOW DID YOU KNOW I WAS THINKING OF ${randomnumtoguessstring}? Here's ${numguessprize} gp.`);
              let numguesskey = `${channel.guild.id}-${collected.first().author.id}`;
              //triggers for new users
              client.points.ensure(numguesskey, {
                user: collected.first().author.id,
                guild: channel.guild.id,
                points: 0,
                level: 1,
                gp: 0,
                maxgp: 0
              });
              //increment points
              client.points.math(numguesskey, "+", numguessprize, "gp");

              // Calculate the user's current gp
              const curgp = client.points.get(numguesskey, "gp");

              // Act upon level up by sending a message and updating the user's level in enmap.
              if (client.points.get(numguesskey, "maxgp") < curgp) {
                client.points.set(numguesskey, curgp, "maxgp");
              }
            } else {
              message.reply(`the number was ${randomnumtoguessstring}.`)
            }
          })
          .catch(collected => {
            message.reply(`the number was ${randomnumtoguessstring}.`)
          })
        })

        break;

      case "buy" :
        switch (args[1]) {
          case "emote" :
            //code

            break;
        }
        message.reply("feature coming soon!")
        break;

      case "shop" :
        //items in shop

        message.reply("feature coming soon!")
        break;

    }
}
