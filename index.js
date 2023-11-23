const { Client, GatewayIntentBits, Partials, Guild, Collection, ActivityType, Permissions } = require('discord.js');

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents } = require('./Handlers/eventHandler');
const { loadCommands } = require('./Handlers/commandHandler');

const client = new Client({
    intents: [Guilds, GuildMember, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
});

const rolefromboost = '1150972684239380577'; 

client.on('boost', async (boostingGuild, booster) => {
    try {
        if (boostingGuild.id === '1150972684239380574') {
            const role = boostingGuild.roles.cache.get(rolefromboost);
            if (role && boostingGuild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
                await booster.roles.add(role);
                console.log(`Se dio el rol ${role.name} a ${booster.user.tag} por boostear el servidor.`);
            } else {
                console.error('Error (Boost Function)');
            }
        }
    } catch (error) {
        console.error('Error al otorgar el rol por Server Boost:', error);
    }
});

client.commands = new Collection();
client.config = require('./config.json');

process.on('uncaughtException', (err) => {
    console.error('Error no encontrado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('error:', promise, 'motivo:', reason);
});

client.on('ready', () => {
    updateActivity();
});

client.on('guildMemberAdd', () => {
    updateActivity();
});

client.on('guildMemberRemove', () => {
    updateActivity();
});

function updateActivity() {
    const guild = client.guilds.cache.get('1150972684239380574');
    if (guild) {
        const memberCount = guild.memberCount;
        client.user.setActivity(`${memberCount} Usuarios!`, {
            type: ActivityType.Watching,
        });
    } else {
        console.error('Server could not be found.');
    }
}

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
});
