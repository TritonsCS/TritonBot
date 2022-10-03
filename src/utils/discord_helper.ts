import { EmbedBuilder } from "discord.js";

export function genericEmbed(description: string): EmbedBuilder {
    return new EmbedBuilder().setColor(0xe9c121).setDescription(description);
}

export function sendForm() {
    
}

export const errorEmbed = new EmbedBuilder()
    .setColor("Red")
    .setDescription("`An unexpected error has occured`")