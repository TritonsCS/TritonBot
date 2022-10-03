import { ChatInputCommandInteraction, Client, Interaction } from "discord.js";
import { commandsList } from "bot";
import { errorEmbed } from "utils/discord_helper";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            await handleSlashCommand(interaction);
        }
    });
};

const handleSlashCommand = async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const command = commandsList.find((c) => c.name === interaction.command?.name);
    if (command) {
        command.handle(interaction);
        return;
    }

    interaction.reply({ embeds: [errorEmbed] })
}