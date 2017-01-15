var Discordie = require("discordie");
var client = new Discordie();
//var guildy = new guild();
client.connect({
  // replace this sample token
  token: "MjY3MTkzNTY4NjU1ODM1MTM2.C1Iq7w.VDhHWy3AeMRGVcVj19xrIFmEDpA"
});

client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username);
});
function RandY(args){
	if(args.length >=3){
		var lowest = parseInt(args[1]);
		var highest = parseInt(args[2]);
		if(typeof(lowest)==typeof(highest)&&typeof(lowest)=="number"&&lowest!=NaN){
			if(lowest == highest)
				return lower.toString();
			if(lowest>highest){
				var t = lowest;
				lowest = highest;
				highest = t;
			}
			var num = Math.random()*highest;
			while(num<lowest){
				num = Math.random()*highest;
			}return Math.ceil(num).toString();//msg.message.channel.sendMessage(num.toString());
		}
	}return "input: %rand <lower bound> <upper bound> where output is [lower bound,upperBound] lower bound <= upper Bound else [upper Bound, lower bound]";
}
function slots(){
	var emotes = [":green_apple: ",":apple: ",":information_desk_person: ",":potato: ",":flag_ca: "
				,":boom: ",":aquarius: ",":dolphin: ",":doughnut: ",":dvd: ",":hibiscus: "]
	var n = [Math.ceil(Math.random()*10),Math.ceil(Math.random()*10),Math.ceil(Math.random()*10)];
	//var toSend = "["+n[0].toString()+","+n[1].toString()+","+n[2].toString()+"]\n"
	var toSend = "["+emotes[n[0]]+","+emotes[n[1]]+","+emotes[n[2]]+"]\n"
	var temp = [0,0,0,0,0,0,0,0,0,0,0];
	for(i in n){
		++temp[n[i]];
	}var o = "";
	for(i in temp){
		if(temp[i]>1){
			//toSend+="you won"+temp[i].toString()+" times";
			o=" you won "+temp[i].toString()+" times";
			break;
		}
	}if(o==""){
		o = "you lost";
	}//msg.message.channel.sendMessage(toSend+o);
	return toSend+o;
}
client.Dispatcher.on("MESSAGE_CREATE", msg => {
  if (msg.message.content.substring(0,1) == "%"){
    //msg.message.channel.sendMessage("pong "+msg.message.author.username);
	var args = msg.message.content.split(" ");
	if(args[0]=="%rand"){
		msg.message.channel.sendMessage(RandY(args));
	}else if(args[0]=="%slots"){
		msg.message.channel.sendMessage(slots());
	}else if(args[0]=="%pong"){
		msg.message.channel.sendMessage("pong "+msg.message.author.username);
	}
	//let firstSpace = e.message.content.indexOf(" ");
  }//for(var i = 0;i<1000000;++i){}
});

//https://discordapp.com/oauth2/authorize?&client_id=267193568655835136&scope=bot