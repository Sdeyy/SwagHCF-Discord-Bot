const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reglas')
        .setDescription('Reglas del servidor de Discord.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),    

    async execute(interaction) {

        const embed111 = new EmbedBuilder()
/*            .setTitle('📔 REGLAS') */
            .setDescription(`**Para asegurar que todos los miembros disfruten de su tiempo aquí y mantengan un entorno seguro y respetuoso, es importante seguir estas reglas. Al unirse al servidor, aceptas cumplir con lo siguiente:**\n\n**[-]** No se permiten **ventas comerciales**.\n**[-]** No expongas **información privada** o **datos sensibles** de otros usuarios.\n**[-]** No se permite contenido explícito **NSFW** \`(+18)\`.\n**[-]** No se deben discutir temas **políticos/religiosos**.\n**[-]** No hagas **spam** de mensajes, enlaces o promociones.\n**[-]** No acoses ni faltes al respeto al staff.\n**[-]** Trata a todos los miembros con **respeto y amabilidad**.\n\nLas infracciones a estas reglas pueden resultar en **advertencias, baneos temporales o permanentes**, dependiendo de la gravedad.\n\nEste servidor opera bajo las **[Directrices](https://discord.com/guidelines)** y **[Términos](https://discord.com/terms)** de Discord.\n`)
            .setColor(0xff9a00)
            .setFooter({text: 'El equipo administrativo de Swag se reserva el derecho de modificar estas reglas en cualquier momento. Es responsabilidad del miembro mantenerse actualizado con las reglas actuales.' });

        const embedImage = new EmbedBuilder()
            .setColor(0xff9a00)
            .setImage('https://i.imgur.com/ZmLTnus.png');

        await interaction.channel.send({ embeds: [embedImage, embed111] });
    }
}


