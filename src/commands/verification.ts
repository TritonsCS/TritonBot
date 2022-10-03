import {
    ActionRowBuilder,
    ModalActionRowComponentBuilder,
} from '@discordjs/builders';
import {
    ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
} from 'discord.js';
import { Command } from 'types/command';
import { verifyStudent } from 'utils/triton_lookup';
import moment from 'moment';

export const VerifyCommand: Command = {
    name: 'verify',
    description: 'Initializes the verification process for users',
    async handle(interaction) {
        const user = interaction.user;
        const modal = new ModalBuilder()
            .setCustomId(`modal_${user.id}`)
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

        await interaction.showModal(modal);
    },
};

export async function handleModalSubmit(interaction: ModalSubmitInteraction) {
    const member = interaction.member;
    const fields = interaction.fields;
    const ctcLinkID = fields.getTextInputValue('ctcLinkId');
    const date = moment(fields.getTextInputValue('dateOfBirth'),['MM/DD/YYYY', 'DD/MM/YYYY'], true);

    if (date.toString() !== 'Invalid Date' || (moment().unix() - date.unix()) <= 0) {
        verifyStudent(ctcLinkID, date.format('MM/DD/YYYY')).then((result) => {
            if (result) {
                interaction.guild?.roles.cache.find(role => role.name == '');
            }
        });
    } else {
        await interaction.reply({ ephemeral: true });
    }
}
