const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("crearverificacion")
        .setDescription('Sistema de verificación.')
        .addChannelOption(option => 
            option.setName('canal')
                .setDescription('Envía el embed de verificación en este canal')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const canal = interaction.options.getChannel('canal');
        const embedVerificacion = new EmbedBuilder()
/*            .setTitle("✅ VERIFICACIÓN") */
            .setDescription(`:wave: ¡Bienvenido a nuestro **Discord**!\n\n**[/]** Para obtener acceso a todos los canales, por favor **haz clic en el botón de abajo.**\n`)
            .setFooter({text: 'Swag'})
            .setColor(0xff9a00);

        const embedImage = new EmbedBuilder()
            .setColor(0xff9a00)
            .setImage('https://i.imgur.com/teIbTWN.png');
                
            
        try {
            const enviarCanal = await canal.send({
                embeds: [embedImage, embedVerificacion],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('verificar').setLabel('Verificar').setStyle(ButtonStyle.Success)
                    ),
                ],
            });

            if (enviarCanal) {
                await interaction.reply({ content: 'Canal de verificación seleccionado.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'E001', ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'E002', ephemeral: true });
        }
    }
};
