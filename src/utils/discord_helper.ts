import { ChatInputCommandInteraction, EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import { verifiedRole } from "../config.json";

const GENERIC_EMBED_COLOR = 0x004d71;

export function genericEmbed(description: string): EmbedBuilder {
    return new EmbedBuilder()
        .setColor(GENERIC_EMBED_COLOR)
        .setDescription(description);
}

export function isMemberVerified(interaction: ChatInputCommandInteraction): boolean {
    if(!interaction.inCachedGuild())
        return false;

    return interaction.member.roles.cache.some(r => r.id === verifiedRole);
}

export function addVerifiedRole(result: boolean, interaction: ModalSubmitInteraction) {
    if (!result) return;
    const id = interaction.user.id;
    const member = interaction.guild?.members.cache.get(id);
    const role = member?.guild.roles.cache.find(r => r.id === verifiedRole)
    member?.roles.add(role!);
}

export const errorEmbed = new EmbedBuilder()
    .setColor("Red")
    .setDescription("`An unexpected error has occured`");
