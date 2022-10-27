import {
    ChatInputApplicationCommandData,
    ChatInputCommandInteraction,
    Client
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    handleCommand: (client: Client, interaction: ChatInputCommandInteraction) => void;
}