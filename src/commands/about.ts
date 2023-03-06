import { Embeds } from "../utils/embeds";
import { Command } from "../interface/command";
export const AboutCommand: Command = {
    name: "about",
    description: "Provides information about the bot",

    async handleCommand(_, interaction) {
        interaction.reply(Embeds.TitledEmbed(
            "About",
            `
            Name: TritonBot
            Version: 1.0.0
            Author: Pesto
            Git: https://github.com/devPesto/TritonBot
            `,
            true
        ))
    }
}