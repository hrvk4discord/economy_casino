const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js")
const { safeReply } = require("../Utils/Helpers/InteractionHelper")
const commands = require("../Utils/Config/commands")

module.exports = {
    data: new SlashCommandBuilder()
        .setName(commands.ping.name)
        .setDescription(commands.ping.desc),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setDescription(`# Pong!\n ### Latenz: ${Date.now() - interaction.createTimestamp}ms`)
            .setColot(0x00AEFF)
            .setTimestamp(

                await safeReply(interaction, { embeds: [embed] })
            )
    }
}