const { ChannelType, ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const ticketSchema = require('../../Models/ticket');
const { ticketParentDudas, ticketParentReportes, ticketParentApelaciones, ticketParentDonaciones, everyone } = require('../../config.json');
const mongoose = require('mongoose');

const ticketCounterSchema = new mongoose.Schema({
    memberId: String,
    count: Number,
});
  
const TicketCounter = mongoose.model('TicketCounter', ticketCounterSchema);

module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        const { guild, member, customId } = interaction;
        const { viewChannel, SendMessages, ManageChannels, ReadMessageHistory } = PermissionFlagsBits;
        
        if (!interaction.isButton()) return;

        if (!['dudas', 'reporte', 'apelar', 'donaciones'].includes(customId)) return;

        if (!guild.members.me.permissions.has(ManageChannels)) {
            interaction.reply({ content: 'No eres staff para ejecutar este comando.' });
            return;
        }

        try {
            let maxTicketCount = await TicketCounter.findOne({}, {}, { sort: { 'count': -1 } });

            if (!maxTicketCount) {
                maxTicketCount = new TicketCounter({
                    memberId: member.id,
                    count: 1,
                });
            } else {
                maxTicketCount.count++;
            }
            
            await maxTicketCount.save();
            const ticketId = maxTicketCount.count.toString().padStart(4, '0');

            let parentCategory;

            if (customId === 'dudas') {
                parentCategory = ticketParentDudas;
            } else if (customId === 'reporte') {
                parentCategory = ticketParentReportes;
            } else if (customId === 'apelar') {
                parentCategory = ticketParentApelaciones;
            } else if (customId === 'donaciones') {
                parentCategory = ticketParentDonaciones;
            }
            
            let embed;

            if (customId === 'dudas') {
                embed = new EmbedBuilder()
                    .setTitle(` :ticket:  Ticket de Dudas`)
                    .setDescription(`:clipboard: **Detalles del Ticket:**
                    \`\`\`ID del Ticket: #${ticketId}\`\`\`\n\n**¡Hola,** ${member.toString()}**!** :wave:\n\nHas creado un nuevo **Ticket de Dudas**. Nuestro equipo de soporte está aquí para ayudarte con cualquier cosa que necesites. :tada:\n\nEstamos aquí para ayudarte. **Responderemos a tu consulta lo antes posible.** Mientras tanto, puedes usar los botones de abajo para realizar algunas acciones en tu ticket. :keyboard:\n\nSi necesitas cerrar el ticket, cambiar su estado o tienes alguna otra pregunta, no dudes en preguntarnos.\n\nGracias por elegir nuestro servicio de soporte :heart:\n`)
                    .setFooter({ text: `Swag`})
                    .setColor(0xff9a00)
                    .setTimestamp();
            } else if (customId === 'reporte') {
                embed = new EmbedBuilder()
                    .setTitle(` :ticket:  Ticket de Reportes`)
                    .setDescription(`:clipboard: **Detalles del Ticket:**
                    \`\`\`ID del Ticket: #${ticketId}\`\`\`\n\n**¡Hola,** ${member.toString()}**!** :wave:\n\nHas creado un nuevo **Ticket de Reportes**. Nuestro equipo de soporte está aquí para ayudarte con cualquier cosa que necesites. :tada:\n\nEstamos aquí para ayudarte. **Responderemos a tu consulta lo antes posible.** Mientras tanto, puedes usar los botones de abajo para realizar algunas acciones en tu ticket. :keyboard:\n\nSi necesitas cerrar el ticket, cambiar su estado o tienes alguna otra pregunta, no dudes en preguntarnos.\n\nGracias por elegir nuestro servicio de soporte :heart:\n`)
                    .setFooter({ text: `Swag`})
                    .setColor(0xff9a00)
                    .setTimestamp();
            } else if (customId === 'apelar') {
                embed = new EmbedBuilder()
                    .setTitle(` :ticket:  Ticket de Apelaciones`)
                    .setDescription(`:clipboard: **Detalles del Ticket:**
                    \`\`\`ID del Ticket: #${ticketId}\`\`\`\n\n**¡Hola,** ${member.toString()}**!** :wave:\n\nHas creado un nuevo **Ticket de Apelaciones**. Nuestro equipo de soporte está aquí para ayudarte con cualquier cosa que necesites. :tada:\n\nEstamos aquí para ayudarte. **Responderemos a tu consulta lo antes posible.** Mientras tanto, puedes usar los botones de abajo para realizar algunas acciones en tu ticket. :keyboard:\n\nSi necesitas cerrar el ticket, cambiar su estado o tienes alguna otra pregunta, no dudes en preguntarnos.\n\nGracias por elegir nuestro servicio de soporte :heart:\n`)
                    .setFooter({ text: `Swag`})
                    .setColor(0xff9a00)
                    .setTimestamp();
            } else if (customId === 'donaciones') {
                embed = new EmbedBuilder()
                    .setTitle(` :ticket:  Ticket de Donaciones`)
                    .setDescription(`:clipboard: **Detalles del Ticket:**
                    \`\`\`ID del Ticket: #${ticketId}\`\`\`\n\n**¡Hola,** ${member.toString()}**!** :wave:\n\nHas creado un nuevo **Ticket de Donaciones**. Nuestro equipo de soporte está aquí para ayudarte con cualquier cosa que necesites. :tada:\n\nEstamos aquí para ayudarte. **Responderemos a tu consulta lo antes posible.** Mientras tanto, puedes usar los botones de abajo para realizar algunas acciones en tu ticket. :keyboard:\n\nSi necesitas cerrar el ticket, cambiar su estado o tienes alguna otra pregunta, no dudes en preguntarnos.\n\nGracias por elegir nuestro servicio de soporte :heart:\n`)
                    .setFooter({ text: `Swag`})
                    .setColor(0xff9a00)
                    .setTimestamp();
            }

            const channel = await guild.channels.create({
                name: `${customId}-${ticketId}`,
                type: ChannelType.GuildText,
                parent: parentCategory,
                permissionOverwrites: [
                    {
                        id: everyone,
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                    },
                    {
                        id: member.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                    },
                    {
                        id: '1150972684239380578', // staff
                        allow: (customId === 'dudas' || customId === 'reporte' || customId === 'apelar') ? [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] : [],
                    },
                    {
                        id: '1150972684239380579', // high 
                        allow: (customId === 'dudas' || customId === 'reporte' || customId === 'apelar') ? [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] : [],
                    },
                    {
                        id: '1150972684671389799', // head
                        allow: (customId === 'dudas' || customId === 'reporte' || customId === 'apelar') ? [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] : [],
                    },
                    {
                        id: '1150972684671389802', // co
                        allow: (customId === 'dudas' || customId === 'reporte' || customId === 'apelar') ? [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] : [],
                    },
                    {
                        id: '1150972684671389803', // ow
                        allow: (customId === 'dudas' || customId === 'reporte' || customId === 'apelar') ? [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] : [],
                    },
                    {
                        id: '1150972684671389804', // .
                        allow: (customId === 'dudas' || customId === 'reporte' || customId === 'apelar' || customId === 'donaciones') ? [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] : [],
                    }
                ],
            });

            const newTicketSchema = await ticketSchema.create({
                GuildID: guild.id,
                MemberID: member.id,
                TicketID: ticketId,
                ChannelID: channel.id,
                Closed: false,
                Locked: false,
                Type: customId,
            });

            const button = new ActionRowBuilder().setComponents(    
                new ButtonBuilder().setCustomId('close').setLabel('Cerrar').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('elevar').setLabel('Elevar').setStyle(ButtonStyle.Success),
            );

            channel.send({
                content: (`<@&1150972684239380578> | <@&1150972684239380579> | <@${member.id}>`),
                embeds: [embed],
                components: [button],
            });

            interaction.reply({ content: `Ticket creado correctamente. <#${channel.id}>`, ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    },
};