exports.run = (client, message, args, con) => {
  let members = message.guild.members.filter(m => m.user.bot == false);
  let online_members = members.filter(m => m.presence.status !== 'offline');
  let random_member_id = online_members.random().user.id;

  console.log(random_member_id);

  message.channel.send(`<@${random_member_id}>`);
  //console.log();
  //let guildmembers = message.guild.members;
  //console.log(guildmembers);



  //message.channel.send("softa")
}
