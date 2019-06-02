exports.run = (client, message, args, con) => {
    var min=0;
    var max=2;
    var random =Math.floor(Math.random() * (+max - +min)) + +min;
    if (random == 0) {
      message.reply("you landed on Heads.");
    } else {
      message.reply("you landed on Tails.");
    }
}
