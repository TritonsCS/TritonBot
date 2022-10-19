import { ChatInputCommandInteraction, Client, Interaction, ModalSubmitInteraction } from "discord.js";
import { commandsList } from "bot";
import { errorEmbed } from "utils/discord_helper";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            await handleSlashCommand(interaction);
            return;
        }

        if(interaction.isModalSubmit()) {
            await handleModalSubmit(interaction);
            return;
        }
    });
};

const handleSlashCommand = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const command = commandsList.find((c) => c.name === interaction.command?.name);
    if (command) {
        command.handleCommand(interaction);
        return;
    }

    interaction.reply({ embeds: [errorEmbed] })
}

const handleModalSubmit = async(interaction: ModalSubmitInteraction): Promise<void> => {
    
}