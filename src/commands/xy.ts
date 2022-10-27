import { genericEmbed } from "../utils/discord_helper";
import { Command } from "../structures/command";


export const XYCommand: Command = {
    name: "xy",
    description: "The XY problem of asking questions",
    handleCommand(client, interaction) {
        interaction.reply({ embeds: [reply]});
    }
}

const reply = genericEmbed('The XY problem is asking about your attempted solution rather than your actual problem. This leads to enormous amounts of wasted time and energy, both on the part of people asking for help, and on the part of those providing help. [Learn more](https://xyproblem.info/)')
    .setTitle('The XY Problem')
