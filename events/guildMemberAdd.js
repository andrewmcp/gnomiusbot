module.exports = (client, member) => {
  var Discord = require("discord.js");

  const embed = new Discord.RichEmbed()
    .setTitle("New Member")
    /*
     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
     */
    .setColor("#8c8b30")
    .setDescription("Welcome *" + member + "* to the **Gnomius** discord server!")

    //.setImage("http://i.imgur.com/yVpymuV.png")
    //.setThumbnail("URL")
    /*
     * Takes a Date object, defaults to current date.
     */

    .addField("Information",
      "You suck.")
    /*
     * Inline fields may not display as inline if the thumbnail and/or image is too big.
     */
    //.addField("Inline Field", "They can also be inline.", true)
    /*
     * Blank field, useful to create some space.
     */
    //.addBlankField(true)
    //.addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
    .setFooter("© GNOMIUS", client.user.avatarURL)
    .setTimestamp()

    member.guild.channels.get("")//.send({embed});

  }
