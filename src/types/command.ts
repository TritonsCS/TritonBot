import {
    ChatInputApplicationCommandData,
    ChatInputCommandInteraction,
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    handleCommand: (interaction: ChatInputCommandInteraction) => void;
}
