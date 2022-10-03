import onReady from "events/onReady";
import { Command } from "types/command";
import { Client } from "discord.js";
import { config } from "dotenv";

config();
const client = new Client({ intents: [] });
const token = process.env.token;

export const commandsList: Command[] = [];

onReady(client);
client.login(token);
