var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
//this holds the setInterval so it doesn't run off like a madman
var interval; 
//
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

    if (message.substring(0, 1) == '=') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);

        if(cmd === 'ping'){
            interval = setInterval(function(){
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            }, 2000);
        }
        if(cmd === 'stop'){
            clearInterval(interval);
        }
        // switch(cmd) {
        //     // !ping
        //     case 'ping':
        //         intervalCheck();
        //     break;
        //     case 'stop':
        //         resetBot();
        //     // Just add any case commands if you want to..
        //  }
    }
});