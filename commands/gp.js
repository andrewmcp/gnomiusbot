exports.run = (client, message, args, con) => {
    var Discord = require("discord.js");
    const key = `${message.guild.id}-${message.author.id}`;
    let channel = message.guild.channels.find(c => c.name.includes("general"));
    if (channel === null) return message.channel.send("There needs to be a text channel with general in the name for gp to work.");
    let gp = client.points.get(key, "gp");
    let credit = client.points.get(key, "credit");

    switch (args[0]) {
      case undefined :
        return message.reply(`you currently have ${client.points.get(key, "gp").toLocaleString()} gp,` +
        ` your highest was ${client.points.get(key, "maxgp").toLocaleString()} gp!`);
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
          maxgp: 0,
          credit: 0,
          pointboost: 0
        });
        //ajust gp
        client.points.math(recipientkey, "+", swishamount, "gp");
        client.points.math(key, "-", swishamount, "gp");

        // Calculate the user's current level
        const curgpafterswish = client.points.get(recipientkey, "gp");

        // Act upon level up by sending a message and updating the user's level in enmap.
        if (client.points.get(recipientkey, "maxgp") < curgpafterswish) {
          client.points.set(recipientkey, curgpafterswish, "maxgp");
        }

        message.reply(`you have sent ${swishamount.toLocaleString()} gp to ${recipient}.`)
        break;

      case "loan" :
        let lender = message.mentions.members.first();
        let lendee = message.author
        let loanamount = Math.floor(parseInt(args[2]));
        if (lender === undefined || isNaN(loanamount)) return message.reply("you need to specify lender and amount.");
        if (loanamount < 1) return message.reply("invalid amount.")
        let lenderkey = `${message.guild.id}-${lender.id}`
        let lendergp = client.points.get(lenderkey, "gp");
        if (loanamount > lendergp) return message.reply(`${lender} doesn't have that much gp.`)
        const loanfilter = loandecision => {
          return lender.id === loandecision.author.id;
        };

        message.channel.send(`${lender}, ${message.author} has sent you a loan request for ${loanamount.toLocaleString()} gp.\n`
          + `Please respond with accept or deny.`)
          .then(() => {
            message.channel.awaitMessages(loanfilter, { maxMatches: 1, time: 10000, errors: ['time'] })
            .then(collected => {
              if ("accept" === collected.first().content.toLowerCase()) {

                //triggers for new users
                client.points.ensure(lenderkey, {
                  user: lender.id,
                  guild: message.guild.id,
                  points: 0,
                  level: 1,
                  gp: 0,
                  maxgp: 0,
                  credit: 0,
                  pointboost: 0
                });

                //ajust gp
                client.points.math(lenderkey, "-", loanamount, "gp");
                client.points.math(key, "+", loanamount, "gp");

                //ajust credit
                client.points.math(lenderkey, "+", loanamount, "credit");
                client.points.math(key, "-", loanamount, "credit");

                // Calculate the user's current gp
                const curgpafterlend = client.points.get(lenderkey, "gp");

                // Act upon level up by sending a message and updating the user's level in enmap.
                if (client.points.get(lenderkey, "maxgp") < curgpafterlend) {
                  client.points.set(lenderkey, curgpafterlend, "maxgp");
                }

                message.reply(`you have lent ${loanamount.toLocaleString()} gp to ${lendee}.`);
              } else {
                message.channel.send(`${lendee}, your loan request has been denied.`)
              }
            })
            .catch(collected => {
              message.reply(`Loan request has expired.`)
            })
          })

        break;

      case "credit" :
        message.reply(`you have ${credit.toLocaleString()} credit.`)
        break;

      case "gamble" :
        if (args[1] === undefined) return;
        if (message.channel.id === "177135064092639232") return;
        let amountstring = args[1];
        let amount = parseInt(args[1]);
        if (isNaN(amount)) return;
        if (amount === null) return;
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

          message.reply(`you gambled ${amount.toLocaleString()} and won, you now have ${client.points.get(key, "gp").toLocaleString()} gp.`);

          // Calculate the user's current level
          const curgp = client.points.get(key, "gp");

          // Act upon level up by sending a message and updating the user's level in enmap.
          if (client.points.get(key, "maxgp") < curgp) {
            client.points.set(key, curgp, "maxgp");
          }

        } else {

          client.points.math(key, "-", amount, "gp");

          message.reply(`you gambled ${amount.toLocaleString()} and lost, you now have ${client.points.get(key, "gp").toLocaleString()} gp.`);

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

      case "slots" :
        if (10 > gp) return message.reply("you need 1 gp to play the slot machine.");
        let pagchomp = client.emojis.get("582225271860494356")
        let drowzee = client.emojis.get("568892986822492160")
        let gnome = client.emojis.get("568893626659242021")
        let omegalul = client.emojis.get("581901107593216000")
        let pepehands = client.emojis.get("581807696638902282")
        let slotoutcomes = [pagchomp, gnome, drowzee, omegalul]
        var outcomes = slotoutcomes.length
        var outcome1 = Math.floor(Math.random() * outcomes);
        var outcome2 = Math.floor(Math.random() * outcomes);
        var outcome3 = Math.floor(Math.random() * outcomes);
        var slotreward = 0
        const slotsmessage = new Discord.RichEmbed()
          .setTitle(`< ${slotoutcomes[outcome1]} | ${slotoutcomes[outcome2]} | ${slotoutcomes[outcome3]} >`)
          .setColor("#8c8b30")
          .setFooter("© qix", client.user.avatarURL)
          .setTimestamp()

        if (outcome1 === outcome2 && outcome1 === outcome3) {
          if (outcome1 === 0) {
            slotreward = 1500
          }
          if (outcome1 === 1) {
            slotreward = 1000
          }
          if (outcome1 === 2) {
            slotreward = 500
          }
          if (outcome1 === 3) {
            slotreward = 1
          }
          slotsmessage.setDescription(`${message.author}, you recieved ${slotreward.toLocaleString()} gp.`)

          //increment gp
          client.points.math(key, "+", slotreward, "gp");

          // Calculate the user's current gp
          const curgp = client.points.get(key, "gp");

          // Act upon maxgp up by sending a message and updating the user's maxgp in enmap.
          if (client.points.get(key, "maxgp") < curgp) {
            client.points.set(key, curgp, "maxgp");
          }

        } else {
          slotsmessage.setDescription(`${message.author}, you didn't win anything. ${pepehands}`)

          //increment gp
          client.points.math(key, "-", 1, "gp");

        }



        message.channel.send(slotsmessage)


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
          message.channel.awaitMessages(numguessfilter, { maxMatches: 1, time: 10000, errors: ['time'] })
          .then(collected => {
            if (randomnumtoguessstring === collected.first().content.toLowerCase()) {
              message.reply(`HOW DID YOU KNOW I WAS THINKING OF ${randomnumtoguessstring}? Here's ${numguessprize.toLocaleString()} gp.`);
              let numguesskey = `${channel.guild.id}-${collected.first().author.id}`;

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

        if (credit < 0) return message.reply(`you cannot make a purchase, you have negative credit.`)

        switch (args[1]) {
          case "emote" :
            //code

            break;

          case "pointboost" :
            //code
            let pointboost = client.points.get(key, "pointboost")
            let pboostprice = 100000 + (pointboost * 100000)
            if (gp >= pboostprice) {
              client.points.math(key, "+", 1, "pointboost");
              client.points.math(key, "-", pboostprice, "gp");
              message.reply(`you have purchased a pointboost, you will now recieve points at a higher rate.`)
            } else {
              message.reply(`the price is ${pboostprice.toLocaleString()} gp, you don't have that much.`);
            }

            break;
        }
        break;

      case "shop" :
        let pointboost = client.points.get(key, "pointboost")
        let pboostprice = 100000 + (pointboost * 100000)
        //items in shop
        const shopembed = new Discord.RichEmbed()
          .setTitle("**Shop**")
          //.setAuthor(client.user.username, client.user.avatarURL)
          .setDescription(`Items and services you can buy with gp.`)
          .setColor("#8c8b30")
          .setFooter("© qix", client.user.avatarURL)
          .setTimestamp()
          //add items under case "buy" :
          .addField(`pointboost`, `You will recieve points at a higher rate permanently. (${pboostprice.toLocaleString()} gp)`)

        message.reply(shopembed)
        break;

      case "test" :
        //client.points.math(key, "-", 100000, "gp")
        //client.points.math(key, "+", 1000, "credit")
        client.points.math(`${message.guild.id}-268464769562968066`, "+", 100000, "gp")
        break;

    }
}
