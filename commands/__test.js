exports.run = (client, message, args, con) => {

  for (i = 0; i < 3; i++) {
    message.channel.send("WASA")
  }
  message.channel.send("WASSUP\n" +
  "BITCONNEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEECT <:bitconnect:582219526406537218>");
}


// (function myLoop (i) {
//  setTimeout(function () {
//     message.channel.send("WASA") //  your code here
//     if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
//  }, 1000)
// })(5);                        //  pass the number of iterations as an argument
