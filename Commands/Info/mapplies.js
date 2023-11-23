const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mapplies')
        .setDescription('-')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),    

    async execute(interaction) {

        const embed111 = new EmbedBuilder()
            .setDescription(`🌍 **Requisitos para aplicar:**\n\n**Partner**\n\n> *Consultar via ticket adjuntando el link de tu canal de Youtube/Twitch!*\n\n**Famous**\n\n> 500 suscriptores\n> 1 video cada semana.\n> Al menos 350 visitas por video\n\n**YouTuber**\n\n> 150 suscriptores\n> 1 video cada semana.\n> Al menos 150 visitas por video\n\n**MiniYT**\n\n> 50 suscriptores\n> 2 videos cada semana.\n> Al menos 50 visitas por video\n\n**Streamer+**\n\n> 150 followers\n> 3 streams en el servidor en el ultimo mes\n> Al menos 15 personas viendo el directo\n\n**Streamer**\n\n> 50 followers\n> 2 streams en el servidor en el ultimo mes\n> Al menos 5 personas viendo el directo\n\n\n**(!)** Tengan en cuenta que a medida que el servidor vaya creciendo, los requisitos tambien se van a ir aumentando.\n\nSi estás interesado, crea un ⁠<#1150972687053754411> y completa el formulario de aplicación. Asegúrate de proporcionar toda la información necesaria!`)
            .setColor(0xff9a00)
            .setFooter({text: 'Equipo administrativo de Swag' });

        const embedImage = new EmbedBuilder()
            .setColor(0xff9a00)
            .setImage('https://i.imgur.com/TEyGQMG.png');
            

        await interaction.channel.send({ embeds: [embedImage, embed111] });
    }
}

