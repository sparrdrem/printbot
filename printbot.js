// Get dependencies and set up some variables
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const dirPath = 'categories/';
var ver = '0.00.03.10'
var listcat = '!listcat'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  // Lists the version and other information
  if (msg.content === '!ver') {
    // Version information
    var verMenuEmbed = new Discord.RichEmbed()
      .setColor('777575')
      .setTitle('Printbot Version Information')
      .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
      .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
      .addField('_ _', '_ _')
      .addField('Version ' + ver, '_ _')
      .addField('Created by SparrDrem, 2019-30-08 10:19:25:00', '_ _')
      .addField('_ _', '_ _')
      .addField('READY.', '_ _')
    msg.channel.send(verMenuEmbed);
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
      var HelpMenuListcatEmbed = new Discord.RichEmbed()
        .setColor('777575')
        .setTitle('!listcat Command Information')
        .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
        .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
        .addField('_ _', '_ _')
        .addField('!listcat = show all categories', '_ _')
        .addField('!listcat [category] = show all models within the category', '_ _')
        .addField('_ _', '_ _')
        .addField('READY.', '_ _')
      msg.channel.send(HelpMenuListcatEmbed);
    // Else, if the 1st argument is info...
    } else if (helpcmd=='info') {
      // Send the help menu for info
      var HelpMenuInfoEmbed = new Discord.RichEmbed()
        .setColor('777575')
        .setTitle('!info Command Information')
        .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
        .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
        .addField('_ _', '_ _')
        .addField('Usage: !info [category] [model]', '_ _')
        .addField('_ _', '_ _')
        .addField('READY.', '_ _')
      msg.channel.send(HelpMenuInfoEmbed);
    } else {
    // Else, send the default help menu.
      var HelpMenuEmbed = new Discord.RichEmbed()
        .setColor('777575') // Sets border color to a nice gray color
        .setTitle('Printbot available commands')
        .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
        .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
        .addField('Commands:', '_ _')
        .addField('_ _', '_ _')
        .addField('!help', 'show this menu')
        .addField('!ver', 'list current version')
        .addField('!listcat', 'list all categories \(use `!help listcat` for more detailed view\)')
        .addField('!info', 'get the link to a 3D model, as well as info about it \(use `!help info` for more detailed view\)')
        .addField('READY.', '_ _')
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
    // List all categories
    function compileList(cat) {
        console.log(cat);
        if (fs.existsSync(dirPath + cat)) {
          var categories = fs.readdirSync(dirPath + cat);
          } else {
              var categories = fs.readdirSync(dirPath);
          }
        console.log(categories);
      var cvar = 1;
      var compiledList = " ";
      while (cvar<=categories.length) {
          var compiledList = compiledList.concat(cvar + ".) " + categories[cvar-1] + "\n");
          cvar++;
      }
      console.log(compiledList);
      var categoryList = new Discord.RichEmbed()
          .setColor('777575')
          .setTitle('Printbot Categories')
          .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
          .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
          .addField(compiledList, '_ _')
          .addField('_ _', '_ _')
          .addField('READY.', '_ _')
      msg.channel.send(categoryList);
    }
      compileList(cat);
    }

  // Get information on models
  if (msg.content.startsWith('!info')) {
    // Get first (category) argument and 2nd (model name) category
    const args = msg.content.slice('!info'.length).split(' ');
    const command = args.shift().toLowerCase();
    // Set arguments as variables
    const cat = args[0]
    const model = args[1]
    // Check if the model exists in the category
    if (fs.existsSync(dirPath + cat + "/" + model)) {
      var modelInfo = fs.readFileSync(dirPath + cat + "/" +model, "utf8");
      var embedModelInfo = new Discord.RichEmbed()
        .setColor('777575')
        .setTitle('Model Information')
        .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
        .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
        .addField(modelInfo, '_ _')
        .addField('_ _', '_ _')
        .addField('READY.', '_ _')
      msg.channel.send(embedModelInfo);
    } else {
      // If it doesn't, display an error
      var errorFileNotFound = new Discord.RichEmbed()
        .setColor('777575')
        .setTitle('ERROR')
        .setAuthor('Printbot', 'https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
        .setThumbnail('https://raw.githubusercontent.com/sparrdrem/printbot/master/_previmg.png')
        .addField('Error: That 3D Model or category was not found.', '_ _')
        .addField('_ _', '_ _')
        .addField('READY.', '_ _')
      msg.channel.send(errorFileNotFound);
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
