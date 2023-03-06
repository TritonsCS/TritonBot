import {
    ActionRowBuilder,
    ModalActionRowComponentBuilder
} from "@discordjs/builders"
import {
    ChatInputCommandInteraction,
    ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js"
import moment from "moment"
import { verificationChannel, verifiedRole } from "../config.json"
import { Command } from "../interface/command"
import { Embeds } from "../utils/embeds"
import { verifyStudent } from "../utils/triton_verifier"

export const VerifyCommand: Command = {
    name: "verify",
    description: "Initializes the verification process for users",

    async handleCommand(client, interaction) {

        // Check valid channel
        if (interaction.channelId !== verificationChannel) {
            await interaction.reply(Embeds.CommandError)
            return
        }

        // Check if member is already verified 
        if (isMemberVerified(interaction)) {
            await interaction.reply(Embeds.BasicError('You are already verified'))
            return
        }

        // Send modal
        await interaction.showModal(createModal())
    },
}

/**
 * Checks if the member executing the command is already verified 
 * 
 * @param interaction 
 * @returns 
 */
function isMemberVerified(interaction: ChatInputCommandInteraction): boolean {
    if (!interaction.inCachedGuild())
        return false

    return interaction.member.roles.cache.some(r => r.id === verifiedRole)
}

/**
 * Handles the modal submission
 * 
 * @param interaction The instance of the {@link ModalSubmitInteraction}
 */
export async function handleModalSubmit(interaction: ModalSubmitInteraction) {
    const fields = interaction.fields
    const ctcLinkID = fields.getTextInputValue("ctcLinkId")

    const date = moment(
        fields.getTextInputValue("dateOfBirth"),
        ["MM/DD/YYYY", "DD/MM/YYYY"],
        true
    )

    // Fail fast
    const timeDifference = moment().unix() - date.unix()
    if (date.toString() === "Invalid Date" || timeDifference < 0) {
        await interaction.reply(Embeds.BasicError('Invalid date format. Please check the birth date and try again.'))
        return
    }

    try {
        await verifyStudent(ctcLinkID, date.format("MM/DD/YYYY"), interaction)
            .then(_ => {
                interaction.reply(Embeds.BasicEmbed(`You now have the <@&${verifiedRole}> role. Make sure to read the rules and have fun!`))
            })
    } catch (error) {
        console.log(error)
        await interaction.reply(Embeds.DefaultError)
    }
}

function createModal() {
    return new ModalBuilder()
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
                    .setMinLength(10)
                    .setMaxLength(10)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)
            )
        )
}