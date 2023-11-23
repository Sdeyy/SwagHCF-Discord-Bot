const { SlashCommandBuilder, MessageActionRow, ButtonInteraction, MessageInputOptions, EmbedBuilder, PermissionFlagsBits, ButtonBuilder } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const { transcripts } = require('../../config.json');
const ticketSchema = require('../../Models/ticket');
const mongoose = require('mongoose');

module.exports = {
  data: new SlashCommandBuilder()  
    .setName('ticket')
    .setDescription('Comandos relacionados con tickets')
    .setDefaultPermission(true)
    .addSubcommand(subcommand =>
      subcommand
        .setName('rename')
        .setDescription('Renombrar un ticket.')
        .addStringOption(option =>
          option.setName('value')
            .setDescription('-')
            .setRequired(true))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('cerrar')
        .setDescription('Cerrar un ticket.')
        .addStringOption(option =>
          option.setName('value')
            .setDescription('-')
            .setRequired(true))
    ),


  // RENAME
  async execute(interaction) {
    const allowedTicketCategoryIDs = ['1158149203613200384', '1150972687053754412', '1150972687053754414', '1150972687053754413', '1150972687053754415'];
    const channelParent = interaction.channel.parent;
    
    if (!channelParent || !allowedTicketCategoryIDs.includes(channelParent.id)) {
      return interaction.reply({ content: `${interaction.member.toString()} No eres staff para ejecutar este comando.` });
    }    

    const allowedrolesids = ['1150972684239380578', '1150972684239380579', '1150972684671389799', '1150972684671389802', '1150972684671389803'];
    
    const { guild, member, customId, channel } = interaction;

    const hasallowedroles = interaction.member.roles.cache.some(role => allowedrolesids.includes(role.id));

    if (!hasallowedroles) {
      return interaction.reply({ content: 'No eres staff para ejecutar este comando.' });
    }

    if (interaction.options.getSubcommand() === 'rename') {
      let nuevoNombre = interaction.options.getString('value');
      const nombreActual = interaction.channel.name;
      const regex = /(-\d*)$/;
      const coincidencia = nombreActual.match(regex);

      if (coincidencia) {
        const caracteresFinales = coincidencia[0];
        nuevoNombre = nuevoNombre + caracteresFinales;
      }

      interaction.channel.setName(nuevoNombre)
        .then(() => {
          interaction.reply({
            content: `${interaction.member.toString()} ha cambiado el nombre del ticket de \`${nombreActual}\` a \`${nuevoNombre}\``
          });
        })
        .catch(error => {
          console.error(error);
          interaction.reply({ content: 'No eres staff para ejecutar este comando.' });
        });


    // CERRAR
    } else if (interaction.options.getSubcommand() === 'cerrar') {

      const closingStaffMember = interaction.user;
      const staffUsername = interaction.user.username;
      const staffAvatarURL = interaction.user.displayAvatarURL();
      const { guild, member, customId, channel } = interaction;
      const nota = interaction.options.getString('value');
      const ticketCategory = channel.parent;
      const data = await ticketSchema.findOne({ ChannelID: channel.id });
    
      if (!data) return;
    
      const fetchedMember = await guild.members.fetch(data.MemberID);
    
      if (!fetchedMember) {
        return interaction.reply({ content: 'No se pudo encontrar al usuario que creó el ticket.', ephemeral: true });
      }
    
      const transcriptEmbed5 = new EmbedBuilder()
          .setTitle(`📩 Hola, ${fetchedMember.user.username}! `)
          .setDescription(`Te notificamos que tu ticket (\`#${data.TicketID}\`) creado en la categoría de \`${ticketCategory.name}\` fue solucionado con la siguiente resolución:\n\n \`${nota}\`\n\nEn caso de que creas que la resolución del mismo no fue correcta, no dudes en crear un ticket en nuestro Discord!`)
          .setColor(0x4d9cff)
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

      await interaction.reply({ content: `Ticket cerrado por ${closingStaffMember.toString()} con el siguiente mensaje: \n\n\`${nota}\`` });
    }
  },
};
