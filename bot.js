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
			o=" you got "+temp[i].toString()+"/3 matches";
			break;
		}
	}if(o==""){
		o = "you lost";
	}//msg.message.channel.sendMessage(toSend+o);
	return toSend+o;
}

function triviaGame(maxQs,channel){
	function triviaQ(){
		var qID = 0;
		this.question = ["how many cats are there"][qID];
		this.answer = ["a lot"][qID];
	}
	this.currentQ = new triviaQ();
	this.points = [];
	this.maxQs = maxQs;
	//console.log(maxQs);
	this.channel = channel;
	this.time = 0;
	this.update = ()=>{
		++this.time;
		if(this.time>=20){
			this.currentQ = new triviaQ();
			this.channel.sendMessage("times up!\n"+"**"+this.currentQ.question+"**");
			this.time = 0;
		}
	};
	this.newQuestion = ()=>{
		this.currentQ = new triviaQ();
		this.time = 0;
	};
}
var triviaGames = [];
client.Dispatcher.on("MESSAGE_CREATE", msg => {
  //check if ther is a trivia game in current ch
  if(triviaGames[msg.message.channel.id]!=undefined){
    if(msg.message.content==triviaGames[msg.message.channel.id].currentQ.answer){//checks if its the right ans
	  msg.message.channel.sendMessage(msg.message.author.username+" won, answer was **"+msg.message.content+"**");
	  --triviaGames[msg.message.channel.id].maxQs;
	  if(msg.message.author.username in triviaGames[msg.message.channel.id].points){
		++triviaGames[msg.message.channel.id].points[msg.message.author.username];
	  }else{
		triviaGames[msg.message.channel.id].points[msg.message.author.username]=1;
	  }//end trivia if maxQs == 0
	  if(triviaGames[msg.message.channel.id].maxQs<=0||Number.isNaN(triviaGames[msg.message.channel.id].maxQs)){
	    var a = "";
		for(i in triviaGames[msg.message.channel.id].points){
		  a+="` "+i+"`"+":"+triviaGames[msg.message.channel.id].points[i].toString()+"\n";
		}
		triviaGames[msg.message.channel.id] = undefined;
		msg.message.channel.sendMessage(a);
	  }else{
		triviaGames[msg.message.channel.id].newQuestion();// = new triviaQ();
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
	  if(triviaGames[msg.message.channel.id]==undefined){
	    try{
	      //a = 1/eval(args[1]);
	  	  triviaGames[msg.message.channel.id] = new triviaGame(Math.min(eval(args[1]),100),msg.message.channel);
	    }catch(e){
		//console.log(e);
  	      triviaGames[msg.message.channel.id] = new triviaGame(2,msg.message.channel);
	    }
	    msg.message.channel.sendMessage("trivia game started\n"+"**"+triviaGames[msg.message.channel.id].currentQ.question+"**");
	  }else{
		msg.message.channel.sendMessage("trivia game already started")
	  }
	}else if(args[0]=="%trivq"){
		if(triviaGames[msg.message.channel.id]!=undefined){
			triviaGames[msg.message.channel.id]= undefined;
			msg.message.channel.sendMessage("trivia game over");
		}else{
			msg.message.channel.sendMessage("no trivia game on this channel");
		}
	}
	//let firstSpace = e.message.content.indexOf(" ");
  }//for(var i = 0;i<1000000;++i){}
});
setInterval(function(){
	for(i in triviaGames){
		if(triviaGames[i] !== undefined)
			triviaGames[i].update();
	}
},1000);
//https://discordapp.com/oauth2/authorize?&client_id=267193568655835136&scope=bot
