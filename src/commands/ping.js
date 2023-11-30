const { SlashCommandBuilder } = require("discord.js");
const { commandshandler } = require("../index");
const { CommandType } = require("horizon-handler");

module.exports = new commandshandler.command({
    type: CommandType.ChatInput,
    structure: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    run: async (client, interaction) => {

        await interaction.reply({
            content: `**Pong**! ${Math.round(client.ws.ping)}ms`
        });

    }
});