exports.run = (client, message, args, con) => {
  var Discord = require("discord.js");
  var Enmap = require("enmap");
  var fs = require("fs");

  //message.reply("command under maintenance. Contact " + bot.package.author + " for help.") return;
  //message.author.send("Available commands:");
    fs.readdir("./commands/", (err, files) => {
      if (err) return console.error(err);
      var namelist = "";
      files.forEach(file => {
        if (!file.startsWith("__")) {
          if (!file.endsWith(".js")) return;
          let props = require(`./${file}`);
          let commandName = file.split(".")[0];
          console.log(`Attempting to load command ${commandName}`);
          namelist += (client.auth.prefixes[0] + `*${commandName}* \n`);
        }
      });
      //message.author.send(namelist);


    const embed = new Discord.RichEmbed()
      .setTitle("Available commands:")
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor("#8c8b30")
      .setDescription(namelist)
      .setFooter("qix", client.user.avatarURL)
      //.setImage("http://i.imgur.com/yVpymuV.png")
      //.setThumbnail("URL")
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp()
      //.addField("This is a field title, it can hold 256 characters",
        //"This is a field value, it can hold 1024 characters.")
      /*
       * Inline fields may not display as inline if the thumbnail and/or image is too big.
       */
      //.addField("Inline Field", "They can also be inline.", true)
      /*
       * Blank field, useful to create some space.
       */
      //.addBlankField(true)
      //.addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

      message.author.send({embed});

    });
}
//check  "https://stackoverflow.com/questions/47875397/discord-js-list-all-my-bot-commands"  for extended ideas.
