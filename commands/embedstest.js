exports.run = (client, message, args, con) => {
  var Discord = require("discord.js");
  const embed = new Discord.RichEmbed()
    //.setTitle("New Member")
    /*
    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
    */
    .setColor(3066993)
    .setDescription("<vote expand the kitchen från bara voice till voice och text")

    //.setImage("http://i.imgur.com/yVpymuV.png")
    //.setThumbnail("URL")
    /*
    * Takes a Date object, defaults to current date.
    */

    //.addField("Information",
      //"You ||suck||.")
    //.addField("test <:ez:583049694188404815>",
      //"test <:ez:583049694188404815>")
      /*
      * Inline fields may not display as inline if the thumbnail and/or image is too big.
      */
      //.addField("Inline Field", "They can also be inline.", true)
      /*
      * Blank field, useful to create some space.
      */
      //.addBlankField(true)
      //.addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
      .setFooter(`✔️ 5 / ❌ 2 | 648646459402747914`)
      .setTimestamp(new Date())


    // .setTitle("This is your title, it can hold 256 characters")
    .setAuthor(message.member.displayName, message.author.displayAvatarURL)
    // /*
    //  * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
    //  */
    // .setColor("#8c8b30")
    // .setDescription("This is the main body of text, it can hold 2048 characters.")
    // .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
    // .setImage("http://i.imgur.com/yVpymuV.png")
    // .setThumbnail("http://i.imgur.com/p2qNFag.png")
    // /*
    //  * Takes a Date object, defaults to current date.
    //  */
    // .setTimestamp()
    // .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
    // .addField("This is a field title, it can hold 256 characters",
    //   "This is a field value, it can hold 1024 characters.")
    // /*
    //  * Inline fields may not display as inline if the thumbnail and/or image is too big.
    //  */
    // .addField("Inline Field", "They can also be inline.", true)
    // /*
    //  * Blank field, useful to create some space.
    //  */
    // .addBlankField(true)
    // .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

    message.channel.send({embed});
  }
