const { commandInteraction } = require('discord.js')

module.exports = {
    name: "interactionCreate",

    execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName)

            if (!command) {
                interaction.reply({ content: "error, check console." })
            }

            command.execute(interaction, client)
          } else if (interaction.isButton()) {
            const {customId} = interaction;

            if(customId == "verificar"){
                const role = interaction.guild.roles.cache.get('1150972684239380575')
                return interaction.member.roles
                .add(role)
                .then((member) => 
                interaction.reply({
                    content: `${role} Te verificaste correctamente.`,
                    ephemeral: true
                }),
              )
            }
            
        } else {
            return;
        }
    }
}