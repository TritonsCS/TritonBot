import {
    ActionRowBuilder,
    ModalActionRowComponentBuilder
} from '@discordjs/builders';
import {
    ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder
} from 'discord.js';
import { getGuildConfig } from 'handlers/GuildConfigurationHandler';
import moment from 'moment';
import { Command } from 'types/command';
import { errorEmbed } from 'utils/discord_helper';
import { verifyStudent } from 'utils/triton_lookup';

const commandId = 'verify'
export const VerifyCommand: Command = {
    name: commandId,
    description: 'Initializes the verification process for users',

    async handleCommand(interaction) {
        const member = interaction.guild?.members.cache.get('');
        if(member?.roles.cache.some(role => role.id === getGuildConfig()))
        await interaction.showModal(modal);
    },

    async handleModal(interaction) {
        const guildConfig = getGuildConfig(interaction.guild?.id!)
    }
};

export async function handleModalSubmit(interaction: ModalSubmitInteraction) {
    const guildConfig = getGuildConfig(interaction.guild?.id!)
    const fields = interaction.fields;
    const ctcLinkID = fields.getTextInputValue('ctcLinkId');
    const date = moment(fields.getTextInputValue('dateOfBirth'), ['MM/DD/YYYY', 'DD/MM/YYYY'], true);

    if (date.toString() !== 'Invalid Date' || (moment().unix() - date.unix()) <= 0) {
        verifyStudent(ctcLinkID, date.format('MM/DD/YYYY')).then((result) => {
            if (result)
                guildConfig?.verifyMember(interaction.client, interaction.user.id)
        });
    } else {
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

const modal = new ModalBuilder()
    .setCustomId(commandId)
    .setTitle('Edmonds Student Verification Form')
    .addComponents(
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            new TextInputBuilder()
                .setCustomId('ctcLinkId')
                .setMinLength(9)
                .setMaxLength(9)
                .setLabel('Enter your ctcLinkID')
                .setRequired(true)
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            new TextInputBuilder()
                .setCustomId('dateOfBirth')
                .setLabel('Enter you date of birth')
                .setMinLength(10)
                .setMaxLength(10)
                .setRequired(true)
        )
    );

