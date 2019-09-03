const Discord = require('discord.js');
const client = new Discord.Client();

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
  if (msg.content === '!help') {
    msg.channel.send('Printbot Help Menu');
    msg.channel.send('_ _');
    msg.channel.send('!help = show this menu');
    msg.channel.send('!ver = list current version');
    msg.channel.send('!listcat = list all categories');
    msg.channel.send('!listcat [category number] = list all files in a category');
    msg.channel.send('!link [catrgory] [model name] = get the link to a 3D model, as well as info about it');
    msg.channel.send('!recent = list the latest 10 projects');
    msg.channel.send('_ _');
    msg.channel.send('READY.');
  }

  // List all categories
  if (msg.content.startsWith('!listcat')) {

    const args = msg.content.slice('!listcat'.length).split(' ');
    const command = args.shift().toLowerCase();
    var cat = args[0]
    console.log(cat)
    if (cat=undefined) {
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

  // Spin..?
  if (msg.content === '!spin') {
    msg.channel.send({files: ["https://raw.githubusercontent.com/sparrdrem/DremJS/master/spin.gif"]});
  }
});

client.login('$dummy_key$');