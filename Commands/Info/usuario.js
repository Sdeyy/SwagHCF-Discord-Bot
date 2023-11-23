const { SlashCommandBuilder, MessageActionRow, ButtonInteraction, MessageInputOptions, EmbedBuilder, PermissionFlagsBits, ButtonBuilder } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const { transcripts } = require('../../config.json');
const ticketSchema = require('../../Models/ticket');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()  
        .setName('usuario')
        .setDescription('Comandos relacionados con los usuarios')
        .addSubcommand(subcommand =>
            subcommand
                .setName('avatar')
                .setDescription('Avatar del usuario')
                .addUserOption(option =>
                    option.setName('usuario')
                        .setDescription('Menciona al usuario'))
        ),

        async execute(interaction){
            const usuario = interaction.options.getUser('usuario');
    
            // Si no se menciona ningún usuario, toma al usuario que ejecuta el comando
            const targetUsuario = usuario || interaction.user;
    
            const avatarURL = targetUsuario.displayAvatarURL({ size: 512, dynamic: true, format: 'png' });
    
            const replyMessage = `Avatar de ${targetUsuario.tag}:`;
            const embed = {
                title: `${targetUsuario.tag}`,
                image: { url: avatarURL },
            };
    
            await interaction.reply({ content: replyMessage, embeds: [embed] });
        }
    };