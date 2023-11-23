const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banea a un usuario del servidor.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
        option.setName('user')
        .setDescription('Usuario a banear')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('Motivo del baneo')
    ),

    async execute(interaction) {
        const {channel, options} = interaction

        const user = options.getUser('user')
        const reason = options.getString('reason') || 'No reason provided.'

        const member = await interaction.guild.members.fetch(user.id)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ content: 'No eres staff para ejecutar este comando.'})
        
        await member.ban({reason})

        const embed = new EmbedBuilder()
            .setDescription(`${user} / ${reason}`)
            .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        })
    }
}