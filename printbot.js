const Discord = require('discord.js');
const client = new Discord.Client();
// Embed Menu coding
const HelpMenuEmbed = new Discord.RichEmbed()
  .setColor('777575') // Sets border color to a nice gray color
  .setTitle('Printbot available commands')
  .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
  .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
  .addField('Commands:', '_ _')
  .addBlankField()
  .addField('!help', 'show this menu')
  .addField('!ver', 'list current version')
  .addField('!listcat', 'list all categories \(use `!help listcat` for more detailed view\)')
  .addField('!info', 'get the link to a 3D model, as well as info about it \(use `!help info` for more detailed view\)')

const HelpMenuListcatEmbed = new Discord.RichEmbed()
  .setColor('777575')
  .setTitle('!listcat Command Information')
  .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
  .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
  .addBlankField()
  .addField('!listcat = show all categories', '_ _')
  .addField('!listcat [category] = show all models within the category', '_ _')

const HelpMenuInfoEmbed = new Discord.RichEmbed()
  .setColor('777575')
  .setTitle('!info Command Information')
  .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
  .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
  .addBlankField()
  .addField('Usage: !info [category] [model]', '_ _')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  
  // Variables
  var listcat = '!listcat'

  // Set up category list
  const dirPath = 'categories/';
  const fs = require('fs');

  // Lists the version and other information
  if (msg.content === '!ver') {
    msg.channel.send('Printbot for Discord.');
    msg.channel.send('Version 0.00.02.00');
    msg.channel.send('Created by SparrDrem, 2019-30-08 10:19:25:00');
    msg.channel.send('_ _');
    msg.channel.send('READY.');
  }

  // Help menu for commands
  if (msg.content.startsWith('!help')) {
    // Get arugments
    const args = msg.content.slice('!help'.length).split(' ');
    const command = args.shift().toLowerCase();
    // Set 1st argument
    var helpcmd = args[0]
    // If the 1st argument is listcat...
    if (helpcmd=='listcat') {
      // Send the help menu for listcat.
      msg.channel.send(HelpMenuListcatEmbed);
    // Else, if the 1st argument is info...
    } else if (helpcmd=='info') {
      // Send the help menu for info
      msg.channel.send(HelpMenuInfoEmbed);
    } else {
    // Else, send the default help menu.
      msg.channel.send(HelpMenuEmbed);
    }
  }

  // List all categories
  if (msg.content.startsWith('!listcat')) {
    // Get arguments
    const args = msg.content.slice('!listcat'.length).split(' ');
    const command = args.shift().toLowerCase();
    // Set the first argument as the category.
    var cat = args[0]
    // If the first arugment is not blank
    if (typeof cat != 'undefined') {
      // AND it exists
      if (fs.existsSync(dirPath + cat)) {
        // Set count cariable to keep track of the current number in the list
        cvar = 0
        msg.channel.send('3D Models under the "' + cat + '" category:')
        msg.channel.send('_ _')
        fs.readdirSync(dirPath + cat).forEach(file => {
          // Add 1 to count variable then list all files in the subdirectory
          cvar++
          msg.channel.send(String(cvar)+'.) '+file);
        });
        // Else (aka if the category given does not exist)
      } else {
        msg.channel.send('ERROR: ' + cat + ' is not a valid category. Run "!listcat" for a list of categories.')
      }
    }
    // If cat is not defined (aka the first argument doesn't exist)
    if (typeof cat == 'undefined') {
      // List all categories
      msg.channel.send('Printbot Categories');
      msg.channel.send('_ _');
      // Set a count variable to keep track of what category it is currently on
      var cvar = 0
      fs.readdirSync(dirPath).forEach(file => {
        // Add one to the count variable and list all categories
        cvar++
        msg.channel.send(String(cvar)+'.) '+file);
      });
      msg.channel.send('_ _');
      msg.channel.send('This is just beta - there\'s more coming soon!');
      msg.channel.send('_ _');
    }
    msg.channel.send('READY.');
  }

  // Get information on models
  if (msg.content.startsWith('!info')) {
    // Get first (category) argument and 2nd (model name) category
    const args = msg.content.slice('!info'.length).split(' ');
    const command = args.shift().toLowerCase();
    // Set arguments as variables
    var cat = args[0]
    var model = args[1]
    // Check if the model exists in the category
    if (fs.existsSync(dirPath + cat + "/" + model)) {
      // If it does, display the file that has information on the model
      fs.readFile(dirPath + cat + "/" + model, "utf8", function(err, data) {
        msg.channel.send(data);
        msg.channel.send('READY.')
      });
    } else {
      // If it doesn't, display an error
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
