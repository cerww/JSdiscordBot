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
		try{
			var lowest = eval(args[1]);
			var highest = eval(args[2]);
		}catch(e){
			return "input: %rand <lower bound> <upper bound> where output is [lower bound,upperBound] lower bound <= upper Bound else [upper Bound, lower bound]";
		}
		if(typeof(lowest)==typeof(highest)&&typeof(lowest)=="number"&&lowest!=undefined){
			if(lowest == highest)
				return lowest.toString();
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
function triviaQ(){
	var qID = 0;
	this.question = ["hi"][qID];
	this.answer = ["b"][qID];
}
function triviaGame(maxQs){
	this.currentQ = new triviaQ();
	this.points = [];
	this.maxQs = maxQs;
}
var triviaGames = [];
client.Dispatcher.on("MESSAGE_CREATE", msg => {
  if(triviaGames[msg.message.channel.id]!=undefined){
    if(msg.message.content==triviaGames[msg.message.channel.id].currentQ.answer){
	  msg.message.channel.sendMessage(msg.message.author.username+" won, answer was "+msg.message.content);
	  --triviaGames[msg.message.channel.id].maxQs;
	  if(msg.message.author.username in triviaGames[msg.message.channel.id].points){
		++triviaGames[msg.message.channel.id].points[msg.message.author.username];
	  }
	  if(!triviaGames[msg.message.channel.id].maxQs){
		triviaGames[msg.message.channel.id] = undefined;
	  }else{
		triviaGames[msg.message.channel.id].currentQ = new triviaQ();
		msg.message.channel.sendMessage("**"+triviaGames[msg.message.channel.id].currentQ.question+"**");
	  }
	}
  }
  if (msg.message.content.substring(0,1) == "%"){
    //msg.message.channel.sendMessage("pong "+msg.message.author.username);
	var args = msg.message.content.split(" ");
	if(args[0]=="%rand"){
		msg.message.channel.sendMessage(RandY(args));
	}else if(args[0]=="%slots"){
		msg.message.channel.sendMessage(slots());
	}else if(args[0]=="%pong"){
		msg.message.channel.sendMessage("pong "+msg.message.author.username);
	}else if(args[0]=="%triv"){
		triviaGames[msg.message.channel.id] = new triviaGame(2);
		msg.message.channel.sendMessage("trivia game started\n"+"**"+triviaGames[msg.message.channel.id].currentQ.question+"**");
	}
	//let firstSpace = e.message.content.indexOf(" ");
  }//for(var i = 0;i<1000000;++i){}
});

//https://discordapp.com/oauth2/authorize?&client_id=267193568655835136&scope=bot