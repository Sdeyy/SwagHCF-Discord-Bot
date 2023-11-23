const { MessageActionRow, ButtonInteraction, MessageInputOptions, EmbedBuilder, PermissionFlagsBits, ButtonBuilder } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const { transcripts } = require('../../config.json');
const ticketSchema = require('../../Models/ticket');
const mongoose = require('mongoose');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        const { guild, member, customId, channel } = interaction;
        const { ManageChannels, SendMessages } = PermissionFlagsBits;

        if (!interaction.isButton()) return;

        if (!['close', 'elevar'].includes(customId)) return;

        if (!guild.members.me.permissions.has(ManageChannels))
            return interaction.reply({ content: 'No eres staff para ejecutar este comando.', ephemeral: true });

        const embed = new EmbedBuilder().setColor('Aqua');

        const data = await ticketSchema.findOne({ ChannelID: channel.id });

        if (!data) return;

        try {

            const fetchedMember = await guild.members.fetch(data.MemberID);

            if (!fetchedMember) {
                return interaction.reply({ content: 'No se pudo encontrar al usuario que creó el ticket.', ephemeral: true });
            }

            switch (customId) {
                case 'close':
                    const closingStaffMember = interaction.user;
                    const staffUsername = interaction.user.username;
                    const staffAvatarURL = interaction.user.displayAvatarURL();
                    const ticketCategory = channel.parent;

                    const transcriptEmbed5 = new EmbedBuilder()
                        .setTitle(`📩 Hola, ${fetchedMember.user.username}! `)
                        .setDescription(`Te notificamos que tu ticket (\`#${data.TicketID}\`) creado en la categoría de \`${ticketCategory.name}\` fue solucionado con la siguiente resolución:\n\n \`Ticket solucionado (Ningún mensaje agregado por parte del staff)\`\n\nEn caso de que creas que la resolución del mismo no fue correcta, no dudes en crear un ticket en nuestro Discord!`)
                        .setColor(0xff9a00)
                        .setFooter({ text: `Cerrado por: ${staffUsername}`, iconURL: staffAvatarURL })
                        .setTimestamp();

                    setTimeout(async function () {
                        try {
                            const message = await fetchedMember.send({
                                embeds: [transcriptEmbed5]
                            });

                        } catch (error) {
                            console.error(error);
                        }
                        channel.delete();
                    }, 1500);

                    await interaction.reply({ content: `Ticket cerrado por ${closingStaffMember.toString()} con el siguiente mensaje: \n\n\`Ticket solucionado (Ningún mensaje agregado por parte del staff)\`` });
                    

                break;
                case 'elevar':
                    const allowedElevateRoles = ['1150972684239380578', '1150972684239380579', '1150972684671389799', '1150972684671389802', '1150972684671389803', '1150972684671389805', '1150972684671389806', '1150972684671389804'];
                    const isAllowedToElevate = allowedElevateRoles.some(roleID => member.roles.cache.has(roleID));
                
                    if (!isAllowedToElevate) {
                        return interaction.reply({ content: `${interaction.user.toString()} No eres staff para ejecutar este comando.` });
                    }
                
                    const newCategoryID = '1158149203613200384';
                    const newCategory = guild.channels.cache.get(newCategoryID);
                
                    if (!newCategory) {
                        return interaction.reply({ content: 'No se encontró o no existe la categoría.', ephemeral: true });
                    }
                
                    try {
                        if (channel.parent && channel.parent.id !== newCategoryID) {
                            await channel.setParent(newCategoryID);
                            const categoryPermissions = [
                                {
                                    id: '1150972684239380574', // everyone
                                    deny: [PermissionFlagsBits.ViewChannel],
                                },
                                {
                                    id: '1150972684671389805', // *
                                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                                },
                                {
                                    id: '1150972684671389799', // hs
                                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                                }, 
                                {
                                    id: data.MemberID, // user
                                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                                },
                            ];
                            await channel.permissionOverwrites.set(categoryPermissions);
                
                            await interaction.reply({ content: `${interaction.user.toString()} elevó el ticket a la categoría de **Head Staff**.` });
                        } else {
                            return interaction.reply({ content: 'Este canal ya está en la categoría de **Head Staff** o no es un canal de ticket elevado.', ephemeral: true });
                        }
                    } catch (error) {
                        console.error(error);
                        interaction.reply({ content: 'Ocurrió un error al elevar el ticket.', ephemeral: true });
                    }
                    break;
                }
            } catch (err) {
                console.error(err);
                interaction.reply({ content: 'No eres staff para ejecutar este comando.' });
            }
        },
};