import { Client, GatewayIntentBits } from "discord.js"
import { config } from "dotenv"
import { Command } from "./interface/command"
import { VerifyCommand } from "./commands/verification"
import { XYCommand } from "./commands/xy"
import { AboutCommand } from "./commands/about"
import onInteraction from "./events/on_interaction"
import onReady from "./events/on_ready"

config()
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ]
})
const token = process.env.token

export const commandsList: Command[] = [VerifyCommand, XYCommand, AboutCommand]

onReady(client)
onInteraction(client)

client.login(token)
