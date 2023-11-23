const { EmbedBuilder } = require('@discordjs/builders');
const { GuildMember, Embed } = require('discord.js');

module.exports = {
        name: "guildMemberRemove",
        execute(member) {
            const { user, guild } = member;
            const wave = member.guild.channels.cache.get('1150972686030348297');
            const despedida = `\n\n:pensive: Hasta la próxima <@${member.id}>!\n\n:busts_in_silhouette: Ahora somos **${guild.memberCount} usuarios.**`;
            const embedDespedida = new EmbedBuilder()
                .setTitle(`${user.tag}`)
                .setColor(0xcf2121)
                .setDescription(despedida)
                .setFooter({ text: 'Swag' });

            wave.send({ text: `<@${member.id}>`, embeds: [embedDespedida] });
        }
    }