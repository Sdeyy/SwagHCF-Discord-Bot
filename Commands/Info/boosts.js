const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boostmensaje')
        .setDescription('Información sobre los boosteos del servidor.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),    

    async execute(interaction) {

        const embed129 = new EmbedBuilder()
            .setTitle('🔮 Boosts!')
            .setDescription(`Cualquier usuario que **boostee** este servidor obtendrá un rango en el servidor.\n\n**(!)** Los usuarios que boosteen  **antes de la fecha de apertura** recibirán el rol <@&1150972684239380577> **permanentemente**, ¡para mostrar que apoyaron al servidor desde el principio! :heart:`)
            .setColor(0xf87cfc)
            .setFooter({text: 'Swag'})
        
        await interaction.channel.send({ embeds: [embed129] });
    }
}
