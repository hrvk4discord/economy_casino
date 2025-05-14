module.exports = {
    async deferReply(interaction) {
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply({ ephemeral: true })
        }
    },

    async safeReply(interaction, content) {
        if (interaction.replied || interaction.deferred) {
            await interaction.editReply(content)
        } else {
            await interaction.reply(content)
        }
    }
}