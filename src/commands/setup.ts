import { Command } from 'types/command';
import { hasGuildConfig } from 'handlers/GuildConfigurationHandler';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { genericEmbed } from 'utils/discord_helper';
export const SetupCommand: Command = {
    name: 'setup',
    description: 'Starts the setup wizard',
    options: [
        {
            name: 'override',
            description: '',
            type: ApplicationCommandOptionType.Boolean
        }
    ],

    async handleCommand(interaction) {
        const guildId = interaction.guild?.id;
        const override = interaction.options.getBoolean('override');
        
        if (!hasGuildConfig(guildId!) || override) {
            

        } else {
            const embed = genericEmbed('An configuration for this server already exists. If you\'d like to override the current configuration, please execute the command again with the override flag.')
            await interaction.reply({ ephemeral: true, embeds: [embed] })
            return;
        }
        

        

        



    },
}