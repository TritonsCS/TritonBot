import {
    ChatInputApplicationCommandData,
    ChatInputCommandInteraction,
    ModalSubmitInteraction,
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    handleCommand: (interaction: ChatInputCommandInteraction) => void;
    handleModal?: (interaction: ModalSubmitInteraction) => void;
}
