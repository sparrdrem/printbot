# Printbot
Printbot - A bot made to list downloadable 3D models for Discord

## What is Printbot?
Printbot is a bot for Discord that is made to list 3D models.
To add a category, go to the `categories/` folder and make a new folder in it.
To add 3D models, navigate to the `categories/` folder and copy the provided `Template` file in the `examples` category to the category you want the model at. Fill in the requried information. For the link, provide a link to somewhere you can get the STLs for the model. For most of my projects, I upload the STLs to Thingiverse and put the link to the Thing's page in the link area.

## Commands
### !var
List version information

### !help
Get help on commands

`!help listcat`
Get help on the !listcat command

`!help info`
Get help on the !info command

### !listcat
List all categories

`!listcat [category]`
List all 3D models in a category. To get a list of categories, run !listcat with no arguments.

### !info
Get information on a 3D model

`!info [category] [model]`

###
## Directory Tree
```
|printbot.js         // The main part of the bot
|package.json        // Bot information
|_previmg.png        // An image of Printbot's (placeholder) logo used for embedded menus
|--|categories/      // Categories directory. Guess what it does. Are you sitting down? It holds categories.
   |--|examples/     // The demo category (you may delete this)
      |--|3D-Model   // Demo 3D model
         |Template   // Template file
```
