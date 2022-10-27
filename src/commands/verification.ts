import {
    ActionRowBuilder,
    ModalActionRowComponentBuilder
} from "@discordjs/builders";
import {
    Client, ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
import moment from "moment";
import { verificationChannel, verifiedRole } from "../config.json";
import { Command } from "../structures/command";
import {
    addVerifiedRole,
    errorEmbed,
    genericEmbed,
    isMemberVerified
} from "../utils/discord_helper";
import { verifyStudent } from "../utils/triton_lookup";

export const VerifyCommand: Command = {
    name: "verify",
    description: "Initializes the verification process for users",

    async handleCommand(client, interaction) {
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
                        .setLabel("Enter you date of birth (MM/DD/YYYY)")
                        .setMinLength(7)
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
                    errorEmbed
                        .setTitle("Error")
                        .setDescription("This command cannot be executed here"),
                ],
                ephemeral: true,
            });

            // Check if member is already verified 
        } else if (isMemberVerified(interaction)) {
            await interaction.reply({
                embeds: [
                    errorEmbed
                        .setTitle("Error")
                        .setDescription("You are already verified"),
                ],
                ephemeral: true,
            });
        } else {
            await interaction.showModal(modal);
        }
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

    if (date.toString() !== "Invalid Date" || moment().unix() - date.unix() <= 0) {
        verifyStudent(ctcLinkID, date.format("MM/DD/YYYY"))
            .then((result) => addVerifiedRole(result, interaction));
        await interaction.reply({ embeds: [genericEmbed(`You now have the <@&${verifiedRole}> role. Make sure to read the rules and have fun!`)], ephemeral: true });
    } else {
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}
