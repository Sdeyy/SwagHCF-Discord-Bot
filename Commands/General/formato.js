const { SlashCommandBuilder, MessageActionRow, ButtonInteraction, MessageInputOptions, EmbedBuilder, PermissionFlagsBits, ButtonBuilder } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const { transcripts } = require('../../config.json');
const ticketSchema = require('../../Models/ticket');
const mongoose = require('mongoose');

const allowedRoleIDs = ['1150972684239380578', '1150972684239380579', '1150972684671389799', '1150972684671389802', '1150972684671389803', '1150972684671389805', '1150972684671389806']; 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('formato')
    .setDescription('Comandos relacionados con formatos')
    .setDefaultPermission(false)
    .addSubcommand(subcommand =>
      subcommand
        .setName('ip')
        .setDescription('IP del servidor')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('staff')
        .setDescription('Staff Apply')
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    const hasAllowedRole = interaction.member.roles.cache.some(role => allowedRoleIDs.includes(role.id));

    if (!hasAllowedRole) {
      return interaction.reply({ content: 'No tienes los roles necesarios para ejecutar estos comandos.' });
    }

    if (subcommand === 'ip') {
        const embed = new EmbedBuilder()
          .setTitle('~ Información del Servidor')
          .setDescription(`\`\`\`\nplay.swaghcf.xyz\n\`\`\`\n**TeamSpeak 3:**\n\`\`\`\nts.swaghcf.xyz\n\`\`\`\n**Store:**\n\`\`\`\nwww.swaghcf.xyz\`\`\``)
          .setColor(0xff9a00);

      interaction.reply({ embeds: [embed] });

    } else if (subcommand === 'staff') {
        const embed = new EmbedBuilder()
          .setTitle('~ Formulario de Staff')
          .setDescription(`**Completar el siguiente formato:**\n\n> Nombre:\n> Edad:\n> De qué país eres?\n> Hace cuánto juegas HCF?\n> Sos premium? Cuál es tu nombre de usuario?\n> Por qué te gustaría formar parte del staff?\n> Tenes experiencia previa en algún otro servidor? Hasta qué rango llegaste? Durante cuánto tiempo estuviste?\n> Sabes hacer SS? Si es así, ¿qué herramientas utilizarías en esta misma?\n\n**(!)** En caso de mentir en este mismo, serás sancionado dentro del servidor.`)
          .setColor(0xff9a00)
          .setFooter({ text: 'Equipo administrativo de Swag' });

        interaction.reply({ embeds: [embed] });
      }
  }
}