const tmi = require('tmi.js');
const haikudos = require('haikudos');
var fs = require('fs');
var http = require('http');
var USRNAME;
let commandPrefix = '!'
let opts = {
  identity: {
    username: "goodboi_bot",
    password: 'oauth:' + 'CLE_TWITCH'
  },
  channels: [
    "YOURCHANNELNAME"
  ]
}

let knownCommands = { echo }


 function helloCHAT() {
	 
	 fs.writeFile('fichierTWITCH.txt', `<img onload="draw('`+USRNAME+ `')" src="http://rs157.pbsrc.com/albums/t41/pigletpoo_01/Hamtaro/hamtaro_s_008.gif~c200"><script>draw('hello')</script>`, function (err) {
		console.log('Replaced!');
	 });
		};
		
function commonCHAT() {
	 fs.writeFile('fichierTWITCH.txt', `<img onload="draw('')" src="http://rs157.pbsrc.com/albums/t41/pigletpoo_01/Hamtaro/hamtaro_s_019.gif~c200">`, function (err) {
		console.log('common!');
		
		});
};


function echo (target, context, params) {
  if (params.length) {
    const msg = params.join(' ')
    sendMessage(target, context, msg)
  } else { 
    console.log(`* Nothing to echo`)
  }
}

// Helper function to send the correct type of message:
function sendMessage (target, context, message) {
  if (context['message-type'] === 'whisper') {
    client.whisper(target, message)
  } else {
    client.say(target, message)
  }
}

let client = new tmi.client(opts)

// Register our event handlers (defined below):
client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)
client.on('disconnected', onDisconnectedHandler)

// Connect to Twitch:
client.connect()

// Called every time a message comes in:
function onMessageHandler (target, context, msg, self) {
  if (self) { return } // Ignore messages from the bot

  // This isn't a command since it has no prefix:
  if (msg.substr(0, 1) !== commandPrefix) {
	
    console.log(`[${target} (${context['message-type']})] ${context.username}: ${msg}`)
	//console.log(`${msg}`);
	//console.log(context.username);
	console.log(`[${target}`);
	
	
	
	if(msg == "slt") {	
	USRNAME = context.username;
	helloCHAT();
	setTimeout(commonCHAT, 3000);	}
    return
  
  
  
  
  }

  // Split the message into individual words:
  const parse = msg.slice(1).split(' ')
  // The command name is the first (0th) one:
  const commandName = parse[0]
  // The rest (if any) are the parameters:
  const params = parse.splice(1)

  // If the command is known, let's execute it:
  if (commandName in knownCommands) {
    // Retrieve the function by its name:
    const command = knownCommands[commandName]
    // Then call the command with parameters:
    command(target, context, params)
    console.log(`* Executed ${commandName} command for ${context.username}`)
  } else {
    console.log(`* Unknown command ${commandName} from ${context.username}`)
  }
}

// Called every time the bot connects to Twitch chat:
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
   commonCHAT();
}

// Called every time the bot disconnects from Twitch:
function onDisconnectedHandler (reason) {
  console.log(`Womp womp, disconnected: ${reason}`)
  process.exit(1)
}
