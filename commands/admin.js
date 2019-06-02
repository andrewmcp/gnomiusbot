exports.run = (client, message, args, con) => {
  if (message.author.id !== client.auth.ownerID) {
    message.reply("You are not worthy.")
    return;
  }
  let command = args[0];
  let rolename = args[1];
  let channelname = args[1];

  let role = message.guild.roles.find(r => r.name === rolename);
  let member = message.mentions.members.first();

  //console.log(role);
  //console.log(command);
  //console.log(rolename);
  //console.log(color);
  //console.log(role.id);


  switch (command) {
    case "newrole" :
      let color = parseInt(args[2]);
      if (rolename === undefined || !Number.isInteger(color) || !(0<=color<=16777215) ) {
        message.reply("some argument not given. \n I need [create, rolename, color (decimal)] to create role.");
        return;
      }
      message.guild.createRole({
        name: rolename,
        color: color,
      })
      message.reply(`created role with name **${rolename}** and color **${color}**.`);
      break;

    case "deleterole" :
      if (role === null) {
        message.reply("not valid role to delete.");
        return;
      }
      role.delete("lol");
      message.reply(`deleted role: **${rolename}**.`)
      break;

    case "addtorole" :
      if (member === undefined || role === null) {
        return;
      }
      if(message.member.roles.has(role.id)) {
        message.channel.send(member + " already has that role.");
      } else {
        member.addRole(role).catch(console.error);
        message.reply(`added ${member} to role: **${rolename}**.`);
      }
      break;

    case "removefromrole" :
      if (member === undefined || role === null) {
        return;
      }
      if(message.member.roles.has(role.id)) {
        member.removeRole(role).catch(console.error);
        message.reply(`removed ${member} from role: **${rolename}**.`);
      } else {
        message.channel.send(member + " doesn't have that role.");
      }
      break;

    case "rolepermissions" :
      if (role === null) {
        return;
      }
      role.setPermissions(args.slice(2))
        .then(updated => {
          console.log(`Updated permissions of ${rolename} to:`);
          console.log(args.slice(2));
          message.reply(`updated permissions of ${rolename} to:\n [${args.slice(2).join(', ')}]`);
        })
        .catch(console.error);
        break;

    case "editrole" :
      let name = args[2];
      let colour = parseInt(args[3]);
      if (role === null || !(0<=colour<=16777215)) {
        console.log("Invalid role or color.")
        return;
      }
      role.edit({
        name: name,
        color: colour
      })
        .then(updated => console.log(`Edited role name from ${role.name} to ${updated.name} and color from ${role.color} to ${updated.color}`))
        .catch(console.error);
        break;

    case "newchannel" :
      let type = args[2];
      if (args[2] !== undefined) {
        type = args[2].toLowerCase();
      }
      if (['text', 'voice', 'category', 'news', 'store', undefined].includes(type)) {
          message.guild.createChannel(channelname, type)
            .then(message.channel.send(`Created ${type} channel with name ${channelname}.`))
      }

    case "deletechannel" :
      let channel = message.guild.channels.find(c => c.name === channelname);
      if (channel === null) return;
      channel.delete()
        .then(message.channel.send(`Deleted channel named ${channelname}.`))
        .catch(console.error);
  }
}
