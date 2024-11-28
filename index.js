const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const shortid = require("shortid");
const { connectDB } = require("./connection");
const Url = require("./models/url");

connectDB("mongodb://127.0.0.1:27017/shorturl").then(() => console.log("DB Connected"));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;

    if(message.content.startsWith("create")){
        const userUrl = message.content.split("create ")[1];
        const shortID = shortid();
        const result = await Url.create({
            shortId: shortID,
            redirectURL: userUrl,
            visitHistory: []
        });
        return message.reply({
            content: `http://localhost:8001/data/${shortID} this is shortid for ${userUrl}`
        });
    }

    message.reply({
        content: "Hi from bot!"
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }

    if (interaction.commandName === 'create') {
        await interaction.reply('Shortening URL is in under process...');
    }
});
  
client.login(process.env.BOT_TOKEN);
  