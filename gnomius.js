var Discord = require("discord.js");
var Enmap = require("enmap");
var fs = require("fs");

var client = new Discord.Client();
var gnomius_auth = require("./gnomius_auth.json");
var gnomius_package = require("./gnomius_package.json")
var gnomius_words = require("./gnomius_words.json")

client.auth = gnomius_auth;
client.package = gnomius_package;
client.words = gnomius_words;
client.points = new Enmap({name: "points"});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.startsWith("__")) {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      console.log(`Attempting to load event ${eventName}`);
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    }
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.startsWith("__")) {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
    }
  });
});

client.login(client.auth.token);

// client.on("message", (message) => {
//
//   if (!message.content.startsWith(client.auth.prefix)) return;
//
//     var args = message.content.slice(client.auth.prefix.length).trim().split(/ +/g);
//     var cmd = args.shift().toLowerCase();
//
//       switch(cmd) {
//         // ?join
//         case "join":
//           message.reply("command not yet available.")
//           // if (!message.guild) return;
//           // if (message.member.voiceChannel) {
//           //   const channel = message.member.voiceChannel;
//           //   channel.join();
//           // } else {
//           //   message.reply("you need to join a voice channel first!");
//           // }
//           break;
//       }
// });
