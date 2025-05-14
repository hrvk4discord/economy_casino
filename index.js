const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('./Utils/Config/bot_config');
const mariadb = require('mariadb');
const Logger = require('./Utils/Logger/ConsoleLogger');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {
        const command = require(`./Commands/${file}`);
        if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
            Logger.info(`Slash Command geladen: ${command.data.name}`);
        } else {
            Logger.warn(`Command ${file} hat keine Data oder interaction execute`);
        }
    } catch (err) {
        Logger.error(`Fehler beim Laden von Command ${file}: ${err.message}`);
    }
}

client.db = mariadb.createPool({
    host: 'localhost',
    user: '',
    password: '',
    database: '',
    connectionLimit: 5
});

client.once('ready', () => {
    Logger.success(`Bot ist online als ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        Logger.info(`Slash Command ausgeführt: /${interaction.commandName} von ${interaction.user.tag}`);
        await command.execute(interaction, client);
    } catch (error) {
        Logger.error(`Fehler bei /${interaction.commandName}: ${error.message}`);
        if (interaction.replied || interaction.deferred) {
            await interaction.editReply({ content: '❌ | Es ist ein Fehler aufgetreten.' });
        } else {
            await interaction.reply({
                content: '❌ | Es ist ein Fehler aufgetreten beim Ausführen dieses Befehls.',
                ephemeral: true
            });
        }
    }
});

client.login(token);
