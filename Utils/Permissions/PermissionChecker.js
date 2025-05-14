module.exports = {
    userHasPermission(interaction, requiredPermissions = []) {
        return requiredPermissions.every(perm =>
            interaction.member.permissions.has(perm)
        );
    },

    botHasPermission(interaction, requiredPermissions = []) {
        return requiredPermissions.every(perm =>
            interaction.guild.members.me.permissions.has(perm)
        );
    }
};
