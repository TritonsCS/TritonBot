import { Client } from "discord.js";
import { config } from "dotenv";
import { Command } from "types/command";
import { VerifyCommand } from "./commands/verification";
import onInteraction from "./events/onInteraction";
import onReady from "./events/onReady";

config();
const client = new Client({ intents: [] });
const token = process.env.token;

export const commandsList: Command[] = [VerifyCommand];

onReady(client);
onInteraction(client);

client.login(token);
