const { EmbedBuilder } = require('@discordjs/builders');
const { GuildMember, Embed } = require('discord.js');

module.exports = {
        name: "guildMemberAdd",
        execute(member) {
            const { user, guild } = member;
            const wave = member.guild.channels.cache.get('1150972686030348297');
            const bienvenida = `\n\n:wave: ¡Bienvenid@ <@${member.id}> a **Swag**!\n\n:busts_in_silhouette: ¡Ahora somos **${guild.memberCount} usuarios!**`;
            const embedBienvenida = new EmbedBuilder()
                .setTitle(`${user.tag}`)
                .setColor(0x24d65b)
                .setDescription(bienvenida)
                .setFooter({ text: 'Swag' });

            wave.send({ text: `<@${member.id}>`, embeds: [embedBienvenida] });
        }
}