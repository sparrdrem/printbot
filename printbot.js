const Discord = require('discord.js');
const client = new Discord.Client();
// Embed Menu coding
const HelpMenuEmbed = new Discord.RichEmbed()
  .setColor('777575') // Sets border color to a nice gray color
  .setTitle('Printbot available commands')
  .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
  .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
  .addField('Commands:')
  .addBlankField()
  .addField('!help', 'show this menu')
  .addField('!ver', 'list current version')
  .addField('!listcat', 'list all categories \(use `!help listcat` for more detailed view\)')
  .addField('!info', 'get the link to a 3D model, as well as info about it \(use `!help info` for more detailed view\)')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  
  // Set up the ability to take arguments for listcat
  var listcat = '!listcat'

  // Set up category list
  const dirPath = 'categories/';
  const fs = require('fs');

  // Lists the version and other information
  if (msg.content === '!ver') {
    msg.channel.send('Printbot for Discord.');
    msg.channel.send('Version 0.00.01.00');
    msg.channel.send('Created by SparrDrem, 2019-30-08 10:19:25:00');
    msg.channel.send('_ _');
    msg.channel.send('READY.');
  }

  // Help menu for commands
  if (msg.content === ('!help')) {
    //msg.channel.send('Printbot Help Menu');
    //msg.channel.send('_ _');
    //msg.channel.send('_ _!help = show this menu');
    //msg.channel.send('_ _!ver = list current version');
    //msg.channel.send('_ _!listcat = list all categories');
    //msg.channel.send('_ _!listcat [category number] = list all files in a category');
    //msg.channel.send('_ _!info [catrgory] [model name] = get the link to a 3D model, as well as info about it');
    //msg.channel.send('_ _');
    msg.channel.send(HelpMenuEmbed);
    msg.channel.send('READY.');
  }

  // List all categories
  if (msg.content.startsWith('!listcat')) {
    const args = msg.content.slice('!listcat'.length).split(' ');
    const command = args.shift().toLowerCase();
    var cat = args[0]
    if (typeof cat != 'undefined') {
      if (fs.existsSync(dirPath + cat)) {
        cvar = 0
        msg.channel.send('3D Models under the "' + cat + '" category:')
        msg.channel.send('_ _')
        fs.readdirSync(dirPath + cat).forEach(file => {
          cvar++
          msg.channel.send(String(cvar)+'.) '+file);
        });
      } else {
        msg.channel.send('ERROR: ' + cat + ' is not a valid category. Run "!listcat" for a list of categories.')
      }
    }
    if (typeof cat == 'undefined') {
      msg.channel.send('Printbot Categories');
      msg.channel.send('_ _');
      var cvar = 0
      fs.readdirSync(dirPath).forEach(file => {
        cvar++
        msg.channel.send(String(cvar)+'.) '+file);
      });
      msg.channel.send('_ _');
      msg.channel.send('This is just beta - there\'s more coming soon!');
      msg.channel.send('_ _');
    }
    msg.channel.send('READY.');
  }

  if (msg.content.startsWith('!info')) {
    const args = msg.content.slice('!info'.length).split(' ');
    const command = args.shift().toLowerCase();
    var cat = args[0]
    var model = args[1]
    if (fs.existsSync(dirPath + cat + "/" + model)) {
      fs.readFile(dirPath + cat + "/" + model, "utf8", function(err, data) {
        msg.channel.send(data);
        msg.channel.send('READY.')
      });
    } else {
      msg.channel.send('ERROR: ' + cat + ' is not a valid category and/or model. Run "!listcat" for a list of categories and to list models within said categories.');
      msg.channel.send('READY.')
    }
  }


  if (msg.content === 'LOAD"*",8,1') {
    msg.channel.send('SEARCHING FOR *')
    msg.channel.send('LOADING')
    var loadedGifFlag=1
    msg.channel.send('READY.')
  }

  if (msg.content === 'run') {
    if (loadedGifFlag=1) {
      msg.channel.send({files: ["https://raw.githubusercontent.com/sparrdrem/DremJS/master/spin.gif"]});
    }
    msg.channel.send('READY.')
  }
});

client.login('$dummy_key$');
