// Import packages
const express = require("express");
const home = require("./routes/home");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/home", home);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Asia/Kolkata', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: false,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1141991217987596388')
    .setType('STREAMING')
    .setURL('https://discord.gg/csH7dVVerA') //Must be a youtube video link 
    .setState('Watching - Isla Cafe')
    .setName('vibes.him')
    .setDetails(`THE NAME IT SHOWS YOUR STREAMING [${formatTime()}]`)
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1141983502762516502/1141994932991688774/luffy-one-piece.gif') //You can put links in tenor or discord and etc.
    .setAssetsLargeText("He's here") //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1141983502762516502/1141994368786497626/255272cb-3860-4bf4-9df4-f7fc658af20a.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText("Si's the Joyboy") //Text when you hover the Small image
    .addButton('Join the Server', 'https://discord.gg/csH7dVVerA')
    .addButton("Owner's Profile", 'https://discordapp.com/users/1021662086201352192');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Following Si's Ordeal [${newTime} - IST]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 60); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
