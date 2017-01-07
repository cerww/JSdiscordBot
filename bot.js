var Discordie = require("discordie");
var client = new Discordie();

client.connect({
  // replace this sample token
  token: "MjY3MTkzNTY4NjU1ODM1MTM2.C1Iq7w.VDhHWy3AeMRGVcVj19xrIFmEDpA"
});

client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on("MESSAGE_CREATE", e => {
  if (e.message.content.substring(0,3) == "~~/"){
    e.message.channel.sendMessage("pong");
  }
});

//https://discordapp.com/oauth2/authorize?&client_id=267193568655835136&scope=bot