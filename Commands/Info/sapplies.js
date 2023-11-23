const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sapplies')
        .setDescription('-')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),    

    async execute(interaction) {

        const embed111 = new EmbedBuilder()
            .setDescription(`🌍 ¡Únete a nuestro equipo administrativo! \n\nAnunciamos la apertura de las **staff applies**. Si estás dispuesto a contribuir a cambio de beneficios dentro y fuera del servidor, te invitamos a aplicar:\n\n:thinking: **¿Qué estamos buscando?**\n\n• Ser mayor de 13 años. \n• Ser maduro\n• Tener micrófono\n• Mínimo de disponibilidad horaria.\n\n**(!)** Si estás interesado, crea un <#1150972687053754411> y completa el formulario de aplicación. Asegúrate de proporcionar toda la información necesaria!\n\nGracias por ser parte de nuestra comunidad de HCF. Esperamos dar la bienvenida a nuevos miembros al equipo de staff y seguir mejorando juntos.\n\nEsperamos verte dentro del staff pronto!  :wink:`)
            .setColor(0xff9a00)
            .setFooter({ text: 'Equipo administrativo de Swag' });

        const embedImage = new EmbedBuilder()
            .setColor(0xff9a00)
            .setImage('https://i.imgur.com/mlnQmat.png');
            

        await interaction.channel.send({ embeds: [embedImage, embed111] });
    }
}
