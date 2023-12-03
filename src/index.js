const { SQLiteDatabase } = require('@tfadev/easy-sqlite');
const { CommandsHandler, EventsHandler } = require('horizon-handler');
const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection,
    WebhookClient
} = require('discord.js');
require('colors');
require('dotenv').config();
const config = require("./config.js");
const projectVersion = require('../package.json').version || "v0.0.0";

const client = new Client({
    intents: [
        Object.keys(GatewayIntentBits)
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.User
    ],
    presence: {
        activities: [{
            name: "DM to contact team staff.",
            type: 4,
            url: "https://discord.gg/jb4B2YnKqx"
        }]
    },
    shards: "auto"
});

const webhookClient = (config.logs.webhookURL || process.env.WEBHOOK_URL )
    ? new WebhookClient({ url: config.logs.webhookURL || process.env.WEBHOOK_URL })
    : null;

const db = new SQLiteDatabase('./src/SQL/main.db');

(async () => {
    await db.create(
        {
            name: 'bans',
            overwrite: true,
            keys: {
                id: ['INTEGER', { primary: true, autoincrement: true }],
                userId: ['TEXT'],
                guildId: ['TEXT'],
                reason: ['TEXT', { nullable: true }]
            }
        },
        {
            name: 'mails',
            overwrite: true,
            keys: {
                id: ['INTEGER', { primary: true, autoincrement: true }],
                authorId: ['TEXT'],
                guildId: ['TEXT'],
                channelId: ['TEXT'],
                closed: ['BOOLEAN', { nullable: true }]
            }
        }
    );
})();



client.login(config.client.token || process.env.CLIENT_TOKEN).catch((e) => {
    console.error('Unable to connect to the bot, this might be an invalid token or missing required intents!\n'.red, e);
});

const commandshandler = new CommandsHandler('./src/commands/', true);
const eventshandler = new EventsHandler('./src/events/', false);

client.commands = new Collection();
const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();



eventshandler.on('fileLoad', (event) => console.log('Loaded new event: ' + event));

module.exports = {
    client,
    webhookClient,
    db,
    eventshandler
};

(async () => {
    await eventshandler.load(client);
})();

process.on('unhandledRejection', (reason, promise) => {
    console.error("[ANTI-CRASH: unhandledRejection] An error has occured and been successfully handled:".yellow);

    console.error(promise, reason);
});

process.on("uncaughtException", (err, origin) => {
    console.error("[ANTI-CRASH: uncaughtException] An error has occured and been successfully handled:".yellow);

    console.error(err, origin);
});

/*
* DiscordJS-V14-ModMail-Bot v7
* Yet Another Discord ModMail Bot made with discord.js v14, built on VSCode and coded by T.F.A#7524.
* Developer: T.F.A#7524
* Support server: https://discord.gg/E6VFACWu5V
* Please DO NOT remove these lines, these are the credits to the developer.
* Sharing this project without giving credits to me (T.F.A) ends in a Copyright warning. (©)
*/