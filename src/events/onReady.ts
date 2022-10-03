import { Client } from "discord.js";
import { commandsList } from "bot";
import { initializeDriver } from "utils/triton_lookup";
import { exit } from "process";

export default (client: Client): void => {
    client.once("ready", async () => {
        if (!client.user || !client.application || initializeDriver()) {
            console.log("An error occured when initializing the bot");
            exit(0);
        }

        await client.application.commands.set(commandsList);
        console.log(`Bot logged in as ${client.user.tag}`);
    });
};