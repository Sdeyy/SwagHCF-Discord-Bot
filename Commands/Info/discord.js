const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('discord')
        .setDescription('Discord de Factions.'),

    async execute(interaction){
        await interaction.reply({ content: `https://discord.gg/TKB56RRZxp`})
    }
}