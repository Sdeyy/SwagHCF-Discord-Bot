const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, Embed } = require('discord.js');
const { openTicket } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketmenu')
        .setDescription('Menú de tickets.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const { guild } = interaction;

        const embed = new EmbedBuilder()
/*            .setTitle('🎫  TICKETS') */
            .setDescription(`**¡Bienvenido al sistema de creación de tickets!** Si necesita asistencia o tiene alguna pregunta, siga estos pasos:\n\n**[1]** Haga clic en el botón debajo de este mensaje para abrir un nuevo ticket.\n**[2]** Describa su problema o pregunta de manera concisa y clara.\n**[3]** Nuestro equipo de soporte le ayudará lo antes posible.\n\nRecuerde ser **respetuoso** y **paciente** mientras espera una respuesta. ¡Gracias por elegir nuestro servicio de soporte! 🙌\n`)
            .setColor(0xff9a00)
            .setFooter({ text: 'Swag' });

        const button = new ActionRowBuilder().setComponents(
            new ButtonBuilder().setCustomId('dudas').setLabel('Dudas').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('reporte').setLabel('Reportes').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('apelar').setLabel('Apelaciones').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('donaciones').setLabel('Donaciones').setStyle(ButtonStyle.Success),
        );

        const embedImage = new EmbedBuilder()
        .setColor(0xff9a00)
        .setImage('https://i.imgur.com/rTGYwmY.png');

        interaction.channel.send({ embeds: [embedImage, embed], components: [button] });
    }
};
