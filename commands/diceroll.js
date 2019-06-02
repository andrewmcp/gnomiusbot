exports.run = (client, message, args, con) => {
    var min=1;
    var max=7;
    var random =Math.floor(Math.random() * (+max - +min)) + +min;
    if (random == 1) {
      message.reply("", {files: ["./pictures/dice1.jpg"]});
    }
    if (random == 2) {
      message.reply("", {files: ["./pictures/dice2.jpg"]});
    }
    if (random == 3) {
      message.reply("", {files: ["./pictures/dice3.jpg"]});
    }
    if (random == 4) {
      message.reply("", {files: ["./pictures/dice4.jpg"]});
    }
    if (random == 5) {
      message.reply("", {files: ["./pictures/dice5.jpg"]});
    }
    if (random == 6) {
      message.reply("", {files: ["./pictures/dice6.jpg"]});
    }
}
