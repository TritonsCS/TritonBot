import {
    ActionRowBuilder,
    ModalActionRowComponentBuilder,
} from "@discordjs/builders";
import {
    ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js";
import moment from "moment";
import { verificationChannel } from "../config.json";
import { Command } from "../types/command";
import {
    addVerifiedRole,
    errorEmbed,
    isMemberVerified,
} from "../utils/discord_helper";
import { verifyStudent } from "../utils/triton_lookup";

export const VerifyCommand: Command = {
    name: "verify",
    description: "Initializes the verification process for users",

    async handleCommand(interaction) {
        const modal = new ModalBuilder()
            .setCustomId("verificationModal")
            .setTitle('Student Verification')
            .addComponents(
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    new TextInputBuilder()
                        .setCustomId("ctcLinkId")
                        .setMinLength(9)
                        .setMaxLength(9)
                        .setLabel("Enter your ctcLinkID")
                        .setRequired(true)
                        .setStyle(TextInputStyle.Short)
                ),
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    new TextInputBuilder()
                        .setCustomId("dateOfBirth")
                        .setLabel("Enter you date of birth")
                        .setMinLength(10)
                        .setMaxLength(10)
                        .setRequired(true)
                        .setStyle(TextInputStyle.Short)
                )
            );
        // Check valid channel
        const channel = interaction.channelId;
        if (channel !== verificationChannel) {
            await interaction.reply({
                embeds: [
                    errorEmbed.setDescription(
                        "`This command cannot be executed here`"
                    ),
                ],
                ephemeral: true,
            });
        }

        // Check if member is already verified
        if (isMemberVerified(interaction, interaction.user.id)) {
            await interaction.reply({
                embeds: [
                    errorEmbed.setDescription("`You are already verified`"),
                ],
                ephemeral: true,
            });
        }
        await interaction.showModal(modal);
    },
};

export async function handleModalSubmit(interaction: ModalSubmitInteraction) {
    const fields = interaction.fields;
    const ctcLinkID = fields.getTextInputValue("ctcLinkId");
    const date = moment(
        fields.getTextInputValue("dateOfBirth"),
        ["MM/DD/YYYY", "DD/MM/YYYY"],
        true
    );

    if (
        date.toString() !== "Invalid Date" ||
        moment().unix() - date.unix() <= 0
    ) {
        verifyStudent(ctcLinkID, date.format("MM/DD/YYYY")).then((result) => {
            addVerifiedRole(result, interaction);
        });
    } else {
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}
