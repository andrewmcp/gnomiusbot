exports.run = (client, message, args, con) => {
  var Discord = require("discord.js");
  let channel = client.channels.get(`585772005522145282`);
  // Get a filtered list (for this guild only), and convert to an array while we're at it.
  const filtered = client.points.filter( p => p.guild === message.guild.id ).array();

  // Sort it to get the top results... well... at the top. Y'know.
  const sorted = filtered.sort((a, b) => b.points - a.points);

  // Slice it, dice it, get the top 10 of it!
  const top10 = sorted.splice(0, 10);

  // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
    .setTitle("**Leaderboard**")
    //.setAuthor(client.user.username, client.user.avatarURL)
    .setDescription(`${message.guild.name} top 10 points leaders!`)
    .setColor("#a6bd5a")
    .setFooter("© qix", client.user.avatarURL)
    .setTimestamp()

    let i = 1;
    let king = ""
  for(const data of top10) {
    position = i.toString();
    if (i === 1) {
      king = " 👑"
    } else {
      king = ""
    }
    if (message.guild.members.get(data.user) != undefined) {
      embed.addField(position + ". " + message.guild.members.get(data.user).displayName + king
      , `${data.points} points (level ${data.level})`)
      i++
    }
  }
  message.delete();
  return channel.send({embed});
}
