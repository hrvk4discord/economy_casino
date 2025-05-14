const Logger = require('../Logger/ConsoleLogger');

module.exports = {
    async handleCommandError(interaction, error) {
        Logger.error(`Fehler bei dem Command ${interaction.commandName}: ${error.message}`);
        
        try {
            await interaction.reply({
                content: 'Es ist ein unerwarteter Fehler aufgetreten.',
                ephemeral: true
            });
        } catch {
            await interaction.editReply({
                content: 'Es ist ein Fehler aufgetreten (nach Antwort).'
            });
        }
    }
};
