import { Embeds } from "../utils/discord_utils"
import { Command } from "../interface/command"


const REPLY = Embeds.TitledEmbed('The XY Problem', 'The XY problem is asking \
    about your attempted solution rather than your actual problem. This leads to \
    enormous amounts of wasted time and energy, both on the part of people asking for \
    help, and on the part of those providing help. [Learn more](https://xyproblem.info/)')

export const XYCommand: Command = {
    name: "xy",
    description: "The XY problem of asking questions",
    handleCommand(_, interaction) {
        interaction.reply(REPLY)
    }
}