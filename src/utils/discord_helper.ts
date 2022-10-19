import { Client, EmbedBuilder, Interaction } from 'discord.js';

const GENERIC_EMBED_COLOR = 0x004d71

export function genericEmbed(description: string): EmbedBuilder {
    return new EmbedBuilder().setColor(GENERIC_EMBED_COLOR).setDescription(description);
}

export const errorEmbed = new EmbedBuilder()
    .setColor('Red')
    .setDescription('`An unexpected error has occured`')
